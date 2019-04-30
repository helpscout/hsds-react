import baseStyles from '../../../styles/resets/baseStyles.css'
import { BEM } from '../../../utilities/classNames'

const bem: any = BEM('.c-Overflow')

const css = `
  ${baseStyles}
  overflow: hidden;
  position: relative;
  transition: height 100ms ease;
  will-change: height;

  ${
    // TODO: fix typescript complains
    // @ts-ignore
    bem.element('container')
  } {
    overflow-x: auto;
    padding-bottom: 20px;
    will-change: scroll-position;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  ${
    // TODO: fix typescript complains
    // @ts-ignore
    bem.element('content')
  } {
    position: relative;
    white-space: nowrap;
    z-index: 0;
  }

  ${
    // TODO: fix typescript complains
    // @ts-ignore
    bem.element('fader')
  } {
    bottom: 0;
    color: white;
    cursor: pointer;
    position: absolute;
    top: 0;
    width: 32px;
    transform: scaleX(0);
    z-index: 1;

    &.is-left {
      background: linear-gradient(to right, currentColor, rgba(255, 255, 255, 0));
      left: 0;
      transform-origin: left;
    }
    &.is-right {
      background: linear-gradient(to left, currentColor, rgba(255, 255, 255, 0));
      right: 0;
      transform-origin: right;
    }
  }
`

export default css
