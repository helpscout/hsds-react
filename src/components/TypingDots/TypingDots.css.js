import styled from 'styled-components'
import { getColor } from '@hsds/utils-color'

const config = {
  gap: 3,
  size: 5,
}

export const TypingDotsUI = styled('div')`
  align-items: flex-end;
  color: ${getColor('grey.800')};
  display: flex;
  width: ${config.size * 3 + config.gap * 2}px;
`

export const DotUI = styled('div')`
  animation: bounceAnimation 1.3s linear infinite;
  animation-delay: ${props => props.delay};
  background-color: currentColor;
  border-radius: 50%;
  height: ${config.size}px;
  margin-right: ${config.gap}px;
  opacity: ${props => props.opacity};
  width: ${config.size}px;

  @keyframes bounceAnimation {
    0%,
    60%,
    100% {
      transform: initial;
    }

    30% {
      transform: translateY(-10px);
    }
  }

  &:last-child {
    margin-right: 0;
  }
`
