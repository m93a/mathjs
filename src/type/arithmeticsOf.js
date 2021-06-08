import { NumberArithmetics } from '../plain/number/arithmetic.js'
import { S } from '../utils/is.js'

export function arithmeticsOf (x) {
  if (typeof x === 'number') {
    return NumberArithmetics
  }
  if (typeof x[S.Arithmetics] === 'object') {
    return x[S.Arithmetics]
  }
  return null
}
