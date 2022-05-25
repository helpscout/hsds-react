import styled from 'styled-components'
import { getColor } from '@hsds/utils-color'
import { BEM } from '@hsds/utils-bem'
import Heading from '../Heading'

const bem = BEM('.c-MessageBubble')

export const config = {
  borderRadius: {
    sm: 4,
    md: 12,
  },
  icon: {
    left: 14,
    offset: {
      md: 20,
      sm: 32,
    },
  },
  maxWidth: 700,
  padding: {
    notification: '18px 20px',
    embed: '12px 15px',
    md: '13px 20px 13px',
    fromMd: '13px 20px 14px',
    sm: '5px',
  },
}

export const MessageBubbleBodyUI = styled('span')`
  color: ${getColor('charcoal.700')};
  line-height: 24px;
  word-break: break-word;

  ${({ showEmojiOnlyStyles }) => showEmojiOnlyStyles && `line-height: 1`}

  ${({ isEmbed }) =>
    isEmbed &&
    `
      color: ${getColor('charcoal.500')};
      line-height: 19px;
      line-height: calc(19 / 13);
    `}
`

export const MessageBubbleFromUI = styled('div')`
  color: ${getColor('charcoal.700')};
  margin-bottom: 5px;
  text-align: right;

  ${({ isEmbed }) => isEmbed && `color: ${getColor('grey.800')};`}
`

export const MessageBubbleIconWrapperUI = styled('div')`
  left: ${config.icon.left}px;
  position: absolute;
`

export const MessageBubbleTitleUI = styled(Heading)`
  margin-bottom: 2px;
`

export const MessageBubbleTypingUI = styled('div')`
  margin-left: -5px;
  margin-right: -5px;
  padding: 7px 0;
`

export const MessageBubbleUI = styled('div')`
  background-color: ${getColor('lavender.200')};
  border-top-left-radius: ${config.borderRadius.md}px;
  border-top-right-radius: ${config.borderRadius.md}px;
  border-bottom-right-radius: ${config.borderRadius.sm}px;
  border-bottom-left-radius: ${config.borderRadius.md}px;
  display: inline-block;
  padding: ${config.padding.md};
  position: relative;
  max-width: ${config.maxWidth}px;
  text-align: left;
  word-break: break-word;

  &.is-from {
    background-color: ${getColor('lavender.100')};
    border-top-left-radius: ${config.borderRadius.sm}px;
    border-top-right-radius: ${config.borderRadius.md}px;
    border-bottom-right-radius: ${config.borderRadius.md}px;
    border-bottom-left-radius: ${config.borderRadius.sm}px;

    &.is-md {
      padding: ${config.padding.fromMd};
    }
  }

  &.is-rtl {
    direction: rtl;
    text-align: right;
  }

  &.is-md {
    padding: ${config.padding.md};
  }
  &.is-sm {
    padding: ${config.padding.sm};
    &.withIcon {
      ${bem.element('content')} {
        margin-left: ${config.icon.offset.sm}px;
      }
    }
  }

  &.is-note:not(.is-typing) {
    background-color: ${getColor('yellow.200')};
    color: ${getColor('yellow.900')};

    * {
      color: currentColor;
    }
  }

  &.is-typing {
    background: none;
    border: 0;
    padding-top: 7px;
  }

  &.is-theme-embed {
    background-color: ${getColor('grey.400')};
    border: 1px solid ${getColor('grey.400')};
    border-radius: 8px 8px 3px 8px;
    max-width: 100%;
    padding: ${config.padding.embed};

    &.is-from {
      background-color: white;
      border-color: ${getColor('grey.500')};
      border-radius: 3px 8px 8px 3px;
    }

    ${bem.element('typing')} {
      margin-left: 0;
      margin-right: 0;
    }

    &.withIcon {
      ${bem.element('content')} {
        margin-left: ${config.icon.offset.md}px;
        padding-left: 4px;
      }
    }

    &.is-note {
      border-color: ${getColor('yellow.400')};
    }
  }

  &.is-theme-notifications {
    padding: ${config.padding.notification};
  }

  ${({ showEmojiOnlyStyles }) =>
    showEmojiOnlyStyles &&
    `
      background: none !important;
      border: none;
      padding-left: 0;
      padding-right:0;
    `}
`
