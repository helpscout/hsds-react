// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { config as BubbleConfig } from './Bubble.css.js'
import { BEM } from '../../../utilities/classNames'

const bem = BEM('.c-MessageChat')
const MessageBubble = '.c-MessageBubble'

const css = `
  ${baseStyles}
  display: block;
  margin: 0 0 2px;

  &:last-child {
    margin-bottom: 0;
  }

  & ~ ${bem.block} {
    ${MessageBubble} {
      border-top-right-radius: ${BubbleConfig.borderRadius.sm}px;
    }
  }

  &.is-from {
    ${bem.block} ~ ${bem.block} {
      ${MessageBubble} {
        border-top-right-radius: ${BubbleConfig.borderRadius.md}px;
      }
    }

    &:last-child {
      ${MessageBubble} {
        border-top-right-radius: ${BubbleConfig.borderRadius.md}px;
        border-bottom-left-radius: ${BubbleConfig.borderRadius.md}px;
      }
    }
  }
`

export default css
