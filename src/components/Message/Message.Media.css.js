import styled from 'styled-components'
import Image from '../Image'
import { generateBreakPoint } from '@hsds/utils-mixins'
import { noteBoxShadow } from '../../styles/mixins/noteStyles.css'
import { getColor } from '@hsds/utils-color'

import { BEM } from '@hsds/utils-bem'
import MessageChat from './Message.Chat'

const bem = BEM('.c-MessageMedia')

const mediaImageStyles = `
  max-width: 100%;
  min-width: 100%;
  object-fit: cover;
`

export const ImageUI = styled(Image)`
  ${mediaImageStyles};
`

export const MediaUI = styled(MessageChat)`
  ${bem.element('caption')} {
    padding: 8px;
  }

  ${bem.element('mediaImage')} {
    ${mediaImageStyles};
    max-height: 250px;
    opacity: 1;
    transition: opacity 200ms linear;
  }

  ${bem.element('bubble') + '.c-MessageBubble'} {
    background-color: white;
    border: none;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
      0px 0px 0px 1px rgba(193, 203, 212, 0.7) inset,
      0px -1px 0px 0px ${getColor('grey.600')} inset;
    color: ${getColor('charcoal.200')};
    display: inline-block;
    max-width: 300px;
    padding: 3px;

    .c-MessageCaption__text {
      color: currentColor;
    }

    &.is-note {
      ${noteBoxShadow()};
      background-color: ${getColor('yellow.200')};
      color: ${getColor('yellow.800')};
    }

    &.is-from {
      text-align: left;
    }

    &.is-to {
      text-align: right;
    }
  }

  ${bem.element('mediaContainer')} {
    padding-bottom: 0;

    ${bem.element('media')} {
      cursor: pointer;
    }
  }

  ${bem.element('loadingSpinner')} {
    margin-right: 4px;
    position: relative;
    top: 1px;
  }

  &__modal.c-Modal {
    ${generateBreakPoint(
      'md',
      `
      padding: 20px;
    `
    )};
  }

  &__modal {
    ${bem.element('media')} {
      img {
        border-radius: 0px;
      }
    }

    ${bem.element('mediaImage')} {
      ${mediaImageStyles};
    }

    ${bem.element('caption')} {
      padding: 10px;
    }
  }

  &__modalCard {
    overflow: hidden;
  }

  &.is-error {
    ${bem.element('bubble') + '.c-MessageBubble'} {
      box-shadow: 0 0 0 1px ${getColor('red.400')} inset;
      color: ${getColor('red.500')};

      ${bem.element('mediaImage')} {
        opacity: 0.5;
      }
    }
  }
  ${bem.element('tryAgainAction')} {
    color: currentColor;
    font-size: inherit;
    text-decoration: underline;
  }
`
