import { factory } from '../../../utils/factory'
import { createSolveValidation } from './utils/solveValidation'

const name = 'usolve'
const dependencies = [
  'typed',
  'matrix',
  'divideScalar',
  'multiplyScalar',
  'subtract',
  'equalScalar',
  'DenseMatrix'
]

export const createUsolve = /* #__PURE__ */ factory(name, dependencies, ({ typed, matrix, divideScalar, multiplyScalar, subtract, equalScalar, DenseMatrix }) => {
  const solveValidation = createSolveValidation({ DenseMatrix })

  /**
   * Solves the linear equation system by backward substitution. Matrix must be an upper triangular matrix.
   *
   * `U * x = b`
   *
   * Syntax:
   *
   *    math.usolve(U, b)
   *
   * Examples:
   *
   *    const a = [[-2, 3], [2, 1]]
   *    const b = [11, 9]
   *    const x = usolve(a, b)  // [[8], [9]]
   *
   * See also:
   *
   *    lup, slu, usolve, lusolve
   *
   * @param {Matrix, Array} U upper-triangular N×N matrix or array
   * @param {Matrix, Array} [b] column vector with the RHS values, by default a null vector
   *
   * @return {DenseMatrix | Array} column vector with the linear system solution (x)
   */
  return typed(name, {

    'SparseMatrix, Array | Matrix': function (m, b) {
      return _sparseBackwardSubstitution(m, b)
    },

    'DenseMatrix, Array | Matrix': function (m, b) {
      return _denseBackwardSubstitution(m, b)
    },

    'Array, Array | Matrix': function (a, b) {
      const m = matrix(a)
      const r = _denseBackwardSubstitution(m, b)

      // convert result to array
      return r.valueOf()
    }
  })

  /**
   * @param {Matrix} m
   * @param {number[]} b
   */
  function _denseBackwardSubstitution (m, b) {
    // validate matrix and vector, return copy of 1-dim array b
    b = solveValidation(m, b, true)

    // solutions and their modified RHSs
    const bs = [b]
    const xs = [[]]

    const mdata = m._data
    const rowCount = m._size[0]
    const columnCount = m._size[1]

    // loop columns
    for (let i = columnCount - 1; i >= 0; i--) {
      // loop solutions
      for (let j = 0; j < bs.length; j++) {
        const pivotElement = mdata[i][i]
        const bji = bs[j][i]
        let xji

        if (!equalScalar(bji, 0)) {
          if (equalScalar(pivotElement, 0)) {
            // no solution for a singular matrix
            return []
          }

          xji = divideScalar(bji, pivotElement)
        } else {
          if (j === 0 && equalScalar(pivotElement, 0)) {
            // two solutions
            xji = 1 // TODO numerical stability?
            xs.push( xs[j].slice(0) ) // clone xj
            bs.push( bs[j].slice(0) ) // clone bj
          } else {
            // only take one solution, the second one is already
            // an affine combination of existing solutions
            xji = 0
          }
        }

        // loop rows
        for (let k = i - 1; k >= 0; k--) {
          bs[j][k] = subtract(bs[j][k] || 0, multiplyScalar(xji, mdata[k][i]))
        }

        xs[j][i] = xji
      }
    }

    return xs
  }

  function _sparseBackwardSubstitution (m, b) {
    // validate matrix and vector, return copy of column vector b
    b = solveValidation(m, b, true)

    const mvalues = m._values
    const rowCount = m._size[0]
    const columnCount = m._size[1]

    const index = m._index
    const ptr = m._ptr

    // result
    const x = []

    for (let j = columnCount - 1; j >= 0; j--) {
      const bj = b[j]

      if (!equalScalar(bj, 0)) {
        // the actual value is yet to be found
        let mjj = 0

        // values and indices in j-th column
        const jvalues = []
        const jindex = []

        const firstIndex = ptr[j]
        const lastIndex = ptr[j + 1]

        for (let k = lastIndex - 1; k >= firstIndex; k--) {
          const i = index[k]
          if (i === j) {
            mjj = mvalues[k]
          } else if (i < j) {
            jvalues.push(mvalues[k])
            jindex.push(i)
          }
        }

        if (equalScalar(mjj, 0)) {
          throw new Error('Linear system cannot be solved since matrix is singular')
        }

        const xj = divideScalar(bj, mjj)

        for (let k = 0; k < jindex.length; k++) {
          // update copy of b
          const i = jindex[k]
          b[i] = [subtract(b[i][0], multiplyScalar(xj, jvalues[k]))]
        }

        x[j] = [xj]
      } else {
        // !FIXME don't throw away solutions
        x[j] = [0]
      }
    }

    // return column vector
    return new DenseMatrix({
      data: x,
      size: [rowCount, 1]
    })
  }
})
