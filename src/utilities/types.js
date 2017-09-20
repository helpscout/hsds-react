export const isNativeSpanType = (component) => {
  const types = [
    'a',
    'b',
    'bold',
    'em',
    'i',
    'span',
    'strong',
    'u'
  ]

  return component.type && types.some(o => o === component.type)
}

export const isNativeBlockType = (component) => {
  const types = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'blockquote',
    'header', 'main', 'section', 'aside',
    'figure',
    'div'
  ]

  return component.type && types.some(o => o === component.type)
}
