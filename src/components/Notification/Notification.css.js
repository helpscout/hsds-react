import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { d600 } from '../../styles/mixins/depth.css'
import Animate from '../Animate'
import Text from '../Text'

export const config = {
  borderRadius: {
    md: '8px',
    sm: '2px',
  },
  bubbleClassName: '.c-Notification__messageBubble',
}

export const NotificationUI = styled(Animate)`
  max-width: 300px;

  ${config.bubbleClassName} {
    ${d600}
    cursor: pointer;
    max-width: 100%;
    text-align: right;
    transition: border-radius 200ms ease;
  }

  & + & {
    ${config.bubbleClassName} {
      border-top-right-radius: ${config.borderRadius.md} !important;
    }
  }

  &:last-child {
    ${config.bubbleClassName} {
      border-top-right-radius: ${config.borderRadius.md} !important;
      border-bottom-left-radius: ${config.borderRadius.md} !important;
    }
  }

  &.is-align-right {
    margin-left: auto;

    ${config.bubbleClassName} {
      border-top-left-radius: ${config.borderRadius.md} !important;
      border-top-right-radius: ${config.borderRadius.sm} !important;
      border-bottom-right-radius: ${config.borderRadius.sm} !important;
      border-bottom-left-radius: ${config.borderRadius.md} !important;
    }

    &:only-child {
      ${config.bubbleClassName} {
        border-top-right-radius: ${config.borderRadius.md} !important;
      }
    }

    &:not(:only-child) {
      ${config.bubbleClassName} {
        border-top-right-radius: ${config.borderRadius.sm} !important;
      }
    }

    &:first-child:not(:last-child) {
      ${config.bubbleClassName} {
        border-top-right-radius: ${config.borderRadius.md} !important;
      }
    }
  }

  &.is-align-left {
    margin-right: auto;

    ${config.bubbleClassName} {
      border-top-left-radius: ${config.borderRadius.sm} !important;
      border-top-right-radius: ${config.borderRadius.md} !important;
      border-bottom-right-radius: ${config.borderRadius.md} !important;
      border-bottom-left-radius: ${config.borderRadius.sm} !important;
      text-align: left;
    }

    .c-MessageChatBlock__flexy {
      justify-content: flex-start;
    }
    .c-MessageBubble__from {
      text-align: left;
    }

    &:only-child {
      ${config.bubbleClassName} {
        border-top-left-radius: ${config.borderRadius.md} !important;
      }
    }

    &:not(:only-child) {
      ${config.bubbleClassName} {
        border-top-right-radius: ${config.borderRadius.md} !important;
        border-bottom-left-radius: ${config.borderRadius.sm} !important;
      }
    }

    &:first-child:not(:only-child) {
      ${config.bubbleClassName} {
        border-top-left-radius: ${config.borderRadius.md} !important;
        border-bottom-left-radius: ${config.borderRadius.sm} !important;
        border-bottom-right-radius: ${config.borderRadius.md} !important;
      }
    }
  }
`

export const TextUI = styled(Text)`
  color: ${getColor('charcoal.500')};
`

export const TimerUI = styled('div')`
  animation-fill-mode: forward;
  animation-name: HSDSNotificationTimer;
  animation-iteration-count: 1;
  animation-duration: 5000ms;
  animation-play-state: running;

  @keyframes HSDSNotificationTimer {
  }
`
