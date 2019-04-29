import styled from '../../styled/index'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { config as inputConfig } from './Input.css'
import forEach from '../../../styles/utilities/forEach'

export const config = {
  defaultHeight: inputConfig.size.md,
  size: inputConfig.size,
}

export const StaticUI = styled('div')`
  ${baseStyles};
  color: currentColor;
  display: inline-block;
  height: ${config.defaultHeight};
  line-height: ${config.defaultHeight};

  &.is-block {
    display: block;
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

function makeSizeStyles(): string {
  return forEach(config.size, (size, props) => {
    const { height } = props

    return `
      &.is-${size} {
        height: ${height};
        line-height: ${height};
      }
    `
  })
}
