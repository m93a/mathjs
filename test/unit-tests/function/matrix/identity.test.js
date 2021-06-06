import assert from 'assert'
import math from '../../../../src/defaultInstance.js'
const matrix = math.matrix
const identity = math.identity

describe('identity', function () {
  it('should create an empty matrix', function () {
    assert.deepStrictEqual(identity(), matrix())
    assert.deepStrictEqual(identity([]), [])
    assert.deepStrictEqual(identity(matrix([])), matrix())
  })

  it('should create an identity matrix of the given size', function () {
    assert.deepStrictEqual(identity(1), matrix([[1]]))
    assert.deepStrictEqual(identity(2), matrix([[1, 0], [0, 1]]))
    assert.deepStrictEqual(identity([2]), [[1, 0], [0, 1]])
    assert.deepStrictEqual(identity(2, 3), matrix([[1, 0, 0], [0, 1, 0]]))
    assert.deepStrictEqual(identity(3, 2), matrix([[1, 0], [0, 1], [0, 0]]))
    assert.deepStrictEqual(identity([3, 2]), [[1, 0], [0, 1], [0, 0]])
    assert.deepStrictEqual(identity(math.matrix([3, 2])), matrix([[1, 0], [0, 1], [0, 0]]))
    assert.deepStrictEqual(identity(3, 3), matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]))
  })

  it('should create an identity matrix with bignumbers', function () {
    const zero = math.bignumber(0)
    const one = math.bignumber(1)
    const two = math.bignumber(2)
    const three = math.bignumber(3)
    assert.deepStrictEqual(identity(two), matrix([[one, zero], [zero, one]]))
    assert.deepStrictEqual(identity(two, three), matrix([[one, zero, zero], [zero, one, zero]]))
  })

  it('should return an array when setting matrix=="array"', function () {
    const math2 = math.create({ matrix: 'Array' })
    assert.deepStrictEqual(math2.identity(2), [[1, 0], [0, 1]])
  })

  it('should throw an error with an invalid input', function () {
    assert.throws(function () { identity(3, 3, 2) })
    assert.throws(function () { identity([3, 3, 2]) })
    assert.throws(function () { identity([3, 3], 2) })
    assert.throws(function () { identity([3.2, 3]) })
    assert.throws(function () { identity([3, 3.2]) })
    assert.throws(function () { identity([3.2, 3.2]) })
    assert.throws(function () { identity([2, 'str']) })
    assert.throws(function () { identity(['str', 2]) })
    assert.throws(function () { identity([-2, 2]) })
    assert.throws(function () { identity([2, -2]) })
  })
})
