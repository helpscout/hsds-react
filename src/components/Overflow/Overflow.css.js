import styled from 'styled-components'

import { BEM } from '@hsds/utils-bem'

const bem = BEM('.c-Overflow')

export const OverflowUI = styled.div`
  overflow: hidden;
  position: relative;
  transition: height 100ms ease;
  will-change: height;

  ${bem.element('container')} {
    overflow-x: auto;
    padding-bottom: 20px;
    will-change: scroll-position;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  ${bem.element('content')} {
    position: relative;
    white-space: nowrap;
    z-index: 0;
  }

  ${bem.element('fader')} {
    bottom: 0;
    color: white;
    cursor: pointer;
    position: absolute;
    top: 0;
    width: 32px;
    transform: scaleX(0);
    z-index: 1;

    &.is-left {
      background: linear-gradient(
        to right,
        currentColor,
        rgba(255, 255, 255, 0)
      );
      left: 0;
      transform-origin: left;
    }
    &.is-right {
      background: linear-gradient(
        to left,
        currentColor,
        rgba(255, 255, 255, 0)
      );
      right: 0;
      transform-origin: right;
    }
  }
`
