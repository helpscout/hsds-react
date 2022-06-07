import styled from 'styled-components'
import { getColor } from '@hsds/utils-color'

const gap = 3
const size = 5

export const LoadingDotsUI = styled.div`
  color: ${getColor('grey.800')};
  display: flex;
  width: ${size * 3 + gap * 2}px;

  &.is-left {
    margin-right: auto;
  }
  &.is-center {
    margin-left: auto;
    margin-right: auto;
  }
  &.is-right {
    margin-left: auto;
  }
`

export const LoadingDotUI = styled.div`
  background-color: currentColor;
  border-radius: 200%;
  display: block;
  margin-right: ${gap}px;
  height: ${size}px;
  width: ${size}px;
  animation-direction: normal;

  &:last-child {
    margin-right: 0;
  }

  &.is-one {
    animation: dotOne 1s ease-in-out infinite;
  }
  &.is-two {
    animation: dotTwo 1s ease-in-out infinite;
  }
  &.is-three {
    animation: dotThree 1s ease-in-out infinite;
  }

  @keyframes dotOne {
    0% {
      opacity: 0.4;
    }
    33.333% {
      opacity: 1;
    }
    66.6667% {
      opacity: 0.4;
    }
    100% {
      opacity: 0.4;
    }
  }

  @keyframes dotTwo {
    0% {
      opacity: 0.4;
    }
    33.333% {
      opacity: 0.4;
    }
    66.6667% {
      opacity: 1;
    }
    100% {
      opacity: 0.4;
    }
  }

  @keyframes dotThree {
    0% {
      opacity: 0.4;
    }
    33.333% {
      opacity: 0.4;
    }
    66.6667% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`
