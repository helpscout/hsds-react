import styled from 'styled-components'
import { getColor } from '@hsds/utils-color'
import { noteBoxShadow } from '../../styles/mixins/noteStyles.css'
import MessageChat from './Message.Chat'

const config = {
  embedBorderRadius: '3px',
  embedWidth: '9999px',
  embedMaxWidth: '300px',
}

export const EmbedUI = styled(MessageChat)`
  .c-MessageEmbed__html {
    border-radius: ${config.embedBorderRadius};
    max-width: 100%;
    overflow: hidden;
    width: ${config.embedWidth};
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
    max-width: ${config.embedMaxWidth};
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
