import styled from '../styled'
import baseStyles from '../../styles/resets/baseStyles.css'
import { getColor } from '../../styles/utilities/color'

export const config = {
  size: {
    default: '28px',
    md: '28px',
    sm: '20px',
  },
  boxShadowColor: '193, 203, 212', // grey.600
  transition: 'all 200ms ease-in-out',
}

export const RateActionUI = styled('button')`
  ${baseStyles};
  appearance: none;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 3px 6px 0 rgba(${config.boxShadowColor}, 0.5);
  height: ${config.size.default};
  margin: 0;
  outline: none;
  padding: 0;
  position: relative;
  transition: ${config.transition};
  user-drag: none;
  user-select: none;
  width: ${config.size.default};

  &:hover,
  &:focus {
    outline: none;
    box-shadow: 0 4px 7px 0 rgba(${config.boxShadowColor}, 0.6);
    transform: scale(1.3);
  }

  &.is-md {
    width: ${config.size.md};
    height: ${config.size.md};
  }
  &.is-sm {
    width: ${config.size.sm};
    height: ${config.size.sm};
  }
`
