import baseStyles from '../../../styles/resets/baseStyles.css'
import { color } from './variables.css'

const css = `
.TooltipPopper {
  ${baseStyles}
  background-color: ${color.background};
  border-radius: 3px;
  color: ${color.text};
  font-size: 12px;
  max-width: 300px;
  padding: 6px 8px;
  word-break: break-word;
}
`

export default css
