// Based on this solution
// https://davidwalsh.name/detect-scrollbar-width
// Slightly modified with caching, for performance
const getScrollBarWidth = () => {
  const namespace = 'BlueOSScrollbarWidthDetect'

  if (window[namespace]) {
    return window[namespace]
  }

  const inner = document.createElement('p')
  inner.style.width = '100%'
  inner.style.height = '200px'

  const outer = document.createElement('div')
  outer.style.position = 'absolute'
  outer.style.top = '0px'
  outer.style.left = '0px'
  outer.style.visibility = 'hidden'
  outer.style.width = '200px'
  outer.style.height = '150px'
  outer.style.overflow = 'hidden'
  outer.appendChild(inner)

  document.body.appendChild(outer)
  const w1 = inner.offsetWidth
  outer.style.overflow = 'scroll'
  let w2 = inner.offsetWidth

  if (w1 === w2) {
    w2 = outer.clientWidth
  }

  document.body.removeChild(outer)

  window[namespace] = (w1 - w2)

  return window[namespace]
}

export default getScrollBarWidth
