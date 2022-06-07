import styled from 'styled-components'
import { forEach } from '@hsds/utils-sass'
import { breakpointAll } from '@hsds/utils-mixins'

export const config = {
  maxWidth: '1140px',
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

export const ContainerUI = styled('div')`
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  max-width: ${config.maxWidth};
  padding-left: ${config.gutter};
  padding-right: ${config.gutter};

  &.is-fluid {
    max-width: 100%;
  }

  ${makeResponsiveStyles};
  ${makeSizeStyles};
`

function makeResponsiveStyles() {
  return breakpointAll(`
    &.is-responsive {
      max-width: 100%;
    }
  `)
}

function makeSizeStyles() {
  return forEach(
    config.size,
    (size, props) => `
    &.is-${size} {
      padding-left: ${props.gutter};
      padding-right: ${props.gutter};
    }
  `
  )
}
