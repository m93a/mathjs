import { isArray, isDenseMatrix, isMatrix } from '../../../../utils/is'
import { arraySize } from '../../../../utils/array'
import { format } from '../../../../utils/string'

export function createSolveValidation ({ DenseMatrix }) {
  /**
   * Validates matrix and column vector b for backward/forward substitution algorithms.
   *
   * @param {Matrix} m            An N x N matrix
   * @param {Array | Matrix} [b]  A column vector, by default a null vector
   * @param {Boolean} copy        Return a copy of vector b
   *
   * @return {number[]} Dense column vector b
   */
  function solveValidation (m, b, copy) {
    const size = m.size()

    if (size.length !== 2) {
      throw new RangeError('Matrix must be two dimensional (size: ' + format(size) + ')')
    }

    const rowCount = size[0]

    // b is a null vector
    if (!b) {
      return Array(rowCount).fill(0)
    }

    // b is a matrix
    if (isMatrix(b)) {
      const bsize = b.size()

      // b is a 1-dimensional vector
      // only DenseMatrix can be 1-dim, see #1770
      if (bsize.length === 1) {
        if (bsize[0] !== rowCount) {
          throw new RangeError('Dimension mismatch. Matrix columns must match vector length.')
        }

        if (copy) {
          const data = []
          const bdata = b._data
          for (let i = 0; i < rowCount; i++) {
            data[i] = bdata[i]
          }
        }

        return b._data
      }

      // b is a column vector
      if (bsize.length === 2) {
        if (bsize[0] !== rowCount || bsize[1] !== 1) {
          throw new RangeError('Dimension mismatch, b must be a column vector.')
        }

        if (isDenseMatrix(b)) {
          const data = []
          const bdata = b._data

          for (let i = 0; i < rowCount; i++) {
            data[i] = bdata[i][0]
          }

          return data
        } else {
          // b is a SparseMatrix

          const data = []
          for (let i = 0; i < rowCount; i++) { data[i] = [0] }

          const values = b._values
          const index = b._index

          for (let k = 0; k < index.length; k++) {
            const i = index[k]
            data[i] = values[k]
          }

          return data
        }
      }

      throw new RangeError('Dimension mismatch, b must be either 1- or 2-dimensional.')
    }

    if (isArray(b)) {
      const bsize = arraySize(b)

      // b is a 1-dimensional vector
      if (bsize.length === 1) {
        if (bsize[0] !== rowCount) {
          throw new RangeError('Dimension mismatch. Matrix columns must match vector length.')
        }

        if (copy) {
          const data = []

          for (let i = 0; i < rowCount; i++) {
            data[i] = b[i]
          }

          return data
        }

        return b
      }

      // b is a column vector
      if (bsize.length === 2) {
        if (bsize[1] !== 1) {
          throw new RangeError('Expected a column vector, instead got an array of size (' + bsize.join(', ') + ')')
        }
        if (bsize[0] !== rowCount) {
          throw new RangeError('Dimension mismatch. Matrix columns must match vector length.')
        }

        const data = []

        for (let i = 0; i < rowCount; i++) {
          data[i] = b[i][0]
        }

        return data
      }

      throw new RangeError('Expected a column vector, instead got an array of size (' + bsize.join(', ') + ')')
    }
  }

  return solveValidation
}
