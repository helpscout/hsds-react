import isString from 'lodash.isstring'

export const COMPONENT_KEY = 'Icon'

export let svgSet = {}

export const load = (svgs = {}) => (svgSet = svgs)
export const unload = () => load({})

export const renameSVGIds = (svgHtml, name) => {
  if (!isString(svgHtml)) {
    return svgHtml
  }

  const regexHash = new RegExp(`#${name}`, 'gi')
  const regexQuote = new RegExp(`"${name}`, 'gi')

  return svgHtml
    .replace(regexHash, `#hsds-icons-${name}`)
    .replace(regexQuote, `"hsds-icons-${name}`)
}
