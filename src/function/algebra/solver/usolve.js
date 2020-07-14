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
   * @return {DenseMatrix[] | Array[]}  An array of affine-independent column vectors (x) that solve the linear system
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
      const R = _denseBackwardSubstitution(m, b)
      return R.map(r => r.valueOf())
    }
  })

  function _denseBackwardSubstitution (m, b_) {
    // the algorithm is derived from
    // https://www.overleaf.com/project/5e6c87c554a3190001a3fc93

    // array of right-hand sides
    const B = [solveValidation(m, b_, true)._data.map(e => e[0])]

    const M = m._data
    const rows = m._size[0]
    const columns = m._size[1]

    // loop columns backwards
    for (let i = columns - 1; i >= 0; i--) {
      let L = B.length

      // loop right-hand sides
      for (let k = 0; k < L; k++) {
        const b = B[k]

        if (!equalScalar(M[i][i], 0)) {
          // non-singular row

          b[i] = divideScalar(b[i], M[i][i])

          for (let j = i - 1; j >= 0; j--) {
            // b[j] -= b[i] * M[j,i]
            b[j] = subtract(b[j], multiplyScalar(b[i], M[j][i]))
          }

        } else if (!equalScalar(b[i], 0)) {
          // singular row, nonzero RHS

          if (k === 0) {
            // There is no valid solution
            throw new Error('Linear system cannot be solved since matrix is singular')
          } else {
            // This RHS is invalid but other solutions may still exist
            B.splice(k, 1)
            k -= 1
            L -= 1
          }
        } else if (k === 0) {
          // singular row, RHS is zero

          const bNew = [...b]
          bNew[i] = 1

          for (let j = i - 1; j >= 0; j--) {
            bNew[j] = subtract(bNew[j], M[j][i])
          }

          B.push(bNew)
        }

      }

    }

    return B.map(x => new DenseMatrix({ data: x.map(e=>[e]), size: [rows, 1] }))
  }

  function _sparseBackwardSubstitution (m, b) {
    // make b into a column vector
    b = solveValidation(m, b, true)

    const bdata = b._data

    const rows = m._size[0]
    const columns = m._size[1]

    const values = m._values
    const index = m._index
    const ptr = m._ptr

    let i, k

    // result
    const x = []

    // loop columns backwards
    for (let j = columns - 1; j >= 0; j--) {
      // b[j]
      const bj = bdata[j][0] || 0

      if (!equalScalar(bj, 0)) {
        // value at [j, j]
        let vjj = 0

        // upper triangular matrix values & index (column j)
        const jValues = []
        const jIndices = []

        // first & last indeces in column
        const firstIndex = ptr[j]
        let lastIndex = ptr[j + 1]

        // values in column, find value at [j, j], loop backwards
        for (k = lastIndex - 1; k >= firstIndex; k--) {
          // row
          i = index[k]
          // check row
          if (i === j) {
            // update vjj
            vjj = values[k]
          } else if (i < j) {
            // store upper triangular
            jValues.push(values[k])
            jIndices.push(i)
          }
        }
        // at this point we must have a value at [j, j]
        if (equalScalar(vjj, 0)) {
          // system cannot be solved, there is no value at [j, j]
          throw new Error('Linear system cannot be solved since matrix is singular')
        }
        // calculate xj
        const xj = divideScalar(bj, vjj)
        // loop upper triangular
        for (k = 0, lastIndex = jIndices.length; k < lastIndex; k++) {
          // row
          i = jIndices[k]
          // update copy of b
          bdata[i] = [subtract(bdata[i][0], multiplyScalar(xj, jValues[k]))]
        }
        // update x
        x[j] = [xj]
      } else {
        // update x
        x[j] = [0]
      }
    }
    // return vector
    return [new DenseMatrix({
      data: x,
      size: [rows, 1]
    })]
  }
})
