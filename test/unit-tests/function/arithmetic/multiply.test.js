// test multiply
import assert from 'assert'

import math from '../../../../src/defaultInstance.js'
import approx from '../../../../tools/approx.js'
const multiply = math.multiply
const divide = math.divide
const matrix = math.matrix
const complex = math.complex
const bignumber = math.bignumber
const i = math.i

describe('multiply', function () {
  describe('Scalar', function () {
    it('should multiply two numbers correctly', function () {
      approx.equal(multiply(2, 3), 6)
      approx.equal(multiply(-2, 3), -6)
      approx.equal(multiply(-2, -3), 6)
      approx.equal(multiply(5, 0), 0)
      approx.equal(multiply(0, 5), 0)
      approx.deepEqual(multiply(0, Infinity), NaN)
      approx.deepEqual(multiply(2, Infinity), Infinity)
      approx.deepEqual(multiply(-2, Infinity), -Infinity)
    })

    it('should multiply booleans', function () {
      assert.strictEqual(multiply(true, true), 1)
      assert.strictEqual(multiply(true, false), 0)
      assert.strictEqual(multiply(false, true), 0)
      assert.strictEqual(multiply(false, false), 0)
    })

    it('should multiply mixed numbers and booleans', function () {
      assert.strictEqual(multiply(2, true), 2)
      assert.strictEqual(multiply(2, false), 0)
      assert.strictEqual(multiply(true, 2), 2)
      assert.strictEqual(multiply(false, 2), 0)
    })

    it('should multiply bignumbers', function () {
      assert.deepStrictEqual(multiply(bignumber(1.5), bignumber(0.2)), bignumber(0.3))
      assert.deepStrictEqual(multiply(bignumber('1.3e5000'), bignumber('2')), bignumber('2.6e5000'))
    })

    it('should multiply mixed numbers and bignumbers', function () {
      assert.deepStrictEqual(multiply(bignumber(1.5), 0.2), bignumber(0.3))
      assert.deepStrictEqual(multiply(1.5, bignumber(0.2)), bignumber(0.3))
      assert.deepStrictEqual(multiply(bignumber('1.3e5000'), 2), bignumber('2.6e5000'))

      assert.throws(function () { multiply(1 / 3, bignumber(1).div(3)) }, /Cannot implicitly convert a number with >15 significant digits to BigNumber/)
      assert.throws(function () { multiply(bignumber(1).div(3), 1 / 3) }, /Cannot implicitly convert a number with >15 significant digits to BigNumber/)
    })

    it('should throw an error when multipling mixed fractions and bignumbers', function () {
      assert.throws(function () { multiply(math.bignumber('2'), math.fraction(1, 3)) }, /Cannot implicitly convert a Fraction to BigNumber/)
      assert.throws(function () { multiply(math.fraction(1, 3), math.bignumber('2')) }, /Cannot implicitly convert a Fraction to BigNumber/)
    })

    it('should multiply mixed booleans and bignumbers', function () {
      assert.deepStrictEqual(multiply(bignumber(0.3), true), bignumber(0.3))
      assert.deepStrictEqual(multiply(bignumber(0.3), false), bignumber(0))
      assert.deepStrictEqual(multiply(false, bignumber('2')), bignumber(0))
      assert.deepStrictEqual(multiply(true, bignumber('2')), bignumber(2))
    })

    it('should multiply two complex numbers correctly', function () {
      approx.deepEqual(multiply(complex(2, 3), 2), complex(4, 6))
      approx.deepEqual(multiply(complex(2, -3), -2), complex(-4, 6))
      approx.deepEqual(multiply(complex(2, -3), 2), complex(4, -6))
      approx.deepEqual(multiply(complex(-2, 3), 2), complex(-4, 6))
      approx.deepEqual(multiply(complex(-2, -3), 2), complex(-4, -6))
      approx.deepEqual(multiply(2, complex(2, 3)), complex(4, 6))
      approx.deepEqual(multiply(i, complex(2, 3)), complex(-3, 2))
      approx.deepEqual(multiply(complex(0, 1), complex(2, 3)), complex(-3, 2))
      approx.deepEqual(multiply(complex(1, 1), complex(2, 3)), complex(-1, 5))
      approx.deepEqual(multiply(complex(2, 3), complex(1, 1)), complex(-1, 5))
      approx.deepEqual(multiply(complex(2, 3), complex(2, 3)), complex(-5, 12))
      approx.deepEqual(divide(complex(-5, 12), complex(2, 3)), complex(2, 3))
      approx.deepEqual(multiply(complex(2, 3), 0), complex(0, 0))
      approx.deepEqual(multiply(complex(0, 3), complex(0, -4)), complex(12, 0))
      approx.deepEqual(multiply(multiply(3, i), multiply(-4, i)), complex(12, 0))
      approx.deepEqual(multiply(math.i, Infinity), complex(Infinity, Infinity))
      approx.deepEqual(multiply(Infinity, math.i), complex(Infinity, Infinity))

      approx.deepEqual(multiply(complex(2, 0), complex(0, 2)), complex(0, 4))
      approx.deepEqual(multiply(complex(0, 2), complex(0, 2)), -4)
      approx.deepEqual(multiply(complex(2, 2), complex(0, 2)), complex(-4, 4))
      approx.deepEqual(multiply(complex(2, 0), complex(2, 2)), complex(4, 4))
      approx.deepEqual(multiply(complex(0, 2), complex(2, 2)), complex(-4, 4))
      approx.deepEqual(multiply(complex(2, 2), complex(2, 2)), complex(0, 8))
      approx.deepEqual(multiply(complex(2, 0), complex(2, 0)), 4)
      approx.deepEqual(multiply(complex(0, 2), complex(2, 0)), complex(0, 4))
      approx.deepEqual(multiply(complex(2, 2), complex(2, 0)), complex(4, 4))

      approx.deepEqual(multiply(complex(2, 3), complex(4, 5)), complex(-7, 22))
      approx.deepEqual(multiply(complex(2, 3), complex(4, -5)), complex(23, 2))
      approx.deepEqual(multiply(complex(2, 3), complex(-4, 5)), complex(-23, -2))
      approx.deepEqual(multiply(complex(2, 3), complex(-4, -5)), complex(7, -22))
      approx.deepEqual(multiply(complex(2, -3), complex(4, 5)), complex(23, -2))
      approx.deepEqual(multiply(complex(2, -3), complex(4, -5)), complex(-7, -22))
      approx.deepEqual(multiply(complex(2, -3), complex(-4, 5)), complex(7, 22))
      approx.deepEqual(multiply(complex(2, -3), complex(-4, -5)), complex(-23, 2))
      approx.deepEqual(multiply(complex(-2, 3), complex(4, 5)), complex(-23, 2))
      approx.deepEqual(multiply(complex(-2, 3), complex(4, -5)), complex(7, 22))
      approx.deepEqual(multiply(complex(-2, 3), complex(-4, 5)), complex(-7, -22))
      approx.deepEqual(multiply(complex(-2, 3), complex(-4, -5)), complex(23, -2))
      approx.deepEqual(multiply(complex(-2, -3), complex(4, 5)), complex(7, -22))
      approx.deepEqual(multiply(complex(-2, -3), complex(4, -5)), complex(-23, -2))
      approx.deepEqual(multiply(complex(-2, -3), complex(-4, 5)), complex(23, 2))
      approx.deepEqual(multiply(complex(-2, -3), complex(-4, -5)), complex(-7, 22))
    })

    it('should multiply mixed complex numbers and numbers', function () {
      assert.deepStrictEqual(multiply(math.complex(6, -4), 2), math.complex(12, -8))
      assert.deepStrictEqual(multiply(2, math.complex(2, 4)), math.complex(4, 8))
    })

    it('should multiply mixed complex numbers and big numbers', function () {
      assert.deepStrictEqual(multiply(math.complex(6, -4), math.bignumber(2)), math.complex(12, -8))
      assert.deepStrictEqual(multiply(math.bignumber(2), math.complex(2, 4)), math.complex(4, 8))
    })

    it('should multiply two fractions', function () {
      const a = math.fraction(1, 4)
      assert.strictEqual(multiply(a, math.fraction(1, 2)).toString(), '0.125')
      assert.strictEqual(a.toString(), '0.25')

      assert.strictEqual(multiply(math.fraction(2), math.fraction(1, 3)).toString(), '0.(6)')
    })

    it('should multiply mixed fractions and numbers', function () {
      assert.deepStrictEqual(multiply(2, math.fraction(1, 3)), math.fraction(2, 3))
      assert.deepStrictEqual(multiply(math.fraction(1, 3), 2), math.fraction(2, 3))
    })

    it('should throw an error if used with strings', function () {
      assert.throws(function () { multiply('hello', 'world') })
      assert.throws(function () { multiply('hello', 2) })
    })
  })

  it('should multiply mixed array and matrix', function () {
    const a = [[1, 2], [3, 4]]
    const b = [[2, 0], [0, 2]]

    approx.deepEqual(multiply(a, matrix(b)), matrix([[2, 4], [6, 8]]))
    approx.deepEqual(multiply(matrix(a), b), matrix([[2, 4], [6, 8]]))

    // test with vectors, returning a scalar
    const c = [1, 2, 3]
    const d = [4, 5, 6]

    assert.strictEqual(multiply(c, matrix(d)), 32)
    assert.strictEqual(multiply(matrix(c), d), 32)
  })

  describe('squeeze', function () {
    // math.js v1 and v2 did squeeze output being a vector. Changed in v3

    it('should NOT squeeze scalar results of matrix * matrix', function () {
      const a = [[1, 2, 3]]
      const b = [[4], [5], [6]]
      assert.deepStrictEqual(multiply(a, b), [[32]])
    })

    it('should NOT squeeze scalar results of vector * matrix', function () {
      const a = [1, 2, 3]
      const b = [[4], [5], [6]]
      assert.deepStrictEqual(multiply(a, b), [32])
    })

    it('should NOT squeeze scalar results of matrix * vector', function () {
      const a = [[1, 2, 3]]
      const b = [4, 5, 6]
      assert.deepStrictEqual(multiply(a, b), [32])
    })
  })

  it('should throw an error when multiplying matrices with incompatible sizes', function () {
    // vector * vector
    assert.throws(function () { multiply([1, 1], [1, 1, 1]) })

    // matrix * matrix
    assert.throws(function () { multiply([[1, 1]], [[1, 1]]) })
    assert.throws(function () { multiply([[1, 1]], [[1, 1], [1, 1], [1, 1]]) })

    // matrix * vector
    assert.throws(function () { multiply([[1, 1], [1, 1]], [1, 1, 1]) })

    // vector * matrix
    assert.throws(function () { multiply([1, 1, 1], [[1, 1], [1, 1]]) })
  })

  it('should throw an error when multiplying multi dimensional matrices', function () {
    assert.throws(function () { multiply([[[1]]], [1]) })
    assert.throws(function () { multiply([[[1]]], [[1]]) })
    assert.throws(function () { multiply([1], [[[1]]]) })
    assert.throws(function () { multiply([[1]], [[[1]]]) })
  })

  it('should throw an error in case of invalid number of arguments', function () {
    assert.throws(function () { multiply(1) }, /TypeError: Too few arguments/)
  })

  it('should throw an in case of wrong type of arguments', function () {
    assert.throws(function () { multiply(2, null) }, /TypeError: Unexpected type of argument/)
  })

  describe('Vector', function () {
    it('should multiply vectors correctly (dot product)', function () {
      const a = [1, 2, 3]
      const b = [4, 5, 6]

      approx.deepEqual(multiply(a, b), 32)
      approx.deepEqual(multiply(matrix(a), matrix(b)), 32)
    })

    it('should conjugate the first argument in dot product', function () {
      const a = [complex(1, 2), complex(3, 4)]
      const b = [complex(5, 6), complex(7, 8)]

      approx.deepEqual(multiply(a, b), complex(70, -8))
      approx.deepEqual(multiply(matrix(a), matrix(b)), complex(70, -8))
    })

    it('should multiply row vector x column vector', function () {
      const v = [[1, 2, 3, 0, 0, 5, 6]]

      let r = multiply(v, [[3], [4], [6], [0], [1], [2], [0]])
      assert.deepStrictEqual(r, [[39]])

      r = multiply(v, math.matrix([[3], [4], [6], [0], [1], [2], [0]], 'dense'))
      assert.deepStrictEqual(r, math.matrix([[39]], 'dense'))
    })

    it('should multiply dense row vector x column vector', function () {
      const v = math.matrix([[1, 2, 3, 0, 0, 5, 6]], 'dense')

      let r = multiply(v, [[3], [4], [6], [0], [1], [2], [0]])
      assert.deepStrictEqual(r, math.matrix([[39]]))

      r = multiply(v, math.matrix([[3], [4], [6], [0], [1], [2], [0]], 'dense'))
      assert.deepStrictEqual(r, math.matrix([[39]]))
    })

    it('should throw an error when multiplying empty vectors', function () {
      assert.throws(function () { multiply([], []) }, /Cannot multiply two empty vectors/)
    })

    it('should multiply a vector with a matrix correctly', function () {
      const a = [1, 2, 3]
      const b = [
        [8, 1, 6],
        [3, 5, 7],
        [4, 9, 2]
      ]

      approx.deepEqual(multiply(a, b), [26, 38, 26])
      approx.deepEqual(multiply(b, a), [28, 34, 28])

      approx.deepEqual(multiply(matrix(a), matrix(b)), matrix([26, 38, 26]))
      approx.deepEqual(multiply(matrix(b), matrix(a)), matrix([28, 34, 28]))
    })
  })

  describe('Dense Matrix', function () {
    it('should multiply matrix x scalar', function () {
      const m = math.matrix([
        [2, 0],
        [4, 0]
      ])

      let r = multiply(m, 3)
      assert.deepStrictEqual(r._size, m._size)
      assert.deepStrictEqual(r._data, [[6, 0], [12, 0]])

      r = multiply(m, math.complex(3, 3))
      assert.deepStrictEqual(r._size, m._size)
      assert.deepStrictEqual(r._data, [[math.complex(6, 6), math.complex(0, 0)], [math.complex(12, 12), math.complex(0, 0)]])

      r = multiply(m, math.bignumber(3))
      assert.deepStrictEqual(r._size, m._size)
      assert.deepStrictEqual(r._data, [[math.bignumber(6), math.bignumber(0)], [math.bignumber(12), math.bignumber(0)]])

      r = multiply(m, true)
      assert.deepStrictEqual(r._size, m._size)
      assert.deepStrictEqual(r._data, [[2, 0], [4, 0]])

      r = multiply(m, false)
      assert.deepStrictEqual(r._size, m._size)
      assert.deepStrictEqual(r._data, [[0, 0], [0, 0]])
    })

    it('should multiply matrix x matrix with zeros', function () {
      const m = math.matrix([
        [2, 0],
        [4, 0]
      ])

      let r = multiply(m, math.matrix([
        [2, 0],
        [4, 0]
      ]))
      assert.deepStrictEqual(
        r.valueOf(),
        [
          [4, 0],
          [8, 0]
        ])

      r = multiply(m, math.matrix([
        [2, 0],
        [4, 0]
      ], 'dense'))
      assert.deepStrictEqual(
        r.valueOf(),
        [
          [4, 0],
          [8, 0]
        ])
    })

    it('should multiply matrix x matrix', function () {
      const m = math.matrix([[1, 2], [3, 4]], 'dense')

      let r = multiply(m, math.matrix([[5, 6], [7, 8]], 'dense'))
      assert.deepStrictEqual(
        r.valueOf(),
        [
          [19, 22],
          [43, 50]
        ])

      r = multiply(m, math.matrix([[5, 6], [7, 8]], 'dense'))
      assert.deepStrictEqual(
        r.valueOf(),
        [
          [19, 22],
          [43, 50]
        ])
    })

    it('should multiply matrix x matrix, number datatype', function () {
      const m1 = math.matrix([[1, 2], [3, 4]], 'dense', 'number')
      const m2 = math.matrix([[5, 6], [7, 8]], 'dense', 'number')

      const r = multiply(m1, m2)
      assert(r.datatype() === 'number')
      assert.deepStrictEqual(
        r.valueOf(),
        [
          [19, 22],
          [43, 50]
        ])
    })

    it('should multiply matrix x array', function () {
      const m = math.matrix([
        [2, 0],
        [4, 0]
      ])

      let r = multiply(
        m,
        [
          [2, 0],
          [4, 0]
        ])
      assert.deepStrictEqual(
        r.valueOf(),
        [
          [4, 0],
          [8, 0]
        ])

      r = multiply(
        m,
        [
          [2, 0, 1],
          [4, 0, 1]
        ])
      assert.deepStrictEqual(
        r.valueOf(),
        [
          [4, 0, 2],
          [8, 0, 4]
        ])
    })

    it('should multiply matrix x vector array', function () {
      const m = math.matrix([
        [2, 0],
        [4, 0]
      ])

      const r = multiply(
        m,
        [
          [2],
          [4]
        ])
      assert.deepStrictEqual(
        r.valueOf(),
        [
          [4],
          [8]
        ])
    })

    it('should NOT squeeze scalar results of matrix * matrix', function () {
      const a = math.matrix(
        [
          [1, 2, 3]
        ])
      const b = math.matrix(
        [
          [4],
          [5],
          [6]
        ])
      assert.deepStrictEqual(multiply(a, b), math.matrix([[32]]))
    })

    it('should NOT squeeze scalar results of matrix * vector', function () {
      const a = math.matrix(
        [
          [1, 2, 3]
        ])
      const b = [4, 5, 6]
      assert.deepStrictEqual(multiply(a, b), math.matrix([32]))
    })

    it('should throw an error when multiplying matrices with incompatible sizes', function () {
      // vector * vector
      assert.throws(function () { multiply(math.matrix([1, 1], 'dense'), [1, 1, 1]) })

      // matrix * matrix
      assert.throws(function () { multiply(math.matrix([[1, 1]], 'dense'), [[1, 1]]) })
      assert.throws(function () { multiply(math.matrix([[1, 1]], 'dense'), [[1, 1], [1, 1], [1, 1]]) })

      // matrix * vector
      assert.throws(function () { multiply(math.matrix([[1, 1], [1, 1]], 'dense'), [1, 1, 1]) })

      // vector * matrix
      assert.throws(function () { multiply(math.matrix([1, 1, 1], 'dense'), [[1, 1], [1, 1]]) })
    })

    it('should multiply triangular matrices', function () {
      const l = [
        [1, 0, 0, 0],
        [-0.5, 1, 0, 0],
        [0, -0.7, 1, 0],
        [0.0666667, -0.4, -0.5714286, 1]
      ]
      const u = [
        [240, -2700, 6480, -4200],
        [0, -150, 540, -420],
        [0, 0, -42, 56],
        [0, 0, 0, 4]
      ]

      const r = multiply(l, u)

      approx.deepEqual(
        r.valueOf(),
        [
          [240, -2700, 6480, -4200],
          [-120, 1200, -2700, 1680],
          [0, 105, -420, 350],
          [16, -120, 240, -140]
        ])
    })

    const a = matrix([[1, 2], [3, 4]])
    const b = matrix([[5, 6], [7, 8]])
    const c = matrix([[5], [6]])
    const d = matrix([[5, 6]])

    it('should perform element-wise multiplication if multiplying a matrix and a number', function () {
      approx.deepEqual(multiply(a, 3), matrix([[3, 6], [9, 12]]))
      approx.deepEqual(multiply(3, a), matrix([[3, 6], [9, 12]]))
    })

    it('should perform matrix multiplication', function () {
      approx.deepEqual(multiply(a, b), matrix([[19, 22], [43, 50]]))
      approx.deepEqual(multiply(a, c), matrix([[17], [39]]))
      approx.deepEqual(multiply(d, a), matrix([[23, 34]]))
      approx.deepEqual(multiply(d, b), matrix([[67, 78]]))
      approx.deepEqual(multiply(d, c), matrix([[61]]))
      approx.deepEqual(multiply([[1, 2], [3, 4]], [[5, 6], [7, 8]]), [[19, 22], [43, 50]])
      approx.deepEqual(multiply([1, 2, 3, 4], 2), [2, 4, 6, 8])
      approx.deepEqual(multiply(matrix([1, 2, 3, 4]), 2), matrix([2, 4, 6, 8]))
    })
  })

  describe('multiple arguments', function () {
    it('should multiply more than two arguments', function () {
      assert.deepStrictEqual(multiply(2, 3, 4), 24)
      assert.deepStrictEqual(multiply(2, 3, [5, 6]), [30, 36])

      assert.deepStrictEqual(multiply([[2, 2], [2, 2]], [[3, 3], [3, 3]], [[4, 4], [4, 4]]), [[96, 96], [96, 96]])
      assert.deepStrictEqual(multiply([[2, 2], [2, 2]], [[3, 3], [3, 3]], 4), [[48, 48], [48, 48]])
      assert.deepStrictEqual(multiply([[2, 2], [2, 2]], 3, 4), [[24, 24], [24, 24]])

      assert.deepStrictEqual(multiply(math.matrix([[2, 2], [2, 2]]), math.matrix([[3, 3], [3, 3]]), math.matrix([[4, 4], [4, 4]])), math.matrix([[96, 96], [96, 96]]))
      assert.deepStrictEqual(multiply(math.matrix([[2, 2], [2, 2]]), math.matrix([[3, 3], [3, 3]]), 4), math.matrix([[48, 48], [48, 48]]))
      assert.deepStrictEqual(multiply(math.matrix([[2, 2], [2, 2]]), 3, 4), math.matrix([[24, 24], [24, 24]]))
    })
  })
})
