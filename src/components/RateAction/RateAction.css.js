import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { rgba } from '../../utilities/color'
import { reactionEmoticonsColours } from '../Emoticon/Emoticon.css'

export const config = {
  size: {
    default: '28px',
    lg: '28px',
    md: '24px',
    sm: '20px',
  },
  boxShadowColor: rgba(getColor('grey.600'), 0.5),
  outlineColor: getColor('green.500'),
  transition: 'all 200ms ease-in-out',
}

export const RateActionUI = styled('button')`
  &.c-RateAction {
    -webkit-appearance: none;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 3px 6px 0 ${config.boxShadowColor};
    height: ${config.size.default};
    margin: 0;
    outline: none;
    padding: 0;
    position: relative;
    transition: ${config.transition};
    user-select: none;
    width: ${config.size.default};
    will-change: box-shadow, transform, fill;
    z-index: 0;
    -webkit-user-drag: none;

    path {
      transition: fill 200ms linear;
    }

    /* Removes the ugly dotted line in firefox when focused */
    &::-moz-focus-inner {
      border: 0;
    }

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
      &:focus {
        transform: scale(1);
      }
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
      cursor: pointer;

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
          animation: HSDSEmoticonMeh 0.5s forwards;
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

    &:hover,
    &:focus {
      outline: none;
      box-shadow: 0 4px 7px 0 ${config.boxShadowColor};
      transform: scale(1.3);
      z-index: 1;
    }

    &.is-lg {
      width: ${config.size.lg};
      height: ${config.size.lg};
    }
    &.is-md {
      width: ${config.size.md};
      height: ${config.size.md};

      &:after {
        height: calc(${config.size.md} + 4px);
        width: calc(${config.size.md} + 4px);
      }
    }
    &.is-sm {
      width: ${config.size.sm};
      height: ${config.size.sm};

      &:after {
        height: calc(${config.size.sm} + 4px);
        width: calc(${config.size.sm} + 4px);
      }
    }

    /**
   * Face Animations
   */

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
  }
`
