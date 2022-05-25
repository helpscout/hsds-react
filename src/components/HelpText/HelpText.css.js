import styled from 'styled-components'
import { makeStateColorStyles } from '../../styles/mixins/stateStyles.css'
import { getColor } from '@hsds/utils-color'

export const HelpTextUI = styled('div')`
  color: ${getColor('text.subtle')};
  padding: 4px 0;

  ${makeStateColorStyles()}

  &.is-compact {
    margin-top: -8px;
  }
`

export default HelpTextUI
