import styled from 'styled-components'

import { config as BubbleConfig } from './Message.Bubble.css'
import ChatBlock from './Message.ChatBlock'

import { BEM } from '@hsds/utils-bem'

const bem = BEM('.c-MessageChat')
const MessageBubble = '.c-MessageBubble'

export const ChatBlockUI = styled(ChatBlock)`
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
