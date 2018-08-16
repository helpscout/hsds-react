// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { getColor } from '../../../styles/utilities/color'
import forEach from '../../../styles/utilities/forEach'
import { BEM } from '../../../utilities/classNames'
import styled from '../../styled'

const wrapperBEM = BEM('.c-TagWrapper')
const bem = BEM('.c-Tag')

export const config = {
  borderRadius: 3,
  colors: {
    default: getColor('charcoal.200'),
    blue: getColor('blue.500'),
    green: getColor('green.500'),
    grey: getColor('charcoal.200'),
    orange: getColor('orange.500'),
    purple: getColor('purple.500'),
    red: getColor('red.500'),
  },
  height: 18,
  padding: '1px 4px',
}

export const TagWrapperUI = styled('div')`
  ${baseStyles} display: inline-block;
  max-width: 100%;

  &.is-display-block {
    display: block;
  }
  &.is-display-inlineBlock {
    display: inline-block;
  }

  ${wrapperBEM.element('animate')} {
    max-width: 100%;
  }
`

export const TagUI = styled('div')`
  ${baseStyles} background-color: white;
  border-radius: ${config.borderRadius}px;
  border: 1px solid currentColor;
  color: ${config.colors.default};
  display: block;
  padding: ${config.padding};
  height: ${config.height}px;
  max-width: 100%;

  ${bem.element('body')} {
    max-width: 100%;
  }

  ${makeColorStyles()} &.is-pulsing {
    animation: _Blue_Tag_Blink 4s infinite both;
    backface-visibility: hidden;
    filter: blur(0);
    -webkit-filter: blur(0);
  }

  @keyframes _Blue_Tag_Blink {
    0%,
    50%,
    100% {
      opacity: 1;
    }
    25% {
      opacity: 0.4;
    }
  }
  @keyframes _Blue_Tag_Blink {
    0% {
      opacity: 0.2;
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 0.2;
    }
  }
`

function makeColorStyles(): string {
  return forEach(
    config.colors,
    (color, value) => `
    &.is-${color} {
      color: ${value};

      &.is-filled {
        background-color: ${value};
        border-color: ${value};
        color: white;
      }
    }
  `
  )
}

export default TagUI
