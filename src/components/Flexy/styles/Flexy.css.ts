import base from '../../../styles/resets/base.css'
import forEach from '../../../styles/utilities/forEach'
import styled from '../../styled'

export const config = {
  gapSize: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
}

export const FlexyUI = styled('div')`
  ${base} align-items: center;
  display: flex;
  justify-content: space-between;

  &.is-align-top {
    align-items: flex-start;
  }
  &.is-align-middle {
    align-items: center;
  }
  &.is-align-bottom {
    align-items: flex-end;
  }
  &.is-align-stretch {
    align-items: stretch;
  }

  &.is-just-default {
    justify-content: space-between;
  }
  &.is-just-left {
    justify-content: flex-start;
  }
  &.is-just-center {
    justify-content: center;
  }
  &.is-just-right {
    justify-content: flex-end;
  }

  ${makeGapStyles()};
`

function makeGapStyles(): string {
  return forEach(
    config.gapSize,
    (size, value) => `
    &.is-gap-${size} {
      > * {
        margin-left: ${value}px;

        &:first-child {
          margin-left: 0;
        }
      }
    }
  `
  )
}
