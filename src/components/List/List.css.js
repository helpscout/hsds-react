import styled from 'styled-components'

import { forEach } from '@hsds/utils-sass'

export const config = {
  size: {
    xl: {
      padding: '16px',
    },
    lg: {
      padding: '8px',
    },
    md: {
      padding: '4px',
    },
    sm: {
      padding: '2px',
    },
    xs: {
      padding: '0px',
    },
  },
}

export const ItemUI = styled.li`
  box-sizing: border-box;
  display: block;
  margin: 0;
  padding: 4px 0;

  ${makeSizeStyles};

  &.is-listItem {
    display: list-item;
  }

  &.is-inline {
    display: inline-block;
    padding-left: 4px;
    vertical-align: middle;

    &:first-child {
      padding-left: 0;
    }
  }

  &.is-inline-sm > {
    padding-left: 3px;
  }

  &.is-inline-xs > {
    padding-left: 2px;
  }

  &.is-border-dot {
    border-bottom: 1px dotted;
    border-color: #eee;
  }

  &.is-border-line {
    border-bottom: 1px solid;
    border-color: #eee;
  }

  &.is-bordered {
    &:last-child {
      border-bottom: none;
    }
  }
`

export const ListUI = styled('ul')`
  box-sizing: border-box;
  display: block;
  list-style: none;
  margin-bottom: 0;
  margin-top: 0;
  padding-left: 0;

  &.is-display-block {
    display: block;
  }
  &.is-display-flex {
    display: flex;
  }

  &.is-bullet,
  &.is-number {
    list-style-type: decimal;
    padding-left: 16px;
  }
`

function makeSizeStyles() {
  return forEach(config.size, (size, values) => {
    return `
      &.is-${size} {
        padding-top: ${values.padding};
        padding-bottom: ${values.padding};
      }
    `
  })
}
