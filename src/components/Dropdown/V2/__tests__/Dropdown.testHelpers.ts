export const hasClass = (wrapper: any, className: string): boolean =>
  wrapper.getDOMNode().classList.contains(className)

export const getAttribute = (wrapper: any, attribute: string): any =>
  wrapper.getDOMNode().getAttribute(attribute)
