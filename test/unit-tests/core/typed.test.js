import assert from 'assert'
import math from '../../../src/defaultInstance.js'
const math2 = math.create()

describe('typed', function () {
  // TODO: Move (most) of the type checks like isNumber, isComplex, to is.test.js

  it('should test whether a value is a number', function () {
    assert.strictEqual(math.isNumber(2), true)
    assert.strictEqual(math.isNumber('foo'), false)
    assert.strictEqual(math.isNumber('2'), false)
    assert.strictEqual(math.isNumber(), false)
  })

  it('should test whether a value is a complex number', function () {
    assert.strictEqual(math.isComplex(math.complex(2, 3)), true)
    assert.strictEqual(math.isComplex(math2.complex(2, 3)), true)
    assert.strictEqual(math.isComplex({ isComplex: true }), false)
    assert.strictEqual(math.isComplex(2), false)
    assert.strictEqual(math.isComplex(), false)
  })

  it('should test whether a value is a BigNumber', function () {
    assert.strictEqual(math.isBigNumber(math.bignumber(2)), true)
    assert.strictEqual(math.isBigNumber(math2.bignumber(2)), true)
    assert.strictEqual(math.isBigNumber({ isBigNumber: true }), false)
    assert.strictEqual(math.isBigNumber(2), false)
    assert.strictEqual(math.isBigNumber(), false)
  })

  it('should test whether a value is a Fraction', function () {
    assert.strictEqual(math.isFraction(math.fraction(2, 3)), true)
    assert.strictEqual(math.isFraction(math2.fraction(2, 3)), true)
    assert.strictEqual(math.isFraction({ isFraction: true }), false)
    assert.strictEqual(math.isFraction(2), false)
    assert.strictEqual(math.isFraction(), false)
  })

  it('should test whether a value is a string', function () {
    assert.strictEqual(math.isString('hello'), true)
    assert.strictEqual(math.isString({}), false)
    assert.strictEqual(math.isString(2), false)
    assert.strictEqual(math.isString(), false)
  })

  it('should test whether a value is an Array', function () {
    assert.strictEqual(math.isArray([]), true)
    assert.strictEqual(math.isArray(math2.matrix()), false)
    assert.strictEqual(math.isArray(Object.create([])), false)
    assert.strictEqual(math.isArray(2), false)
    assert.strictEqual(math.isArray(), false)
  })

  it('should test whether a value is a Matrix', function () {
    assert.strictEqual(math.isMatrix(math.matrix()), true)
    assert.strictEqual(math.isMatrix(math.matrix([], 'sparse')), true)
    assert.strictEqual(math.isMatrix(math2.matrix()), true)
    assert.strictEqual(math.isMatrix({ isMatrix: true }), false)
    assert.strictEqual(math.isMatrix(2), false)
    assert.strictEqual(math.isMatrix(), false)
  })

  it('should test whether a value is a DenseMatrix', function () {
    assert.strictEqual(math.isDenseMatrix(math.matrix()), true)
    assert.strictEqual(math.isDenseMatrix(math.matrix([], 'sparse')), false)
    assert.strictEqual(math.isDenseMatrix(math2.matrix()), true)
    assert.strictEqual(math.isDenseMatrix({ isDenseMatrix: true }), false)
    assert.strictEqual(math.isDenseMatrix(2), false)
    assert.strictEqual(math.isDenseMatrix(), false)
  })

  it('should test whether a value is a SparseMatrix', function () {
    assert.strictEqual(math.isSparseMatrix(math.matrix()), false)
    assert.strictEqual(math.isSparseMatrix(math.matrix([], 'sparse')), true)
    assert.strictEqual(math.isSparseMatrix(math2.matrix([], 'sparse')), true)
    assert.strictEqual(math.isSparseMatrix({ isSparseMatrix: true }), false)
    assert.strictEqual(math.isSparseMatrix(2), false)
    assert.strictEqual(math.isSparseMatrix(), false)
  })

  it('should test whether a value is a Range', function () {
    assert.strictEqual(math.isRange(new math.Range()), true)
    assert.strictEqual(math.isRange(new math2.Range()), true)
    assert.strictEqual(math.isRange({ isRange: true }), false)
    assert.strictEqual(math.isRange(2), false)
    assert.strictEqual(math.isRange(), false)
  })

  it('should test whether a value is an Index', function () {
    assert.strictEqual(math.isIndex(new math.Index()), true)
    assert.strictEqual(math.isIndex(new math2.Index()), true)
    assert.strictEqual(math.isIndex({ isIndex: true }), false)
    assert.strictEqual(math.isIndex(2), false)
    assert.strictEqual(math.isIndex(), false)
  })

  it('should test whether a value is a boolean', function () {
    assert.strictEqual(math.isBoolean(true), true)
    assert.strictEqual(math.isBoolean(false), true)
    assert.strictEqual(math.isBoolean(2), false)
    assert.strictEqual(math.isBoolean(), false)
  })

  it('should test whether a value is a function', function () {
    assert.strictEqual(math.isFunction(function () {}), true)
    assert.strictEqual(math.isFunction(2), false)
    assert.strictEqual(math.isFunction(), false)
  })

  it('should test whether a value is a Date', function () {
    assert.strictEqual(math.isDate(new Date()), true)
    assert.strictEqual(math.isDate(function () {}), false)
    assert.strictEqual(math.isDate(2), false)
    assert.strictEqual(math.isDate(), false)
  })

  it('should test whether a value is a RegExp', function () {
    assert.strictEqual(math.isRegExp(/test/), true)
    assert.strictEqual(math.isRegExp(function () {}), false)
    assert.strictEqual(math.isRegExp(2), false)
    assert.strictEqual(math.isRegExp(), false)
  })

  it('should test whether a value is null', function () {
    assert.strictEqual(math.isNull(null), true)
    assert.strictEqual(math.isNull(math.matrix()), false)
    assert.strictEqual(math.isNull(2), false)
    assert.strictEqual(math.isNull(), false)
  })

  it('should test whether a value is undefined', function () {
    assert.strictEqual(math.isUndefined(undefined), true)
    assert.strictEqual(math.isUndefined(math.matrix()), false)
    assert.strictEqual(math.isUndefined(2), false)
    assert.strictEqual(math.isUndefined(), true)
    assert.strictEqual(math.isUndefined(null), false)
  })
})
