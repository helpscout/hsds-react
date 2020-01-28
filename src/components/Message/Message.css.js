import styled from 'styled-components'
import { BEM } from '../../utilities/classNames'
import { getColor } from '../../styles/utilities/color'
import { noteBoxShadow } from '../../styles/mixins/noteStyles.css'
import linkStyles from '../../styles/mixins/linkStyles.css'
import { config as BubbleConfig } from './Message.Bubble.css'
import ChatBlock from './Message.ChatBlock'
import Chat from './Message.Chat'
import Text from '../Text'

const messageBEM = BEM('.c-Message')
const messageChatBEM = BEM('.c-MessageChat')
const messageChatBlockBEM = BEM('.c-MessageChatBlock')
const messageContentBEM = BEM('.c-MessageContent')
const MessageBubble = '.c-MessageBubble'
const embedConfig = {
  embedBorderRadius: '3px',
  embedWidth: '9999px',
  embedMaxWidth: '300px',
}
export const chatBlockConfig = {
  timestampSize: 60,
  transition: 'opacity 100ms linear',
}

export const MessageUI = styled.div`
  margin-bottom: 20px;
  min-width: 320px;

  ${messageBEM.element('avatar-block')} {
    padding-bottom: 1px;
    padding-top: 1px;
    width: 28px;
  }

  ${messageBEM.element('from')} {
    margin-bottom: 7px;
    margin-left: 14px;
  }

  &.is-to {
    text-align: right;

    ${messageBEM.element('avatar-block')} {
      align-self: flex-end;
      display: flex;
    }

    ${messageBEM.element('block')} {
      padding-bottom: 1px;
      padding-right: 1px;
    }
  }

  &.is-from {
    text-align: left;

    ${messageBEM.element('block')} {
      padding-left: 1px;
      padding-top: 1px;
    }
  }

  &.has-avatar {
    ${messageBEM.element('from')} {
      padding-left: 18px;
    }
  }

  &.is-theme-embed {
    min-width: initial;

    ${messageBEM.element('avatar-block')} {
      margin-top: 8px;
    }
  }

  &.is-theme-notifications {
    margin-bottom: 0;
    min-width: initial;
  }
`

/**
 * ====================
 * ATTACHMENT
 * ====================
 */

export const TextUI = styled(Text)`
  &.has-noUrl {
    opacity: 0.4;
  }
`

/**
 * ====================
 * EMBED
 * ====================
 */

export const EmbedUI = styled(Chat)`
  .c-MessageEmbed__html {
    border-radius: ${embedConfig.embedBorderRadius};
    max-width: 100%;
    overflow: hidden;
    width: ${embedConfig.embedWidth};
  }

  iframe {
    opacity: 1;
    transition: opacity 0.5s ease-in;
  }

  &.is-loading iframe {
    opacity: 0;
  }

  .c-MessageEmbed__bubble.c-MessageBubble {
    background-color: white;
    border: none;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
      0px 0px 0px 1px rgba(193, 203, 212, 0.7) inset,
      0px -1px 0px 0px ${getColor('grey.600')} inset;
    color: ${getColor('charcoal.200')};
    display: inline-block;
    max-width: ${embedConfig.embedMaxWidth};
    overflow: hidden;
    padding: 3px;
    width: 100%;

    &.is-note {
      ${noteBoxShadow()};
      background-color: ${getColor('yellow.200')};
      color: ${getColor('yellow.800')};
    }
  }

  .c-MessageEmbed__loading.c-LoadingDots {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

/**
 * ====================
 * ACTION
 * ====================
 */

export const ActionChatBlockUI = styled.div`
  padding-bottom: 4px;
  padding-top: 4px;

  a {
    ${linkStyles()};
  }
`

/**
 * ====================
 * CHAT
 * ====================
 */

export const ChatUI = styled(ChatBlock)`
  display: block;
  margin: 0 0 2px;

  &:last-child {
    margin-bottom: 0;
  }

  & ~ ${messageChatBEM.block} {
    ${MessageBubble} {
      border-top-right-radius: ${BubbleConfig.borderRadius.sm}px;
    }
  }

  &.is-from {
    & ~ ${messageChatBEM.block} {
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

/**
 * ====================
 * CHAT BLOCK
 * ====================
 */

export const ChatBlockUI = styled.div`
  display: block;
  margin: 0 0 2px;

  &:last-child {
    margin-bottom: 0;
  }

  ${messageChatBlockBEM.element('timestamp')} {
    min-width: ${chatBlockConfig.timestampSize}px;
    opacity: 0;
    transition: ${chatBlockConfig.transition};
    will-change: opacity;
  }
  &:hover {
    ${messageChatBlockBEM.element('timestamp')} {
      opacity: 1;
    }
  }

  ${messageChatBlockBEM.element('block')} {
    max-width: calc(100% - ${chatBlockConfig.timestampSize}px);
  }

  &.is-from {
    ${messageChatBlockBEM.element('flexy')} {
      justify-content: flex-start;
    }
  }

  &.is-to {
    ${messageChatBlockBEM.element('flexy')} {
      justify-content: flex-end;
    }
  }

  &.is-theme-embed {
    &.is-type-action {
      ${messageChatBlockBEM.element('block')} {
        margin: auto;
      }
    }
    ${messageChatBlockBEM.element('block')} {
      max-width: 100%;
    }
  }

  &.is-theme-notifications {
    margin-bottom: 3px;

    &:last-child {
      margin-bottom: 3px;
    }

    ${messageChatBlockBEM.element('flexy')} {
      justify-content: flex-end;
    }

    ${messageChatBlockBEM.element('block')} {
      max-width: 100%;
    }
  }

  &.is-type-action {
    ${messageChatBlockBEM.element('block')} {
      max-width: 100%;
    }
  }
`

/**
 * ====================
 * CONTENT
 * ====================
 */

export const ContentUI = styled(ChatBlock)`
  ${messageContentBEM.element('content')} {
    max-width: 500px;
    text-align: left;

    &.is-rtl {
      direction: rtl;
      text-align: right;
    }
  }
`
