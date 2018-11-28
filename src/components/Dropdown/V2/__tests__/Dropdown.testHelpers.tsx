import { initialState } from '../Dropdown.store'

export const getDOMNode = (wrapper: any): any => {
  if (!wrapper.getDOMNode || !wrapper.first) return wrapper

  return wrapper.first().getDOMNode()
}

export const find = (wrapper: any, selector: string): any => {
  return wrapper.find(selector).first()
}

export const findDOMNode = (wrapper: any, selector: string): any => {
  return getDOMNode(wrapper.find(selector))
}

export const hasClass = (wrapper: any, className: string): boolean => {
  return getDOMNode(wrapper).classList.contains(className)
}

export const getAttribute = (wrapper: any, attribute: string): any => {
  return getDOMNode(wrapper).getAttribute(attribute)
}
