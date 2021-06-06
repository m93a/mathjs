// test smaller
import assert from 'assert'

import math from '../../../../src/defaultInstance.js'
const bignumber = math.bignumber
const complex = math.complex
const matrix = math.matrix
const smallerEq = math.smallerEq

describe('smallerEq', function () {
  it('should compare two numbers correctly', function () {
    assert.strictEqual(smallerEq(2, 3), true)
    assert.strictEqual(smallerEq(2, 2), true)
    assert.strictEqual(smallerEq(2, 1), false)
    assert.strictEqual(smallerEq(0, 0), true)
    assert.strictEqual(smallerEq(-2, 2), true)
    assert.strictEqual(smallerEq(-2, -3), false)
    assert.strictEqual(smallerEq(-2, -2), true)
    assert.strictEqual(smallerEq(-3, -2), true)
  })

  it('should compare two floating point numbers correctly', function () {
    // Infinity
    assert.strictEqual(smallerEq(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY), true)
    assert.strictEqual(smallerEq(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY), true)
    assert.strictEqual(smallerEq(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY), false)
    assert.strictEqual(smallerEq(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY), true)
    assert.strictEqual(smallerEq(Number.POSITIVE_INFINITY, 2.0), false)
    assert.strictEqual(smallerEq(2.0, Number.POSITIVE_INFINITY), true)
    assert.strictEqual(smallerEq(Number.NEGATIVE_INFINITY, 2.0), true)
    assert.strictEqual(smallerEq(2.0, Number.NEGATIVE_INFINITY), false)
    // floating point numbers
    assert.strictEqual(smallerEq(0.3 - 0.2, 0.1), true)
  })

  it('should compare two booleans', function () {
    assert.strictEqual(smallerEq(true, true), true)
    assert.strictEqual(smallerEq(true, false), false)
    assert.strictEqual(smallerEq(false, true), true)
    assert.strictEqual(smallerEq(false, false), true)
  })

  it('should compare mixed numbers and booleans', function () {
    assert.strictEqual(smallerEq(2, true), false)
    assert.strictEqual(smallerEq(1, true), true)
    assert.strictEqual(smallerEq(0, true), true)
    assert.strictEqual(smallerEq(true, 2), true)
    assert.strictEqual(smallerEq(true, 1), true)
    assert.strictEqual(smallerEq(false, 2), true)
  })

  it('should compare bignumbers', function () {
    assert.deepStrictEqual(smallerEq(bignumber(2), bignumber(3)), true)
    assert.deepStrictEqual(smallerEq(bignumber(2), bignumber(2)), true)
    assert.deepStrictEqual(smallerEq(bignumber(3), bignumber(2)), false)
    assert.deepStrictEqual(smallerEq(bignumber(0), bignumber(0)), true)
    assert.deepStrictEqual(smallerEq(bignumber(-2), bignumber(2)), true)
  })

  it('should compare mixed numbers and bignumbers', function () {
    assert.deepStrictEqual(smallerEq(bignumber(2), 3), true)
    assert.deepStrictEqual(smallerEq(2, bignumber(2)), true)

    assert.throws(function () { smallerEq(1 / 3, bignumber(1).div(3)) }, /TypeError: Cannot implicitly convert a number with >15 significant digits to BigNumber/)
    assert.throws(function () { smallerEq(bignumber(1).div(3), 1 / 3) }, /TypeError: Cannot implicitly convert a number with >15 significant digits to BigNumber/)
  })

  it('should compare mixed booleans and bignumbers', function () {
    assert.deepStrictEqual(smallerEq(bignumber(0.1), true), true)
    assert.deepStrictEqual(smallerEq(bignumber(1), true), true)
    assert.deepStrictEqual(smallerEq(bignumber(1), false), false)
    assert.deepStrictEqual(smallerEq(bignumber(0), false), true)
    assert.deepStrictEqual(smallerEq(false, bignumber(0)), true)
    assert.deepStrictEqual(smallerEq(true, bignumber(0)), false)
    assert.deepStrictEqual(smallerEq(true, bignumber(1)), true)
  })

  it('should compare two fractions', function () {
    assert.strictEqual(smallerEq(math.fraction(3), math.fraction(2)).valueOf(), false)
    assert.strictEqual(smallerEq(math.fraction(2), math.fraction(3)).valueOf(), true)
    assert.strictEqual(smallerEq(math.fraction(3), math.fraction(3)).valueOf(), true)
  })

  it('should compare mixed fractions and numbers', function () {
    assert.strictEqual(smallerEq(1, math.fraction(1, 3)), false)
    assert.strictEqual(smallerEq(math.fraction(2), 2), true)
  })

  it('should apply configuration option epsilon', function () {
    const mymath = math.create()
    assert.strictEqual(mymath.smallerEq(1.01, 1), false)
    assert.strictEqual(mymath.smallerEq(mymath.bignumber(1.01), mymath.bignumber(1)), false)

    mymath.config({ epsilon: 1e-2 })
    assert.strictEqual(mymath.smallerEq(1.01, 1), true)
    assert.strictEqual(mymath.smallerEq(mymath.bignumber(1.01), mymath.bignumber(1)), true)
  })

  it('should compare two strings by their numerical value', function () {
    assert.strictEqual(smallerEq('0', 0), true)
    assert.strictEqual(smallerEq('10', '2'), false)
    assert.strictEqual(smallerEq('1e3', '1000'), true)

    assert.throws(function () { smallerEq('A', 'B') }, /Cannot convert "A" to a number/)
  })

  describe('Array', function () {
    it('should compare array - scalar', function () {
      assert.deepStrictEqual(smallerEq(2, [1, 2, 3]), [false, true, true])
      assert.deepStrictEqual(smallerEq([1, 2, 3], 2), [true, true, false])
    })

    it('should compare array - array', function () {
      assert.deepStrictEqual(smallerEq([[1, 2, 0], [-1, 0, 2]], [[1, -1, 0], [-1, 1, 0]]), [[true, false, true], [true, true, false]])
    })

    it('should compare array - dense matrix', function () {
      assert.deepStrictEqual(smallerEq([[1, 2, 0], [-1, 0, 2]], matrix([[1, -1, 0], [-1, 1, 0]])), matrix([[true, false, true], [true, true, false]]))
    })

    it('should throw an error if arrays have different sizes', function () {
      assert.throws(function () { smallerEq([1, 4, 5], [3, 4]) })
    })
  })

  describe('DenseMatrix', function () {
    it('should compare dense matrix - scalar', function () {
      assert.deepStrictEqual(smallerEq(2, matrix([1, 2, 3])), matrix([false, true, true]))
      assert.deepStrictEqual(smallerEq(matrix([1, 2, 3]), 2), matrix([true, true, false]))
    })

    it('should compare dense matrix - array', function () {
      assert.deepStrictEqual(smallerEq(matrix([[1, 2, 0], [-1, 0, 2]]), [[1, -1, 0], [-1, 1, 0]]), matrix([[true, false, true], [true, true, false]]))
    })

    it('should compare dense matrix - dense matrix', function () {
      assert.deepStrictEqual(smallerEq(matrix([[1, 2, 0], [-1, 0, 2]]), matrix([[1, -1, 0], [-1, 1, 0]])), matrix([[true, false, true], [true, true, false]]))
    })
  })

  it('should throw an error when comparing complex numbers', function () {
    assert.throws(function () { smallerEq(complex(1, 1), complex(1, 2)) }, TypeError)
    assert.throws(function () { smallerEq(complex(2, 1), 3) }, TypeError)
    assert.throws(function () { smallerEq(3, complex(2, 4)) }, TypeError)
    assert.throws(function () { smallerEq(math.bignumber(3), complex(2, 4)) }, TypeError)
    assert.throws(function () { smallerEq(complex(2, 4), math.bignumber(3)) }, TypeError)
  })

  it('should throw an error with two matrices of different sizes', function () {
    assert.throws(function () { smallerEq([1, 4, 6], [3, 4]) })
  })

  it('should throw an error in case of invalid number of arguments', function () {
    assert.throws(function () { smallerEq(1) }, /TypeError: Too few arguments/)
    assert.throws(function () { smallerEq(1, 2, 3) }, /TypeError: Too many arguments/)
  })

  it('should throw an error in case of invalid type of arguments', function () {
    assert.throws(function () { smallerEq(2, null) }, /TypeError: Unexpected type of argument/)
  })
})
