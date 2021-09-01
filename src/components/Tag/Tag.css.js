import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { darken } from '../../utilities/color'
import forEach from '../../styles/utilities/forEach'
import Icon from '../Icon'
import Truncate from '../Truncate'

export const config = {
  borderRadius: 3,
  colors: {
    blue: '#ACE3FF',
    green: '#BCF1CA',
    grey: getColor('grey.400'),
    orange: '#FFBE6B',
    purple: '#DDCCFF',
    red: '#FFAFB1',
    yellow: '#FFE258',
    teal: '#A8F0EC',
    pink: '#FFCAFE',
  },
}

export const IconWrapperUI = styled('div')`
  width: 18px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

export const CountUI = styled('div')`
  min-width: 18px;
  height: 18px;
  padding: 2px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${getColor('charcoal.600')};
  background-color: var(--tagColor);
  border-radius: 100px;
  margin-left: 4px;
`

export const TruncateUI = styled(Truncate)`
  &.is-auto {
    flex: 1 1 auto;
    height: 100%;
    display: flex;
    align-items: center;

    .c-Truncate__content {
      flex: 1 1 auto;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
`

export const RemoveIconUI = styled(Icon)`
  color: currentColor;
  height: 100%;
  width: 100%;
`

export const TagUI = styled('div')`
  background-color: white;
  border-radius: 3px;
  border: 1px solid var(--tagColor);
  color: ${getColor('charcoal.600')};
  display: inline-flex;
  align-items: center;
  padding: 0 5px;
  height: 18px;
  max-width: 100%;
  position: relative;
  font-size: 12px;
  opacity: 0;
  transition: 0.3s ease-out opacity;
  line-height: 1;
  outline: none;

  &.is-all-caps {
    text-transform: uppercase;
  }

  &.element-in {
    opacity: 1;
  }

  & + & {
    margin-left: 8px;
  }

  &.is-display-block {
    display: flex;
  }
  &.is-display-inline {
    display: inline-flex;
  }

  // focus border
  &:before {
    content: '';
    border-radius: 4px;
    bottom: -3px;
    box-shadow: 0 0 0 2px ${getColor('blue.500')};
    left: -3px;
    pointer-events: none;
    position: absolute;
    right: -3px;
    top: -3px;
    opacity: 0;
    background: transparent;
    z-index: 2;
  }

  &:focus {
    &:before {
      opacity: 1;
    }
  }

  &:focus:not(:focus-visible) {
    &:before {
      opacity: 0;
    }
  }

  &:focus-visible {
    &:before {
      opacity: 1;
      transition: opacity ease 0.2s;
    }
  }

  ${makeColorStyles()};

  &.is-filled {
    background-color: var(--tagColor);

    ${CountUI} {
      background-color: white;
    }
  }

  &.is-clickable {
    &:hover {
      cursor: pointer;
      border-color: var(--tagDarkenColor);

      ${RemoveIconUI} {
        opacity: 1;
      }
    }
  }

  &.is-md {
    padding: 0 8px;
    height: 28px;
  }

  &.is-removable {
    padding-right: 0;

    &.is-md {
      padding-right: 2px;
    }
  }
`
/*
&.is-pulsing {
    animation: Tag_Blink 2s infinite both;
    backface-visibility: hidden;
    filter: blur(0);
    -webkit-filter: blur(0);
  }

  @keyframes Tag_Blink {
    0%,
    50%,
    100% {
      opacity: 1;
    }
    25% {
      opacity: 0.4;
    }
  }
  @keyframes Tag_Blink {
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
*/

function makeColorStyles() {
  return forEach(
    config.colors,
    (colorName, color) => `
    &.is-${colorName} {
      --tagColor: ${color};
      --tagDarkenColor: ${darken(color, 30)};
    }
  `
  )
}

export default TagUI
