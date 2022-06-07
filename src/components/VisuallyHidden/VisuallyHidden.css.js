import styled from 'styled-components'
import { generateVisuallyHiddenStyles } from '@hsds/utils-mixins'

export const VisuallyHiddenUI = styled.span`
  ${generateVisuallyHiddenStyles()}

  &.is-focusable {
    &:active,
    &:focus {
      clip: auto !important;
      height: auto !important;
      margin: 0;
      overflow: visible !important;
      position: static !important;
      width: auto !important;
    }
  }
`
