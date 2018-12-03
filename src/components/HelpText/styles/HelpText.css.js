// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled'
import { getColor } from '../../../styles/utilities/color'

export const HelpTextUI = styled('div')`
  ${baseStyles}
  color: ${getColor('text.subtle')};
  padding: 4px 0;

  &.is-compact {
    margin-top: -8px;
  }
`

export default HelpTextUI
