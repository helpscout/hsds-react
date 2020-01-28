import styled from 'styled-components'
import { makeStateColorStyles } from '../../../styles/mixins/stateStyles.js'

export const LabelUI = styled('label')`
  display: inline-block;
  margin-bottom: 4px;

  ${makeStateColorStyles()} &.is-marginless {
    margin-bottom: 0;
  }
`

export default LabelUI
