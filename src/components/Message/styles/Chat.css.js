// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { config as BubbleConfig } from './Bubble.css.js'

const css = `
  ${baseStyles}
  display: block;
  margin: 0 0 2px;

  &:last-child {
    margin-bottom: 0;
  }

  & ~ & {
    .c-MessageBubble {
      border-top-right-radius: ${BubbleConfig.borderRadius.sm}px;
    }
  }

  &.is-from {
    & ~ & {
      .c-MessageBubble {
        border-top-right-radius: ${BubbleConfig.borderRadius.md}px;
      }
    }

    &:last-child {
      .c-MessageBubble {
        border-top-right-radius: ${BubbleConfig.borderRadius.md}px;
        border-bottom-left-radius: ${BubbleConfig.borderRadius.md}px;
      }
    }
  }
`

export default css
