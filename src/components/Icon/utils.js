import { isString } from '../../utilities/is'

export const COMPONENT_KEY = 'Icon'

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
