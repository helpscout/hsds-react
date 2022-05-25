import styled from 'styled-components'

import { BEM } from '@hsds/utils-bem'

const bem = BEM('.c-MessageChatBlock')
export const config = {
  timestampSize: 60,
  transition: 'opacity 100ms linear',
}

export const ChatBlockUI = styled.div`
  display: block;
  margin: 0 0 2px;

  &:last-child {
    margin-bottom: 0;
  }

  ${bem.element('timestamp')} {
    min-width: ${config.timestampSize}px;
    opacity: 0;
    transition: ${config.transition};
    will-change: opacity;
  }
  &:hover {
    ${bem.element('timestamp')} {
      opacity: 1;
    }
  }

  ${bem.element('block')} {
    max-width: calc(100% - ${config.timestampSize}px);
  }

  &.is-from {
    ${bem.element('flexy')} {
      justify-content: flex-start;
    }
  }

  &.is-to {
    ${bem.element('flexy')} {
      justify-content: flex-end;
    }
  }

  &.is-theme-embed {
    ${bem.element('block')} {
      max-width: 100%;
    }
  }

  &.is-theme-notifications {
    margin-bottom: 3px;

    &:last-child {
      margin-bottom: 3px;
    }

    ${bem.element('flexy')} {
      justify-content: flex-end;
    }

    ${bem.element('block')} {
      max-width: 100%;
    }
  }
`
