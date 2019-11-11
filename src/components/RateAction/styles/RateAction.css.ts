import styled from 'styled-components'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { getColor } from '../../../styles/utilities/color'

export const config = {
  size: {
    default: '28px',
    md: '28px',
    sm: '20px',
  },
  boxShadowColor: '193, 203, 212', // grey.600
  outlineColor: getColor('green.500'),
  transition: 'all 200ms ease-in-out',
}

export const RateActionUI = styled('button')`
  -webkit-user-drag: none;

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
  user-select: none;
  width: ${config.size.default};
  will-change: box-shadow, transform;
  z-index: 0;

  &:after {
    content: '';
    border-radius: 50%;
    border: 2px solid ${config.outlineColor};
    display: none;
    height: calc(${config.size.default} + 4px);
    left: -4px;
    pointer-events: none;
    position: absolute;
    top: -4px;
    width: calc(${config.size.default} + 4px);
    will-change: transform;

    @keyframes HSDSRateActionSelected {
      0% {
        transform: scale(0.5);
      }
      100% {
        transform: scale(1);
      }
    }
  }

  &.is-active {
    &:after {
      animation: HSDSRateActionSelected 200ms
        cubic-bezier(0.39, 0.575, 0.565, 1) both;
      display: block;
    }
  }

  &[disabled] {
    pointer-events: none;
  }

  &:hover,
  &:focus {
    outline: none;
    box-shadow: 0 4px 7px 0 rgba(${config.boxShadowColor}, 0.6);
    transform: scale(1.3);
    z-index: 1;
  }

  &.is-md {
    width: ${config.size.md};
    height: ${config.size.md};
  }
  &.is-sm {
    width: ${config.size.sm};
    height: ${config.size.sm};

    &:after {
      height: calc(${config.size.sm} + 4px);
      width: calc(${config.size.sm} + 4px);
    }
  }
`
