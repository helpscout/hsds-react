import styled, { css } from 'styled-components'
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

export const emoticonAnimationCSS = css`
  /**
   * Face Animations
   */

  &:hover,
  &:focus {
    .is-reaction-happy {
      .reaction-head {
        fill: ${reactionEmoticonsColours.on.head.happy};
      }
      .reaction-face {
        fill: ${reactionEmoticonsColours.on.face};
        animation: HSDSEmoticonYep 1s;
      }
    }
    .is-reaction-okay {
      .reaction-head {
        fill: ${reactionEmoticonsColours.on.head.okay};
      }
      .reaction-face {
        fill: ${reactionEmoticonsColours.on.face};
        animation: HSDSEmoticonMeh 0.5s forwards,
          HSDSEmoticonMehBack 0.5s forwards 1s;
      }
    }
    .is-reaction-sad {
      .reaction-head {
        fill: ${reactionEmoticonsColours.on.head.sad};
      }
      .reaction-face {
        fill: ${reactionEmoticonsColours.on.face};
        animation: HSDSEmoticonNotReally 1s;
      }
    }
  }

  @keyframes HSDSEmoticonYep {
    15%,
    45%,
    75% {
      transform: translate3d(0, -2px, 0);
    }
    30%,
    60% {
      transform: translate3d(0, 2px, 0);
    }
  }

  @keyframes HSDSEmoticonMeh {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(-12deg);
    }
  }

  @keyframes HSDSEmoticonMehBack {
    0% {
      transform: rotate(-12deg);
    }
    100% {
      transform: rotate(0);
    }
  }

  @keyframes HSDSEmoticonNotReally {
    15%,
    45%,
    75% {
      transform: translate3d(-2px, 0, 0);
    }
    30%,
    60% {
      transform: translate3d(2px, 0, 0);
    }
  }
`

const sizes = {
  xl: '38px',
  lg: '24px',
  md: '20px',
  sm: '16px',
}

export const EmoticonAnimationUI = styled.span`
  ${emoticonAnimationCSS};
`

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

  &.is-xl {
    svg {
      height: ${sizes.xl};
      width: ${sizes.xl};
    }
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
