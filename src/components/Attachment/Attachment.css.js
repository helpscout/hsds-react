import styled from 'styled-components'
import { BEM } from '../../utilities/classNames'
import cardStyles from '../../styles/mixins/cardStyles.css'
import { d400, d400Effect } from '../../styles/mixins/depth.css'
import linkStyles from '../../styles/mixins/linkStyles.css'
import { getColor } from '../../styles/utilities/color'

const bem = BEM('.c-Attachment')

const config = {
  imageSize: '37px',
  imageMaxWidth: '80px',
}

export const ErrorBorderUI = styled('div')`
  border-radius: 99999px;
  border: 1px solid ${getColor('red.500')};
  bottom: -1px;
  left: -1px;
  pointer-events: none;
  position: absolute;
  right: -1px;
  top: -1px;

  ${({ isCard }) =>
    isCard &&
    `
    border-radius: 3px;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  `};
`

export const AttachmentUI = styled.a`
  ${linkStyles()};

  background-color: white;
  border: 1px solid ${getColor('grey.500')};
  border-radius: 9999px;
  display: inline-block;
  line-height: 1;
  padding: 4px 10px;
  position: relative;
  text-decoration: none;

  &.is-error {
    color: ${getColor('red.500')};

    &:hover,
    &:active,
    &:focus {
      color: ${getColor('red.500')};
    }
  }

  &.is-action {
    ${bem.element('name')} {
      text-decoration: none;
    }
  }

  &.is-theme-preview {
    ${d400}
    border: none;
    border-radius: 3px;
    display: block;
    font-weight: 500;
    padding: 15px 17px;

    &:hover {
      ${d400Effect}
    }

    &.has-image {
      padding: 3px;
    }

    .c-Truncate__content {
      display: block;
      padding: 16px;
      margin: -16px;
    }
  }

  &:hover {
    border-color: ${getColor('grey.600')};
    text-decoration: none;

    ${bem.element('name')} {
      text-decoration: underline;
    }
  }

  ${bem.element('size')} {
    color: ${getColor('charcoal.200')};
    margin-left: 5px;
  }

  ${bem.element('image')} {
    border-radius: 2px;
    height: ${config.imageSize};
    object-fit: cover;
    max-height: ${config.imageSize};
    max-width: ${config.imageMaxWidth};
    min-width: ${config.imageSize};
    width: auto;
  }

  ${bem.element('closeButton')} {
    ${cardStyles()};
    display: block;
    clip: rect(0, 0, 0, 0);
    border-radius: 9999px !important;
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
    z-index: 1;
  }

  &:hover,
  &:focus {
    ${bem.element('closeButton')} {
      clip: unset;
    }
  }

  ${bem.element('closeButton')}:focus {
    clip: unset;
  }
`
