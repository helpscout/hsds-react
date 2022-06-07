import { getColor } from '@hsds/utils-color'
import { forEach } from '@hsds/utils-sass'
import styled from 'styled-components'

export const config = {
  backgroundColor: 'white',
  borderWidth: 2,
  color: {
    default: getColor('grey.600'),
    active: getColor('green.500'),
    inactive: getColor('grey.600'),
    offline: getColor('red.500'),
    busy: getColor('yellow.500'),
    custom: getColor('purple.400'),
  },
  dotSize: 6,
  defaultSize: 2 * 2 + 6,
  iconSize: 18,
  size: {
    md: 8,
    sm: 4,
  },
}

export const StatusDotUI = styled('div')`
  background-color: currentColor;
  border-radius: 50%;
  border: ${config.borderWidth}px solid ${config.backgroundColor};
  color: ${config.color.default};
  height: ${config.defaultSize}px;
  width: ${config.defaultSize}px;

  &.is-inline {
    display: inline-block;
  }

  &.is-available,
  &.is-active,
  &.is-online,
  &.is-new {
    border: none;
    color: ${config.color.active};
  }

  &.is-unavailable,
  &.is-offline {
    border-color: ${config.color.offline};
    color: ${config.backgroundColor};
  }

  &.is-assign,
  &.is-busy {
    border-color: ${config.color.busy};
    color: ${config.backgroundColor};
  }

  &.is-inactive {
    border: none;
    color: ${config.color.inactive};
  }

  &.is-custom {
    border-color: ${config.color.custom};
    color: ${config.backgroundColor};
  }

  ${makeSizeStyles()} &.is-icon {
    background-color: ${config.backgroundColor};
    border-width: 0;
    height: ${config.iconSize}px;
    width: ${config.iconSize}px;

    &.is-offline {
      color: ${config.color.offline};
    }

    &.is-busy {
      color: ${config.color.busy};
    }
  }
`

export const CenteredContentUI = styled('div')`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

function makeSizeStyles() {
  return forEach(config.size, (name, value) => {
    const size = Math.floor(config.borderWidth * 2) + value

    return `
      &.is-${name} {
        height: ${size}px;
        width: ${size}px;
      }
    `
  })
}
