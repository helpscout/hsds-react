import { getColor } from '../../styles/utilities/color'

import forEach from '../../styles/utilities/forEach'
import Animate from '../Animate'
import Spinner from '../Spinner'
import Icon from '../Icon'
import Text from '../Text'
import styled from '../styled'

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
    yellow: getColor('yellow.500'),
  },
  height: {
    sm: 17,
    md: 22,
  },
  padding: {
    sm: '0 4px',
    md: '0 8px',
  },
}

export const BodyUI = styled('div')`
  max-width: 100%;
  display: flex;
  align-items: center;
  height: ${config.height.sm}px;
`

export const IconWrapperUI = styled('div')`
  flex: 0 0 auto;
`

export const TextUI = styled(Text)`
  flex: 1 1 auto;
`

export const AnimateUI = styled(Animate)`
  max-width: 100%;
`

export const TagWrapperUI = styled('div')`
  max-width: 100%;

  &.is-display-block {
    display: block;
  }
  &.is-display-inlineBlock {
    display: inline-block;
  }
`

export const TagUI = styled('div')`
  background-color: white;
  border-radius: ${config.borderRadius}px;
  border: 1px solid currentColor;
  color: ${config.colors.default};
  display: flex;
  align-items: center;
  padding: ${config.padding.sm};
  height: ${config.height.sm}px;
  max-width: 100%;

  ${makeColorStyles()};

  &.is-md {
    padding: ${config.padding.md};
    height: ${config.height.md}px;

    .c-Tag__body {
      height: ${config.height.md}px;
    }
  }

  &.is-removable {
    padding-right: 0;
  }

  &.is-pulsing {
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

export const SpinnerUI = styled(Spinner)`
  color: currentColor;
  height: 100%;
  width: 20px;
  text-align: center;
  justify-content: center;
  display: flex;
  align-items: center;

  &.is-md {
    width: 24px;
    position: relative;
    right: -1px;
  }

  &.is-filled {
    color: white;
  }
`

export const IconUI = styled(Icon)`
  color: currentColor;
  transition: 0.2s ease-in-out opacity;
  height: 100%;
  transform: scale(1.2);

  &.is-md {
    transform: scale(1);
    position: relative;
    right: -1px;
  }

  &.is-filled {
    opacity: 0.75;
    color: white;

    &:hover {
      opacity: 1;
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
