import styled from 'styled-components'
import { getColor } from '../../../styles/utilities/color'
import forEach from '../../../styles/utilities/forEach'

/*
$height: 6px;
  $sizes: (
    lg: (
      height: 10px,
    ),
    md: (
      height: $height,
    ),
    sm: (
      height: 2px,
    ),
  );
  background-color: _color(grey, 300);
  border-radius: 200px;
  height: $height;
  width: 100%;

  &__bar {
    background: linear-gradient(to right, _color(green, 400), _color(green, 500));
    border-radius: 200px;
    height: 100%;
    transition: width 0.3s ease;
    width: 0%;
  }

  // Sizes
  @each $size, $values in $sizes {
    &.is-#{$size} {
      $sz: _get($values, height);
      height: $sz;
    }
  }
*/
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
