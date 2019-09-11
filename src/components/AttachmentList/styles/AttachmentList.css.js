import { styledComponent } from '../../styled'
import baseStyles from '../../../styles/resets/baseStyles.css'

export const AttachmentListUI = styledComponent.div`
  ${baseStyles}

  .c-AttachmentWrapper {
    &:hover {
      .c-Attachment__closeButton {
        display: block;
      }
    }
    &:last-child {
      padding-right: 10px;
    }
  }

  // Modifiers
  &.withOverflow.is-theme-preview {
    .c-AttachmentWrapper {
      padding-top: 10px;
    }
  }
`
