import { styledComponent } from '../../styled'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { config as BubbleConfig } from './Bubble.css'
import ChatBlock from '../Message.ChatBlock'

import { BEM } from '../../../utilities/classNames'

const bem = BEM('.c-MessageChat')
const MessageBubble = '.c-MessageBubble'

export const ChatBlockUI = styledComponent(ChatBlock)`
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
    & ~ ${bem.block} {
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
