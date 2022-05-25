import styled from 'styled-components'
import { getColor } from '@hsds/utils-color'
import { forEach } from '@hsds/utils-sass'

const height = 6
const sizes = {
  lg: 10,
  md: height,
  sm: 2,
}

function makeSizeStyles() {
  return forEach(
    sizes,
    (name, size) => `
      &.is-${name} {
        height: ${size}px;
      }
    `
  )
}

export const ProgressBarUI = styled.div`
  background-color: ${getColor('grey.300')};
  border-radius: 200px;
  height: ${height}px;
  width: 100%;

  ${makeSizeStyles()};
`

export const BarUI = styled.div`
  background: linear-gradient(
    to right,
    ${getColor('green.400')},
    ${getColor('green.500')}
  );
  border-radius: 200px;
  height: 100%;
  transition: width 0.3s ease;
  width: ${props => (props.width ? props.width : '0%')};
`
