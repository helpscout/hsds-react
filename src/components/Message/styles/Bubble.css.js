// @flow
import { getColor } from '../../../styles/utilities/color'
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import variableFontSize from '../../../styles/utilities/variableFontSize'
import { BEM } from '../../../utilities/classNames'

const bem = BEM('.c-MessageBubble')

export const config = {
  borderRadius: {
    md: 8,
    sm: 3,
  },
  lineHeight: 'calc(19 / 13)',
  icon: {
    left: 14,
    offset: {
      md: 20,
      sm: 32,
    },
  },
  maxWidth: 500,
  padding: {
    notification: '18px 20px',
    embed: '12px 15px',
    md: '13px 20px 13px',
    fromMd: '13px 20px 14px',
    sm: '5px',
  },
}

export const BodyCSS = `
  color: ${getColor('charcoal.500')};
  font-size: ${variableFontSize({ fontSize: 13 })};
  line-height: 19px;
  line-height: ${config.lineHeight};
  word-break: break-word;
`

export const FromCSS = `
  color: ${getColor('grey.800')};
  margin-bottom: 5px;
  text-align: right;
`

export const IconWrapperCSS = `
  left: ${config.icon.left}px;
  position: absolute;
`

export const TitleCSS = `
  margin-bottom: 2px;
`

export const TypingCSS = `
  margin-left: -5px;
  margin-right: -5px;
  padding: 7px 0;
`

const css = `
  ${baseStyles}
  background-color: ${getColor('grey.400')};
  border: 1px solid ${getColor('grey.400')};
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
    background-color: white;
    border-color: ${getColor('grey.500')};
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

  &.is-note {
    background-color: ${getColor('yellow.200')};
    border-color: ${getColor('yellow.400')};
    color: ${getColor('yellow.900')};

    * {
      color: currentColor;
    }
  }

  &.is-primary {
    background-color: ${getColor('blue.500')};
    border-color: ${getColor('blue.500')};
    color: white !important;

    * {
      color: currentColor;
    }

    a {
      text-decoration: underline;
    }

    ${bem.element('title')} {
      color: white !important;
      opacity: 0.6;
    }
  }

  &.withIcon {
    ${bem.element('content')} {
      margin-left: ${config.icon.offset.md}px;
    }
  }

  &.is-theme-embed {
    padding: ${config.padding.embed};
    max-width: 100%;

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
  }

  &.is-theme-notifications {
    padding: ${config.padding.notification};
  }
`

export default css
