import styled from 'styled-components'
import { BEM } from '@hsds/utils-bem'
import Text from '../Text'

const bem = BEM('.c-Message')

export const MessageUI = styled.div`
  margin-bottom: 20px;
  min-width: 320px;

  ${bem.element('avatar-block')} {
    padding-bottom: 1px;
    padding-top: 1px;
    width: 28px;
  }

  ${bem.element('from')} {
    margin-bottom: 7px;
    margin-left: 14px;
  }

  .c-MessageChatBlock:only-child .c-MessageBubble.emoji-only {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  .c-MessageChatBlock:first-child .c-MessageBubble.emoji-only {
    padding-top: 0 !important;
  }
  .c-MessageChatBlock:last-child .c-MessageBubble.emoji-only {
    padding-bottom: 0 !important;
  }

  &.is-to {
    text-align: right;

    ${bem.element('avatar-block')} {
      align-self: flex-end;
      display: flex;
    }

    ${bem.element('block')} {
      padding-bottom: 1px;
      padding-right: 1px;
    }
  }

  &.is-from {
    text-align: left;

    ${bem.element('block')} {
      padding-left: 1px;
      padding-top: 1px;
    }
  }

  &.has-avatar {
    ${bem.element('from')} {
      padding-left: 18px;
    }
  }

  &.is-theme-embed {
    min-width: initial;

    ${bem.element('avatar-block')} {
      margin-top: 8px;
    }
  }

  &.is-theme-notifications {
    margin-bottom: 0;
    min-width: initial;
  }
`

export const TextUI = styled(Text)`
  &.has-noUrl {
    opacity: 0.4;
  }
`
