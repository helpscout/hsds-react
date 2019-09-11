import { styledComponent } from '../../styled'
import visuallyHidden from '../../../styles/mixins/visuallyHidden.css'

export const VisuallyHiddenUI = styledComponent.span`
  ${visuallyHidden()}

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
