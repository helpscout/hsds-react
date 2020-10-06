import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'

export const DepthUI = styled('div')`
  background-color: #fff;
  transition: box-shadow 0.16s;
  will-change: box-shadow;

  &.d100 {
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  }

  &.d200 {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

    &.is-active,
    &.with-hover-effect:hover {
      box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
    }
  }

  &.d300 {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.04),
      0 5px 8px rgba(99, 116, 134, 0.03);

    &.is-active,
    &.with-hover-effect:hover {
      box-shadow: 0 0 0 1px ${getColor('grey.500')},
        0 2px 8px rgba(0, 0, 0, 0.04), 0 5px 8px rgba(99, 116, 134, 0.03);
    }
  }

  &.d400 {
    box-shadow: 0 0 0 1px rgba(197, 206, 214, 0.7),
      0 1px 0 0 ${getColor('grey.600')}, 0 1px 3px rgba(0, 0, 0, 0.1);

    &.is-active,
    &.with-hover-effect:hover {
      box-shadow: 0 0 0 1px rgba(197, 206, 214, 0.7),
        0 1px 0 0 ${getColor('grey.600')}, 0 4px 20px rgba(0, 0, 0, 0.1);
    }
  }

  &.d500 {
    box-shadow: inset 0 0 0 1px ${getColor('grey.600')},
      0 1px 7px rgba(0, 0, 0, 0.08);

    &.is-active,
    &.with-hover-effect:hover {
      box-shadow: inset 0 0 0 1px ${getColor('grey.700')},
        0 30px 60px rgba(0, 0, 0, 0.15);
    }
  }

  &.d600 {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.15);
  }

  &.d700 {
    box-shadow: 0 2px 3px rgba(64, 82, 97, 0.2),
      0 10px 40px rgba(64, 82, 97, 0.3);
  }
`
