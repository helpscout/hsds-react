// https://github.com/angus-c/just/blob/master/packages/function-debounce/index.js

export default function debounce(fn, wait, callFirst?) {
  var timeout
  return function() {
    if (!wait) {
      // @ts-ignore
      return fn.apply(this, arguments)
    }
    // @ts-ignore
    var context = this
    var args = arguments
    var callNow = callFirst && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(function() {
      timeout = null
      if (!callNow) {
        return fn.apply(context, args)
      }
    }, wait)

    if (callNow) {
      // @ts-ignore
      return fn.apply(this, arguments)
    }
  }
}
