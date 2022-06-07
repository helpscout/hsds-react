import styled from 'styled-components'

import { config as inputConfig } from './Input.css'
import { forEach } from '@hsds/utils-sass'

export const config = {
  defaultHeight: inputConfig.size.md.height,
  size: inputConfig.size,
}

export const StaticUI = styled('div')`
  color: currentColor;
  display: inline-block;
  min-height: ${config.defaultHeight};
  line-height: ${config.defaultHeight};

  &.is-block {
    display: block;
  }

  &.is-centerAlign {
    align-items: center;
    display: flex;
  }

  &.is-left {
    text-align: left;
  }
  &.is-right {
    text-align: right;
  }
  &.is-center {
    text-align: center;
  }

  ${makeSizeStyles};
`

function makeSizeStyles() {
  return forEach(config.size, (size, props) => {
    const { height } = props

    return `
      &.is-${size} {
        min-height: ${height};
        line-height: ${height};
      }
    `
  })
}
