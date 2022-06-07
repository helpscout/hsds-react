import styled from 'styled-components'
import { breakpoints } from '@hsds/utils-mixins'

export const config = {
  gutter: '15px',
  gridSize: 12,
}

export const ColUI = styled('div')`
  box-sizing: border-box;
  min-height: 1px;
  padding-left: ${config.gutter};
  padding-right: ${config.gutter};
  position: relative;
  width: 100%;

  ${makeSizeStyles};
`

function makeSizeStyles() {
  let styles = ''

  // Media queries don't bump CSS scope. Therefore, the 0-12 size generators
  // can't be lumped into a single for loop. Each media query must have their
  // own 0-12 sizes generated.
  for (let i = 0, len = config.gridSize + 1; i < len; i++) {
    styles += `
      &.is-${i} {
        width: calc((${i} / 12) * 100%);
      }
    `
  }
  for (let i = 0, len = config.gridSize + 1; i < len; i++) {
    styles += `
      @media (min-width: ${breakpoints.sm}) {
        &.is-${i}\\@sm {
          width: calc((${i} / 12) * 100%);
        }
      }
    `
  }
  for (let i = 0, len = config.gridSize + 1; i < len; i++) {
    styles += `
      @media (min-width: ${breakpoints.md}) {
        &.is-${i}\\@md {
          width: calc((${i} / 12) * 100%);
        }
      }
    `
  }
  for (let i = 0, len = config.gridSize + 1; i < len; i++) {
    styles += `
      @media (min-width: ${breakpoints.lg}) {
        &.is-${i}\\@lg {
          width: calc((${i} / 12) * 100%);
        }
      }
    `
  }

  return styles
}
