import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'

// Note: some colours here are not from the Help Scout palette
export const reactionEmoticonsColours = {
  off: {
    head: '#E5E9EC',
    face: getColor('charcoal.300'),
  },
  on: {
    face: '#2E2D2E',
    head: {
      happy: '#FFDA6A',
      okay: '#D2D2D2',
      sad: '#BDD6FF',
    },
  },
}

const sizes = {
  lg: '24px',
  md: '20px',
  sm: '16px',
}

export const IconUI = styled('span')`
  display: block;
  height: 100%;
  pointer-events: none;
  position: relative;

  svg {
    display: block;
  }
`

export const EmoticonUI = styled('span')`
  display: block;
  height: ${({ size }) => sizes[size]};
  width: ${({ size }) => sizes[size]};
  opacity: 1;
  position: relative;
  user-select: none;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);

  /**
   * Modifiers
   */
  &.is-center {
    margin-left: auto;
    margin-right: auto;
  }

  &.is-inline {
    display: inline-block;
  }

  &.is-noInteract {
    cursor: initial;
    pointer-events: none;
  }

  &.is-disabled {
    opacity: 0.5;
    cursor: initial;
    pointer-events: none;
  }

  /**
   * Reactions
   */
  &.is-reaction-happy.is-inactive,
  &.is-reaction-okay.is-inactive,
  &.is-reaction-sad.is-inactive {
    .reaction-head {
      fill: ${reactionEmoticonsColours.off.head};
    }
    .reaction-face {
      fill: ${reactionEmoticonsColours.off.face};
    }
  }
`

export default EmoticonUI
