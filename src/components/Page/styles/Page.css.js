// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'

export const config = {
  width: {
    default: 700,
  },
}

const css = `
  ${baseStyles}
  margin-left: auto;
  margin-right: auto;
  max-width: ${config.width.default}px;
  width: 100%;
`

export default css
