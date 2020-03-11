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
   * @param {Matrix, Array} U       A N x N matrix or array (U)
   * @param {Matrix, Array} b       A column vector with the b values
   *
   * @return {DenseMatrix | Array}  A column vector with the linear system solution (x)
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
   * @param {Matrix} b
   */
  function _denseBackwardSubstitution (m, b) {
    // validate matrix and vector, return copy of column vector b
    b = solveValidation(m, b, true)
    const bdata = b._data

    const mdata = m._data
    const rowCount = m._size[0]
    const columnCount = m._size[1]

    // result
    const x = []

    // loop columns
    for (let j = columnCount - 1; j >= 0; j--) {
      const bj = bdata[j][0] || 0
      let xj

      if (!equalScalar(bj, 0)) {
        const mjj = mdata[j][j]

        if (equalScalar(mjj, 0)) {
          throw new Error('Linear system cannot be solved since matrix is singular')
        }

        xj = divideScalar(bj, mjj)

        // loop rows
        for (let i = j - 1; i >= 0; i--) {
          // update copy of b
          bdata[i] = [subtract(bdata[i][0] || 0, multiplyScalar(xj, mdata[i][j]))]
        }
      } else {
        // !FIXME don't throw solutions away
        xj = 0
      }

      x[j] = [xj]
    }

    // return column vector
    return new DenseMatrix({
      data: x,
      size: [rowCount, 1]
    })
  }

  function _sparseBackwardSubstitution (m, b) {
    // validate matrix and vector, return copy of column vector b
    b = solveValidation(m, b, true)
    const bdata = b._data

    const mvalues = m._values
    const rowCount = m._size[0]
    const columnCount = m._size[1]

    const index = m._index
    const ptr = m._ptr

    // result
    const x = []

    for (let j = columnCount - 1; j >= 0; j--) {
      const bj = bdata[j][0] || 0

      if (!equalScalar(bj, 0)) {
        // the actual value is yet to be found
        let mjj = 0

        // values and indices in j-th column
        const jvalues = []
        const jindex = []

        const firstIndex = ptr[j]
        const lastIndex = ptr[j + 1]

        for (let k = lastIndex - 1; k >= firstIndex; k--) {
          let i = index[k]
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
          bdata[i] = [subtract(bdata[i][0], multiplyScalar(xj, jvalues[k]))]
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
