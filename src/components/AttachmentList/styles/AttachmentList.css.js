import baseStyles from '../../../styles/resets/baseStyles.css'

const css = `
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

export default css
