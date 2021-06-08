import approx from '../../../tools/approx.js'
import math from '../../../src/defaultInstance.js'
import Quaternion from '@m93a/quaternion.js'

const { abs, log, exp, add } = math

describe('arithmetic types', function () {
  it('supports basic functions on Quaternion.js', function () {
    const q = Quaternion(1, 2, 3, 4)

    approx.deepEqual(abs(q), 5.477225575051661)

    approx.deepEqual(log(q), Quaternion(1.7005986908310777, 0.515190292664085, 0.7727854389961275, 1.03038058532817))

    approx.deepEqual(exp(q), Quaternion(1.6939227236832994, -0.7895596245415587, -1.184339436812338, -1.5791192490831174))
  })

  it('can add two quaternions together', function () {
    const q = Quaternion(1, -2, 3, -4)
    const p = Quaternion(4, 3, 2, 1)

    approx.deepEqual(add(p, q), Quaternion(5, 1, 5, -3))
  })
})
