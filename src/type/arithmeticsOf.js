import { NumberArithmetics } from '../plain/number/arithmetic.js'
import { S } from '../utils/is.js'

function getArithmetics (x) {
  if (typeof x === 'number' || x instanceof Number) {
    return NumberArithmetics
  }
  if (typeof x[S.Arithmetics] === 'object') {
    return x[S.Arithmetics]
  }
  return null
}

export function arithmeticsOf (...args) {
  // unique arithmetics
  const uA = [...new Set(args.map(getArithmetics))]

  if (uA.length === 0) throw new TypeError('Expected at least 1 argument')
  if (uA.length === 1) return uA[0]

  if (uA.length === 2 && uA.includes(NumberArithmetics)) {
    const nonNumberArithm = uA.filter(x => x !== NumberArithmetics)[0]

    if (typeof nonNumberArithm?.fromNumber === 'function') return nonNumberArithm
  }

  throw new TypeError('Could not find common arithmetics, the supplied types are incompatible.')
}

/**
 * @param arithmetics the arithmetics returned from `arithmeticsOf(args)`
 * @param {any[]} args the arguments to be coerced
 * @returns {any[]}
 */
export function coerceArguments (arithmetics, args) {
  const fromNumber = typeof arithmetics?.fromNumber === 'function' ? x => arithmetics.fromNumber(x) : null

  return args.map(x => {
    if (arithmetics === getArithmetics(x)) return x
    if (typeof x === 'number' && fromNumber) return fromNumber(x)
    throw new TypeError(`Could not convert value ${x} to arithmetics ${arithmetics}`)
  })
}
