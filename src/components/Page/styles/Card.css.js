// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { getColor } from '../../../styles/utilities/color'
import { BEM } from '../../../utilities/classNames'

// const bem = BEM('.c-PageCard')

export const config = {
  borderColor: {
    default: 'rgba(0, 0, 0, 0.1)',
    focused: getColor('grey.500'),
  },
  padding: {
    default: '60px 100px',
  },
}

const css = `
  ${baseStyles}
  background-color: white;
  border: 1px solid;
  border-color: ${config.borderColor.default};
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: ${config.padding.default};
  width: 100%;

  &:hover {
    border-color: ${config.borderColor.focused};
  }
`

export default css
