import {
  absNumber,
  acoshNumber,
  acosNumber,
  acothNumber,
  acotNumber,
  acschNumber,
  acscNumber,
  addNumber,
  andNumber,
  asechNumber,
  asecNumber,
  asinhNumber,
  asinNumber,
  atan2Number,
  atanhNumber,
  atanNumber,
  cbrtNumber,
  ceilNumber,
  combinationsNumber,
  coshNumber,
  cosNumber,
  cothNumber,
  cotNumber,
  cschNumber,
  cscNumber,
  cubeNumber,
  divideNumber,
  expm1Number,
  expNumber,
  fixNumber,
  floorNumber,
  gammaNumber,
  gcdNumber,
  isIntegerNumber,
  isNaNNumber,
  isNegativeNumber,
  isPositiveNumber,
  isZeroNumber,
  lcmNumber,
  log10Number,
  log1pNumber,
  log2Number,
  logNumber,
  modNumber,
  multiplyNumber,
  normNumber,
  notNumber,
  orNumber,
  powNumber,
  sechNumber,
  secNumber,
  signNumber,
  sinhNumber,
  sinNumber,
  sqrtNumber,
  squareNumber,
  subtractNumber,
  tanhNumber,
  tanNumber,
  unaryMinusNumber,
  unaryPlusNumber,
  xgcdNumber,
  xorNumber
} from './plain/number/index.js'

import { factory } from './utils/factory.js'
import { noIndex, noMatrix, noSubset } from './utils/noop.js'

// ----------------------------------------------------------------------------
// classes and functions

// core
export { createTyped } from './core/function/typed.js'

// classes
export { createResultSet } from './type/resultset/ResultSet.js'
export { createRangeClass } from './type/matrix/Range.js'

// arithmetic
export const createUnaryMinus = /* #__PURE__ */ createNumberFactory('unaryMinus', unaryMinusNumber)
export const createUnaryPlus = /* #__PURE__ */ createNumberFactory('unaryPlus', unaryPlusNumber)
export const createAbs = /* #__PURE__ */ createNumberFactory('abs', absNumber)
export const createAddScalar = /* #__PURE__ */ createNumberFactory('addScalar', addNumber)
export const createCbrt = /* #__PURE__ */ createNumberFactory('cbrt', cbrtNumber)
export const createCeil = /* #__PURE__ */ createNumberFactory('ceil', ceilNumber)
export const createCube = /* #__PURE__ */ createNumberFactory('cube', cubeNumber)
export const createExp = /* #__PURE__ */ createNumberFactory('exp', expNumber)
export const createExpm1 = /* #__PURE__ */ createNumberFactory('expm1', expm1Number)
export const createFix = /* #__PURE__ */ createNumberFactory('fix', fixNumber)
export const createFloor = /* #__PURE__ */ createNumberFactory('floor', floorNumber)
export const createGcd = /* #__PURE__ */ createNumberFactory('gcd', gcdNumber)
export const createLcm = /* #__PURE__ */ createNumberFactory('lcm', lcmNumber)
export const createLog10 = /* #__PURE__ */ createNumberFactory('log10', log10Number)
export const createLog2 = /* #__PURE__ */ createNumberFactory('log2', log2Number)
export const createMod = /* #__PURE__ */ createNumberFactory('mod', modNumber)
export const createMultiplyScalar = /* #__PURE__ */ createNumberFactory('multiplyScalar', multiplyNumber)
export const createMultiply = /* #__PURE__ */ createNumberFactory('multiply', multiplyNumber)
export { createNthRootNumber as createNthRoot } from './function/arithmetic/nthRoot.js'
export const createSign = /* #__PURE__ */ createNumberFactory('sign', signNumber)
export const createSqrt = /* #__PURE__ */ createNumberFactory('sqrt', sqrtNumber)
export const createSquare = /* #__PURE__ */ createNumberFactory('square', squareNumber)
export const createSubtract = /* #__PURE__ */ createNumberFactory('subtract', subtractNumber)
export const createXgcd = /* #__PURE__ */ createNumberFactory('xgcd', xgcdNumber)
export const createDivideScalar = /* #__PURE__ */ createNumberFactory('divideScalar', divideNumber)
export const createPow = /* #__PURE__ */ createNumberFactory('pow', powNumber)
export { createRoundNumber as createRound } from './function/arithmetic/round.js'
export const createLog = /* #__PURE__ */ createNumberFactory('log', logNumber)
export const createLog1p = /* #__PURE__ */ createNumberFactory('log1p', log1pNumber)
export const createAdd = /* #__PURE__ */ createNumberFactory('add', addNumber)
export const createNorm = /* #__PURE__ */ createNumberFactory('norm', normNumber)
export const createDivide = /* #__PURE__ */ createNumberFactory('divide', divideNumber)

// constants
export {
  createE,
  createUppercaseE,
  createFalse,
  // createI,
  createInfinity,
  createLN10,
  createLN2,
  createLOG10E,
  createLOG2E,
  createNaN,
  createNull,
  createPhi,
  createPi,
  createUppercasePi,
  createSQRT1_2, // eslint-disable-line camelcase
  createSQRT2,
  createTau,
  createTrue,
  createVersion
} from './constants.js'

// create
export { createNumber } from './type/number.js'
export { createString } from './type/string.js'
export { createBoolean } from './type/boolean.js'

// logical
export const createAnd = /* #__PURE__ */ createNumberFactory('and', andNumber)
export const createNot = /* #__PURE__ */ createNumberFactory('not', notNumber)
export const createOr = /* #__PURE__ */ createNumberFactory('or', orNumber)
export const createXor = /* #__PURE__ */ createNumberFactory('xor', xorNumber)

// matrix
export { createFilter } from './function/matrix/filter.js'
export { createForEach } from './function/matrix/forEach.js'
export { createMap } from './function/matrix/map.js'
export { createRange } from './function/matrix/range.js'
export { createSize } from './function/matrix/size.js'
// FIXME: create a lightweight "number" implementation of subset only supporting plain objects/arrays
export const createIndex = /* #__PURE__ */ factory('index', [], () => noIndex)
export const createMatrix = /* #__PURE__ */ factory('matrix', [], () => noMatrix) // FIXME: needed now because subset transform needs it. Remove the need for it in subset
export const createSubset = /* #__PURE__ */ factory('subset', [], () => noSubset)
// TODO: provide number+array implementations for map, filter, forEach, zeros, ...?
// TODO: create range implementation for range?
export { createPartitionSelect } from './function/matrix/partitionSelect.js'

// probability
export const createCombinations = createNumberFactory('combinations', combinationsNumber)
export const createGamma = createNumberFactory('gamma', gammaNumber)

// relational
export { createEqualScalarNumber as createEqualScalar } from './function/relational/equalScalar.js'
export { createCompareNumber as createCompare } from './function/relational/compare.js'
export { createCompareNatural } from './function/relational/compareNatural.js'
export { createCompareTextNumber as createCompareText } from './function/relational/compareText.js'
export { createEqualNumber as createEqual } from './function/relational/equal.js'
export { createEqualText } from './function/relational/equalText.js'
export { createSmallerNumber as createSmaller } from './function/relational/smaller.js'
export { createSmallerEqNumber as createSmallerEq } from './function/relational/smallerEq.js'
export { createLargerNumber as createLarger } from './function/relational/larger.js'
export { createLargerEqNumber as createLargerEq } from './function/relational/largerEq.js'
export { createDeepEqual } from './function/relational/deepEqual.js'
export { createUnequalNumber as createUnequal } from './function/relational/unequal.js'

// string
export { createFormat } from './function/string/format.js'
export { createPrint } from './function/string/print.js'

// trigonometry
export const createAcos = /* #__PURE__ */ createNumberFactory('acos', acosNumber)
export const createAcosh = /* #__PURE__ */ createNumberFactory('acosh', acoshNumber)
export const createAcot = /* #__PURE__ */ createNumberFactory('acot', acotNumber)
export const createAcoth = /* #__PURE__ */ createNumberFactory('acoth', acothNumber)
export const createAcsc = /* #__PURE__ */ createNumberFactory('acsc', acscNumber)
export const createAcsch = /* #__PURE__ */ createNumberFactory('acsch', acschNumber)
export const createAsec = /* #__PURE__ */ createNumberFactory('asec', asecNumber)
export const createAsech = /* #__PURE__ */ createNumberFactory('asech', asechNumber)
export const createAsin = /* #__PURE__ */ createNumberFactory('asin', asinNumber)
export const createAsinh = /* #__PURE__ */ createNumberFactory('asinh', asinhNumber)
export const createAtan = /* #__PURE__ */ createNumberFactory('atan', atanNumber)
export const createAtan2 = /* #__PURE__ */ createNumberFactory('atan2', atan2Number)
export const createAtanh = /* #__PURE__ */ createNumberFactory('atanh', atanhNumber)
export const createCos = /* #__PURE__ */ createNumberFactory('cos', cosNumber)
export const createCosh = /* #__PURE__ */ createNumberFactory('cosh', coshNumber)
export const createCot = /* #__PURE__ */ createNumberFactory('cot', cotNumber)
export const createCoth = /* #__PURE__ */ createNumberFactory('coth', cothNumber)
export const createCsc = /* #__PURE__ */ createNumberFactory('csc', cscNumber)
export const createCsch = /* #__PURE__ */ createNumberFactory('csch', cschNumber)
export const createSec = /* #__PURE__ */ createNumberFactory('sec', secNumber)
export const createSech = /* #__PURE__ */ createNumberFactory('sech', sechNumber)
export const createSin = /* #__PURE__ */ createNumberFactory('sin', sinNumber)
export const createSinh = /* #__PURE__ */ createNumberFactory('sinh', sinhNumber)
export const createTan = /* #__PURE__ */ createNumberFactory('tan', tanNumber)
export const createTanh = /* #__PURE__ */ createNumberFactory('tanh', tanhNumber)

// utils
export { createClone } from './function/utils/clone.js'
export const createIsInteger = /* #__PURE__ */ createNumberFactory('isInteger', isIntegerNumber)
export const createIsNegative = /* #__PURE__ */ createNumberFactory('isNegative', isNegativeNumber)
export { createIsNumeric } from './function/utils/isNumeric.js'
export { createHasNumericValue } from './function/utils/hasNumericValue.js'
export const createIsPositive = /* #__PURE__ */ createNumberFactory('isPositive', isPositiveNumber)
export const createIsZero = /* #__PURE__ */ createNumberFactory('isZero', isZeroNumber)
export const createIsNaN = /* #__PURE__ */ createNumberFactory('isNaN', isNaNNumber)
export { createTypeOf } from './function/utils/typeOf.js'
export { createIsPrime } from './function/utils/isPrime.js'
export { createNumeric } from './function/utils/numeric.js'

// json
export { createReviver } from './json/reviver.js'
export { createReplacer } from './json/replacer.js'

// helper function to create a factory function for a function which only needs typed-function
function createNumberFactory (name, fn) {
  return factory(name, ['typed'], ({ typed }) => typed(fn))
}
