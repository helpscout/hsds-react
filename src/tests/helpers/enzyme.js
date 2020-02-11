export const getDOMNode = (wrapper) => {
  if (!wrapper.getDOMNode || !wrapper.first) return wrapper

  return wrapper.first().getDOMNode()
}

export const find = (wrapper, selector) => {
  return wrapper.find(selector).first()
}

export const findDOMNode = (wrapper, selector) => {
  return getDOMNode(wrapper.find(selector))
}

export const hasClass = (wrapper, className) => {
  return getDOMNode(wrapper).classList.contains(className)
}

export const getAttribute = (wrapper, attribute) => {
  return getDOMNode(wrapper).getAttribute(attribute)
}
