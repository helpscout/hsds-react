// @flow
import baseStyles from '../../../styles/resets/base.css.js'
import { color } from './variables.css.js'

const css = `
  ${baseStyles}
  background-color: ${color.background};
  border-radius: 3px;
  color: ${color.text};
  display: block;
  font-size: 12px;
  max-width: 300px;
  padding: 6px 8px;
  word-break: break-word;
`

export default css
