/* istanbul ignore file */
// Vendorized memoize-one to improve stability with import/require
// Source:
// https://github.com/alexreardon/memoize-one

const shallowEqual = function shallowEqual(newValue, oldValue) {
  return newValue === oldValue
}

const simpleIsEqual = function simpleIsEqual(newArgs, lastArgs) {
  return (
    newArgs.length === lastArgs.length &&
    newArgs.every(function (newArg, index) {
      return shallowEqual(newArg, lastArgs[index])
    })
  )
}

export function memoizeOne(resultFn, isEqual) {
  if (isEqual === void 0) {
    isEqual = simpleIsEqual
  }

  let lastThis
  let lastArgs = []
  let lastResult
  let calledOnce = false

  var result = function result() {
    for (
      var _len = arguments.length, newArgs = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      newArgs[_key] = arguments[_key]
    }

    if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
      return lastResult
    }

    lastResult = resultFn.apply(this, newArgs)
    calledOnce = true

    lastThis = this

    lastArgs = newArgs
    return lastResult
  }

  return result
}

export default memoizeOne
