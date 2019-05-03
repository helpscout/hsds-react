//
import { FONT_SIZE } from '../configs/constants'
import fontFamilyStyles from './fontFamily.css.js'

const css = `
  ${fontFamilyStyles}
  font-size: ${FONT_SIZE}px;
  font-size: var(--BlueConfigGlobalFontSize, ${FONT_SIZE}px);
`

export default css
