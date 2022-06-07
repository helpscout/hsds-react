import styled from 'styled-components'
import { forEach } from '@hsds/utils-sass'
import { getColor } from '@hsds/utils-color'

export const config = {
  color: getColor('grey.400'),
  size: {
    md: 20,
    sm: 12,
    xs: 8,
    none: 0,
  },
}

export const HrUI = styled('hr')`
  border: 0;
  border-top-color: ${config.color};
  border-top-style: solid;
  border-top-width: 1px;
  box-sizing: content-box;
  display: block;
  height: 0;
  margin: 20px 0;

  ${makeSizeStyles()};
`

function makeSizeStyles() {
  const sizes = Object.keys(config.size)

  return forEach(
    sizes,
    size => `
    &.is-${size} {
      margin-bottom: ${config.size[size]}px;
      margin-top: ${config.size[size]}px;
    }
  `
  )
}

export default HrUI
