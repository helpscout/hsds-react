import { forEach } from '@hsds/utils-sass'
import styled from 'styled-components'

export const config = {
  gapSize: {
    4: {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
    },
    5: {
      xs: 5,
      sm: 10,
      md: 15,
      lg: 20,
      xl: 25,
    },
  },
}

export const FlexyUI = styled('div')`
  align-items: center;
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

  ${makeGapStyles};
`

function makeGapStyles(props) {
  const { baseSize } = props
  const gapSize = config.gapSize[baseSize]

  return forEach(
    gapSize,
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

export const FlexyBlockUI = styled('div')`
  flex: 1;
  max-width: 100%;
  min-width: 0;
`

export const FlexyItemUI = styled('div')`
  &.is-inlineItem {
    max-width: 100%;
  }

  &.is-defaultItem {
    max-width: 100%;
    min-width: 0;
  }
`
