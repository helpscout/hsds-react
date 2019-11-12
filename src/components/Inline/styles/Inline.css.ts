import styled from 'styled-components'

import forEach from '../../../styles/utilities/forEach'

export const config = {
  defaultSpacing: '4px',
  spacing: {
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '10px',
  },
}

interface InlineUIProps {}

export const InlineUI = styled('div')`
  display: block;
  margin-bottom: calc(${config.defaultSpacing} * -1);
  margin-left: 0;
  max-width: 100%;
  padding-left: 0;

  &:after {
    box-sizing: border-box;
    content: ' ';
    clear: both;
    display: table;
  }

  &:last-child {
    margin-bottom: calc(${config.defaultSpacing} * -1);
  }

  ${makeSizeStyles};
`

export const ItemUI = styled('div')`
  display: inline-block;
  margin: 0 ${config.defaultSpacing} ${config.defaultSpacing} 0;
  max-width: 100%;
  padding: 0;
  vertical-align: middle;
`

function makeSizeStyles(): string {
  return forEach(
    config.spacing,
    (size, value) => `
    &.is-${size} {
      margin-bottom: calc(${value} * -1);

      &:last-child {
        margin-bottom: calc(${value} * -1);
      }

      .c-InlineItem {
        margin-bottom: ${value};
        margin-right: ${value};
      }
    }
  `
  )
}
