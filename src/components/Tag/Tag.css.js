import { getColor } from '../../styles/utilities/color'

import forEach from '../../styles/utilities/forEach'
import Animate from '../Animate'
import Spinner from '../Spinner'
import Icon from '../Icon'
import Text from '../Text'
import Flexy from '../Flexy'
import styled from 'styled-components'

export const config = {
  borderRadius: 3,
  colors: {
    default: {
      main: getColor('charcoal.200'),
      secondary: 'white',
    },
    blue: {
      main: getColor('blue.500'),
      secondary: 'white',
    },
    green: {
      main: getColor('green.500'),
      secondary: 'white',
    },
    grey: {
      main: getColor('charcoal.200'),
      secondary: 'white',
    },
    orange: {
      main: getColor('orange.500'),
      secondary: 'white',
    },
    purple: {
      main: getColor('indigo.500'),
      secondary: 'white',
    },
    red: {
      main: getColor('red.500'),
      secondary: 'white',
    },
    yellow: {
      main: getColor('yellow.500'),
      secondary: 'white',
    },
    lightBlue: {
      main: getColor('blue.200'),
      secondary: getColor('blue.700'),
    },
  },
  height: {
    sm: 16,
    md: 22,
  },
  iconWidth: {
    sm: 18,
    md: 24,
  },
  padding: {
    sm: '0 4px 0',
    md: '0 8px 0',
  },
}

export const BodyUI = styled(Flexy)`
  max-width: 100%;
  display: flex;
  align-items: center;
  height: ${config.height.sm - 2}px;
  line-height: ${config.height.sm}px;
`

export const IconWrapperUI = styled('div')`
  width: ${config.iconWidth.sm}px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &.is-md {
    width: ${config.iconWidth.md}px;
  }
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
  color: ${config.colors.default.main};
  display: flex;
  align-items: center;
  padding: ${config.padding.sm};
  height: ${config.height.sm}px;
  max-width: 100%;

  ${makeColorStyles()};

  &.is-filled {
    padding-top: 0;
  }

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
  width: 100%;
  text-align: center;
  justify-content: center;
  display: flex;
  align-items: center;

  &.is-md {
    position: relative;
    right: -1px;
  }
`

export const IconUI = styled(Icon)`
  color: currentColor;
  transition: 0.2s ease-in-out opacity;
  height: 100%;
  width: 100%;
  transform: scale(1.2);

  &.is-md {
    transform: scale(1);
    position: relative;
    right: -1px;
  }

  &.is-filled {
    opacity: 0.75;

    &:hover {
      opacity: 1;
    }
  }
`

function makeColorStyles() {
  return forEach(
    config.colors,
    (colorName, { main, secondary }) => `
    &.is-${colorName} {
      color: ${main};

      &.is-filled {
        background-color: ${main};
        border-color: ${main};
        color: ${secondary};
      }
    }
  `
  )
}

export default TagUI
