import styled from 'styled-components'
import { getColor } from '@hsds/utils-color'

export const AvatarRowUI = styled('div')`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  min-width: ${({ $minWidth }) => `${$minWidth}px`};

  .c-Avatar {
    flex-shrink: 0;
    margin-right: ${({ $gap }) => `${$gap}px`};

    &:last-child {
      margin-right: 0;
    }
  }

  .c-Tooltip {
    line-height: 20px;
  }
`

export const CounterAvatarUI = styled('div')`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  border-radius: 50%;
  background-color: ${getColor('ash.400')};
  color: ${getColor('charcoal.500')};
  font-size: ${({ $fontSize }) => `${$fontSize}px`};
  font-weight: 500;
`
