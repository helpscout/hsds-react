// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { getColor } from '../../../styles/utilities/color'
import styled from '../../styled'

const config = {
  backgroundColor: {
    default: getColor('grey.500'),
    hover: getColor('grey.600'),
  },
  backgroundColorActive: {
    default: getColor('green.500'),
    hover: getColor('green.600'),
  },
  borderRadius: 100,
  color: {
    default: getColor('charcoal.200'),
    active: 'white',
  },
  fontSize: 12,
  padding: '0 10px',
  toggle: {
    offset: 2,
  },
  size: {
    lg: 28,
    md: 21,
    sm: 16,
  },
  transition: {
    switch: 'all 300ms ease',
    toggle: 'all 200ms ease',
  },
}

export const SwitchUI = styled('label')`
  ${baseStyles} display: block;
  margin: 0;
  position: relative;
`

export const SwitchInputUI = styled('input')`
  ${baseStyles} bottom: 0;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
`

export const SwitchToggleUI = styled('div')`
  background-color: ${config.backgroundColor.default};
  border-radius: ${config.borderRadius}px;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1) inset;
  box-sizing: border-box;
  color: ${config.color.default};
  cursor: pointer;
  font-size: ${config.fontSize}px;
  padding: ${config.padding};
  position: relative;
  text-align: right;
  transition: ${config.transition.switch};
  z-index: 1;

  &::before {
    background-color: white;
    border-radius: ${config.borderRadius}px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    content: '';
    left: ${config.toggle.offset}px;
    position: absolute;
    top: ${config.toggle.offset}px;
    transition: ${config.transition.toggle};
  }

  ${makeSizeStyles(config.size.md)} &.is-focused {
    background-color: ${config.backgroundColor.hover};
  }

  &.is-active {
    background-color: ${config.backgroundColorActive.default};
    color: ${config.color.active};
    text-align: left;

    &::before {
      left: inherit;
      right: ${config.toggle.offset}px;
    }

    &.is-focused {
      background-color: ${config.backgroundColorActive.hover};
    }
  }

  &.is-lg {
    ${makeSizeStyles(config.size.lg)};
  }
  &.is-md {
    ${makeSizeStyles(config.size.md)};
  }
  &.is-sm {
    ${makeSizeStyles(config.size.sm)};
  }

  &:active {
    &::before {
      width: 60%;
    }
  }
`

export const SwitchStateUI = styled('div')`
  border-radius: 100px;
  bottom: 0;
  box-shadow: 0 0 0 2px ${getColor('state.error')};
  display: block;
  left: 0;
  opacity: 0.7;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 0;
`

function getWidth(size: number): number {
  return Math.floor(size * 2)
}

function makeSizeStyles(size: number): string {
  return `
    height: ${size}px;
    line-height: ${size}px;
    width: ${getWidth(size)}px;

    &::before {
      height: ${size - config.toggle.offset * 2}px;
      width: ${size - config.toggle.offset * 2}px;
    }
  `
}

export default SwitchUI
