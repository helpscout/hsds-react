import baseStyles from '../../../styles/resets/baseStyles.css'
import { color } from './variables.css'

const css = `
.c-TooltipPopper {
  ${baseStyles}
  background-color: ${color.background};
  border-radius: 3px;
  color: ${color.text};
  font-size: 12px;
  padding: 6px 8px;
}
`

export default css
