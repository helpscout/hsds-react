// @flow
import { getColor } from '../../../styles/utilities/color.js'
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import variableFontSize from '../../../styles/utilities/variableFontSize'
import { BEM } from '../../../utilities/classNames'

const bem = BEM('.c-MessageBubble')

export const config = {
  borderRadius: {
    md: 8,
    sm: 3,
  },
  padding: {
    md: '13px 20px 13px',
    sm: '5px',
  },
}

export const BodyCSS = `
  color: ${getColor('charcoal.500')};
  font-size: ${variableFontSize({ fontSize: 13 })};
  line-height: 1.5;
  word-break: break-word;
`

export const FromCSS = `
  color: ${getColor('grey.800')};
  margin-bottom: 5px;
  text-align: right;
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
  max-width: 500px;
  text-align: left;
  word-break: break-word;

  &.is-from {
    background-color: white;
    border-color: ${getColor('grey.500')};
    border-top-left-radius: ${config.borderRadius.sm}px;
    border-top-right-radius: ${config.borderRadius.md}px;
    border-bottom-right-radius: ${config.borderRadius.md}px;
    border-bottom-left-radius: ${config.borderRadius.sm}px;
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
  }

  &.is-note {
    background-color: ${getColor('yellow.300')};
    border-color: ${getColor('yellow.300')};
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

  &.is-theme-embed {
    padding: 12px 15px;
    max-width: 100%;

    ${bem.element('typing')} {
      margin-left: 0;
      margin-right: 0;
    }
  }
`

export default css
