export const matches = (function (Element) {
  // IE Element.matches polyfill
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
  if (!Element.prototype.matches) {
    Element.prototype.matches =
    (Element.prototype).matchesSelector ||
    (Element.prototype).mozMatchesSelector ||
    (Element.prototype).msMatchesSelector ||
    (Element.prototype).oMatchesSelector ||
    (Element.prototype).webkitMatchesSelector ||
    function (s) {
      let matches = (this.document || this.ownerDocument).querySelectorAll(s)
      let i = matches.length
      while (--i >= 0 && matches.item(i) !== this) { }
      return i > -1
    }
  }
})(window.Element)

export const closest = (function (Element) {
  // IE Element.closest polyfill
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
  if (!Element.prototype.matches) matches()
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
      let el = this
      if (document.documentElement) {
        if (!document.documentElement.contains(el)) return null
      }
      do {
        if (el.matches(s)) return el
        el = el.parentElement || el.parentNode
      } while (el !== null && el.nodeType === 1)
      return null
    }
  }
})(window.Element)
