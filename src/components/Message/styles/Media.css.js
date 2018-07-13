import { breakpoint } from '../../../styles/mixins/breakpoints.css'
import { getColor } from '../../../styles/utilities/color.js'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { BEM } from '../../../utilities/classNames'

const bem = BEM('.c-MessageMedia')

const css = `
  ${baseStyles}
  margin-bottom: 10px;
  margin-top: 10px;

  &:first-child {
    margin-top: 0;
  }

  ${bem.element('caption')} {
    padding: 8px;
  }

  ${bem.element('mediaImage')} {
    max-height: 250px;
    max-width: 300px;
    object-fit: fill;
    opacity: 1;
    transition: opacity 200ms linear;
  }

  ${bem.element('bubble')}.c-MessageBubble {
    background-color: white;
    border: none;
    border-radius: 8px !important;
    box-shadow:
      0 0 0 1px rgba(0,0,0, 0.16) inset,
      0 2px 3px rgba(0,0,0, 0.08);
    color: ${getColor('charcoal', 200)};
    display: inline-block;
    padding: 3px;

    .c-MessageCaption__text {
      color: currentColor;
    }

    &.is-note {
      background-color: ${getColor('yellow', 300)};
      box-shadow:
        0 0 0 1px ${getColor('yellow', 400)} inset,
        0 2px 3px rgba(0,0,0, 0.08);
      color: ${getColor('yellow', 800)};
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

  // Modal
  &__modal.c-Modal {
    ${breakpoint(
      'md',
      `
      padding: 20px;
    `
    )}
  }

  &__modal {
    ${bem.element('media')} {
      img {
        border-radius: 0px;
      }
    }

    ${bem.element('caption')} {
      padding: 10px;
    }
  }

  &__modalCard {
    overflow: hidden;
  }

  // State
  &.is-error {
    ${bem.element('bubble')}.c-MessageBubble {
      box-shadow: 0 0 0 1px ${getColor('red', 400)} inset;
      color: ${getColor('red', 500)};

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

export default css
