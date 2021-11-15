import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { darken } from '../../utilities/color'
import forEach from '../../styles/utilities/forEach'
import Icon from '../Icon'
import Truncate from '../Truncate'
import {
  focusRing,
  focusShadowWithInset,
} from '../../styles/mixins/focusRing.css'

export const config = {
  colors: {
    blue: '#ACE3FF',
    green: '#BCF1CA',
    grey: getColor('grey.500'),
    orange: '#FFBE6B',
    purple: '#DDCCFF',
    red: '#FFAFB1',
    yellow: '#FFE258',
    teal: '#A8F0EC',
    pink: '#FFCAFE',
  },
}

export const RemoveTagUI = styled.button`
  ${focusRing}

  border-radius: 3px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.61;
  position: relative;
  cursor: pointer;
  position: absolute;
  right: 2px;
  top: 50%;
  margin-top: -8px;
  border: none;
  background: transparent;
  padding: 0;

  // focus border overwrites
  &:before {
    box-shadow: ${focusShadowWithInset};
  }

  &:hover,
  &:focus {
    opacity: 1;
  }
`

export const CountUI = styled.span`
  min-width: 18px;
  height: 18px;
  padding: 2px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${getColor('charcoal.600')};
  background-color: var(--tagColor);
  border-radius: 100px;
  margin-left: 8px;
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
  ${focusRing}
  --focusRingOffset: -3px;

  background-color: white;
  border-radius: 3px;
  border: 1px solid var(--tagColor);
  color: ${getColor('charcoal.600')};
  display: flex;
  flex: 1 1 100%;
  align-items: center;
  padding: 0 5px;
  height: 18px;
  max-width: 100%;
  font-weight: 500;
  letter-spacing: -0.1px;
  line-height: 12px;
  font-size: 11.5px;

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  text-decoration: none;

  &.is-all-caps {
    text-transform: uppercase;
  }

  ${makeColorStyles()};

  &.is-filled {
    &.is-grey {
      --tagColor: ${getColor('grey.400')};
    }

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
    padding: 0 6px;
    height: 22px;
  }

  &.is-lg {
    padding: 0 8px;
    height: 28px;
    border-radius: 4px;
    font-size: 13px;

    ${CountUI} {
      font-size: 12px;
    }
  }

  &.is-removable {
    padding-right: 16px;

    &.is-md {
      padding-right: 20px;
    }
  }
`

export const TagGroupUI = styled.div`
  position: relative;
  display: inline-flex;
  opacity: 0;
  transition: 0.3s ease-out opacity;

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

  &.is-md,
  &.is-sm {
    ${RemoveTagUI} {
      margin-top: -9px;
      width: 18px;
      height: 18px;
    }
  }

  &.is-sm {
    ${RemoveTagUI} {
      right: 0;
    }
  }
`

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
