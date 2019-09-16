import baseStyles from '../../../styles/resets/baseStyles.css'
import styled from 'styled-components'
import { makeStateColorStyles } from '../../../styles/mixins/stateStyles.css'
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
