import styled from 'styled-components'
import { getColor } from '@hsds/utils-color'

export const config = {
  backgroundColor: getColor('grey.300'),
  backgroundColorShine: getColor('grey.200'),
  animationDuration: '1000ms',
  size: '20px',
}

export const BlockUI = styled('div')`
  box-sizing: border-box;
  background: ${config.backgroundColor};
  background-image: linear-gradient(
    to left,
    ${config.backgroundColor} 0%,
    ${config.backgroundColorShine} 20%,
    ${config.backgroundColor} 40%,
    ${config.backgroundColor} 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 100%;
  height: ${config.size};
  position: relative;
  width: ${config.size};

  &.is-withAnimations {
    animation-duration: ${config.animationDuration};
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: Blue_Skeleton_Block_shimmer;
    animation-timing-function: linear;
  }

  @keyframes Blue_Skeleton_Block_shimmer {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }
`
