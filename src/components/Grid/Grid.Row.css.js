import styled from 'styled-components'
import { forEach } from '@hsds/utils-sass'

export const config = {
  gutter: '15px',
  size: {
    md: {
      gutter: '8px',
    },
    sm: {
      gutter: '4px',
    },
    xs: {
      gutter: '2px',
    },
  },
}

export const RowUI = styled('div')`
  box-sizing: border-box;
  display: block;
  margin-left: calc(${config.gutter} * -1);
  margin-right: calc(${config.gutter} * -1);

  &::after {
    clear: both;
    content: '';
    display: table;
  }

  > .c-Col {
    float: left;
  }

  &.is-flex {
    display: flex;
    flex-wrap: wrap;

    > .c-Col {
      float: initial;
    }
  }

  ${makeSizeStyles};
`

function makeSizeStyles() {
  return forEach(
    config.size,
    (size, props) => `
    &.is-${size} {
      margin-left: calc(${props.gutter} * -1);
      margin-right: calc(${props.gutter} * -1);

      > .c-Col {
        padding-left: ${props.gutter};
        padding-right: ${props.gutter};
      }
    }
  `
  )
}
