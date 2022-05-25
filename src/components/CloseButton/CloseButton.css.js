import styled from 'styled-components'
import Icon from '../Icon'

import { getColor } from '@hsds/utils-color'
import { forEach } from '@hsds/utils-sass'

export const config = {
  color: getColor('grey.700'),
  colorHover: getColor('grey.800'),
  colorActive: getColor('charcoal.200'),
  padding: '2px 6px',
  size: '32px',
  sizes: {
    md: {
      size: '32px',
      padding: '2px 6px',
    },
    sm: {
      size: '28px',
      padding: '2px 3px',
    },
    xs: {
      size: '24px',
      padding: '2px 1px',
    },
    tiny: {
      size: '20px',
      padding: '0 0',
    },
  },
}

export const IconUI = styled(Icon)`
  opacity: 0.5;
  position: relative;
  transition: opacity 0.1s ease;
  z-index: 1;
`

export const CloseButtonUI = styled('button')`
  appearance: none;
  cursor: pointer;
  outline: none;
  position: relative;

  background-color: white;
  border: none;
  border-radius: 50%;
  color: ${config.color};
  cursor: pointer;
  display: block;
  height: ${config.size};
  padding: ${config.padding};
  position: relative;
  transition: background-color 300ms ease;
  width: ${config.size};

  &:hover,
  &:focus {
    color: ${config.colorHover};
    outline: none;

    ${IconUI} {
      opacity: 0.8;
    }
  }
  &:active {
    color: ${config.colorActive};
    outline: none;

    ${IconUI} {
      opacity: 0.8;
    }
  }

  &.is-seamless {
    background-color: transparent;
    color: currentColor;

    &:hover,
    &:active,
    &:focus {
      background-color: transparent;
      color: currentColor;
    }
  }

  ${makeSizeStyles};
`

function makeSizeStyles() {
  return forEach(
    config.sizes,
    (size, values) => `
    &.is-${size} {
      height: ${values.size};
      padding: ${values.padding};
      width: ${values.size};
    }
  `
  )
}
