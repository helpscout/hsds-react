import Flexy from '../Flexy'
import Nav from '../Nav'
import styled from 'styled-components'

import { forEach } from '@hsds/utils-sass'
import { getColor } from '@hsds/utils-color'

export const config = {
  borderColor: getColor('border'),
  // Note: Transferred from SCSS.
  // Will most likely change to a yellow.X00 shade
  noteBackgroundColor: '#fff7dd',
  noteTextColor: getColor('yellow.800'),
  height: '54px',
  shadowSize: '8px',
  size: {
    xl: '24px',
    lg: '20px',
    md: '12px',
    sm: '8px',
    xs: '4px',
  },
}

export const WrapperUI = styled('div')`
  position: relative;
`

export const ToolbarUI = styled(Flexy)`
  background-color: white;
  min-height: ${config.height};
  padding: 4px 8px;
  position: relative;

  ${makeSizeStyles()};

  &.has-shadow {
    z-index: 1;
  }

  &.is-placement-top {
    border-bottom: 1px solid ${config.borderColor};
  }
  &.is-placement-bottom {
    border-top: 1px solid ${config.borderColor};
  }

  &.is-theme-default {
    background-color: white;
  }
  &.is-theme-note {
    background-color: ${config.noteBackgroundColor};
    color: ${config.noteTextColor};
  }

  &.is-seamless {
    border: none;
  }
`

export const ShadowUI = styled('div')`
  background: linear-gradient(to bottom, black, rgba(0, 0, 0, 0));
  height: ${config.shadowSize};
  opacity: 0.04;
  position: absolute;
  width: 100%;
  z-index: 1;

  &.is-placement-top {
    bottom: calc(${config.shadowSize} * -1);
    background: linear-gradient(to bottom, black, rgba(0, 0, 0, 0));
  }

  &.is-placement-bottom {
    top: calc(${config.shadowSize} * -1);
    background: linear-gradient(to top, black, rgba(0, 0, 0, 0));
  }
`

function makeSizeStyles() {
  return forEach(config.size, (size, value) => {
    return `
      &.is-size-${size} {
        padding-top: ${value};
        padding-bottom: ${value};

        .${Nav.className} {
          margin-bottom: calc(${value} * -1);
        }
      }
    `
  })
}
