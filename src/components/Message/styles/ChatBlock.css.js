import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { BEM } from '../../../utilities/classNames'

const bem = BEM('.c-MessageChatBlock')
export const config = {
  timestampSize: 60,
  transition: 'opacity 100ms linear',
}

const css = `
  ${baseStyles}
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
    &.is-type-action {
      ${bem.element('block')} {
        margin: auto;
      }
    }
    ${bem.element('block')} {
      max-width: 100%;
    }
  }

  &.is-theme-notifications {
    margin-bottom: 5px;

    &:last-child {
      margin-bottom: 5px;
    }

    ${bem.element('flexy')} {
      justify-content: flex-end;
    }

    ${bem.element('block')} {
      max-width: 100%;
    }
  }

  &.is-type-action {
    ${bem.element('block')} {
      max-width: 100%;
    }
  }
`

export default css
