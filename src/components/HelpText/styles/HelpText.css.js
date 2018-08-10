// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled'
import { makeStateColorStyles } from '../../../styles/mixins/stateStyles.css.js'
import { getColor } from '../../../styles/utilities/color'

export const HelpTextUI = styled('div')`
  ${baseStyles}
  color: ${getColor('text.subtle')};
  padding: 4px 0;

  ${makeStateColorStyles()}

  &.is-compact {
    margin-top: -8px;
  }
`

export default HelpTextUI
