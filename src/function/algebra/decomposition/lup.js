import { clone } from '../../../utils/object.js'
import { factory } from '../../../utils/factory.js'

const name = 'lup'
const dependencies = [
  'typed',
  'matrix',
  'abs',
  'addScalar',
  'divideScalar',
  'multiplyScalar',
  'subtract',
  'larger',
  'equalScalar',
  'DenseMatrix'
]

export const createLup = /* #__PURE__ */ factory(name, dependencies, (
  {
    typed,
    matrix,
    abs,
    addScalar,
    divideScalar,
    multiplyScalar,
    subtract,
    larger,
    equalScalar,
    DenseMatrix
  }
) => {
  /**
   * Calculate the Matrix LU decomposition with partial pivoting. Matrix `A` is decomposed in two matrices (`L`, `U`) and a
   * row permutation vector `p` where `A[p,:] = L * U`
   *
   * Syntax:
   *
   *    math.lup(A)
   *
   * Example:
   *
   *    const m = [[2, 1], [1, 4]]
   *    const r = math.lup(m)
   *    // r = {
   *    //   L: [[1, 0], [0.5, 1]],
   *    //   U: [[2, 1], [0, 3.5]],
   *    //   P: [0, 1]
   *    // }
   *
   * See also:
   *
   *    slu, lsolve, lusolve, usolve
   *
   * @param {Matrix | Array} A    A two dimensional matrix or array for which to get the LUP decomposition.
   *
   * @return {{L: Array | Matrix, U: Array | Matrix, P: Array.<number>}} The lower triangular matrix, the upper triangular matrix and the permutation matrix.
   */
  return typed(name, {

    DenseMatrix: function (m) {
      return _denseLUP(m)
    },

    Array: function (a) {
      // create dense matrix from array
      const m = matrix(a)
      // lup, use matrix implementation
      const r = _denseLUP(m)
      // result
      return {
        L: r.L.valueOf(),
        U: r.U.valueOf(),
        p: r.p
      }
    }
  })

  function _denseLUP (m) {
    // rows & columns
    const rows = m._size[0]
    const columns = m._size[1]
    // minimum rows and columns
    let n = Math.min(rows, columns)
    // matrix array, clone original data
    const data = clone(m._data)
    // l matrix arrays
    const ldata = []
    const lsize = [rows, n]
    // u matrix arrays
    const udata = []
    const usize = [n, columns]
    // vars
    let i, j, k
    // permutation vector
    const p = []
    for (i = 0; i < rows; i++) { p[i] = i }
    // loop columns
    for (j = 0; j < columns; j++) {
      // skip first column in upper triangular matrix
      if (j > 0) {
        // loop rows
        for (i = 0; i < rows; i++) {
          // min i,j
          const min = Math.min(i, j)
          // v[i, j]
          let s = 0
          // loop up to min
          for (k = 0; k < min; k++) {
            // s = l[i, k] - data[k, j]
            s = addScalar(s, multiplyScalar(data[i][k], data[k][j]))
          }
          data[i][j] = subtract(data[i][j], s)
        }
      }
      // row with larger value in cvector, row >= j
      let pi = j
      let pabsv = 0
      let vjj = 0
      // loop rows
      for (i = j; i < rows; i++) {
        // data @ i, j
        const v = data[i][j]
        // absolute value
        const absv = abs(v)
        // value is greater than pivote value
        if (larger(absv, pabsv)) {
          // store row
          pi = i
          // update max value
          pabsv = absv
          // value @ [j, j]
          vjj = v
        }
      }
      // swap rows (j <-> pi)
      if (j !== pi) {
        // swap values j <-> pi in p
        p[j] = [p[pi], p[pi] = p[j]][0]
        // swap j <-> pi in data
        DenseMatrix._swapRows(j, pi, data)
      }
      // check column is in lower triangular matrix
      if (j < rows) {
        // loop rows (lower triangular matrix)
        for (i = j + 1; i < rows; i++) {
          // value @ i, j
          const vij = data[i][j]
          if (!equalScalar(vij, 0)) {
            // update data
            data[i][j] = divideScalar(data[i][j], vjj)
          }
        }
      }
    }
    // loop columns
    for (j = 0; j < columns; j++) {
      // loop rows
      for (i = 0; i < rows; i++) {
        // initialize row in arrays
        if (j === 0) {
          // check row exists in upper triangular matrix
          if (i < columns) {
            // U
            udata[i] = []
          }
          // L
          ldata[i] = []
        }
        // check we are in the upper triangular matrix
        if (i < j) {
          // check row exists in upper triangular matrix
          if (i < columns) {
            // U
            udata[i][j] = data[i][j]
          }
          // check column exists in lower triangular matrix
          if (j < rows) {
            // L
            ldata[i][j] = 0
          }
          continue
        }
        // diagonal value
        if (i === j) {
          // check row exists in upper triangular matrix
          if (i < columns) {
            // U
            udata[i][j] = data[i][j]
          }
          // check column exists in lower triangular matrix
          if (j < rows) {
            // L
            ldata[i][j] = 1
          }
          continue
        }
        // check row exists in upper triangular matrix
        if (i < columns) {
          // U
          udata[i][j] = 0
        }
        // check column exists in lower triangular matrix
        if (j < rows) {
          // L
          ldata[i][j] = data[i][j]
        }
      }
    }
    // l matrix
    const l = new DenseMatrix({
      data: ldata,
      size: lsize
    })
    // u matrix
    const u = new DenseMatrix({
      data: udata,
      size: usize
    })
    // p vector
    const pv = []
    for (i = 0, n = p.length; i < n; i++) { pv[p[i]] = i }
    // return matrices
    return {
      L: l,
      U: u,
      p: pv,
      toString: function () {
        return 'L: ' + this.L.toString() + '\nU: ' + this.U.toString() + '\nP: ' + this.p
      }
    }
  }
})
