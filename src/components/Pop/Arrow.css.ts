import { styledComponent } from '../styled'
import baseStyles from '../../styles/resets/base.css.js'

export const ArrowUI = styledComponent.span`
  ${baseStyles};
  height: ${({ size }) => size}px;
  pointer-events: none;
  position: absolute;
  width: ${({ size }) => size}px;

  &.is-hidden {
    visibility: hidden;
  }

  .c-PopArrow {
    ${baseStyles};
    ${({ color }) =>
      color
        ? `
    background: ${color};
  `
        : ''}
    position: absolute;
    transform: rotate(45deg);
    height: calc(${({ size }) => size}px - 4px);
    width: calc(${({ size }) => size}px - 4px);
    margin: 2px;
  }

  &.is-top {
    bottom: calc((${({ size }) => size}px / 2) * -1);

    .is-ghost {
      bottom: 1px;
    }
  }

  &.is-bottom {
    top: calc((${({ size }) => size}px / 2) * -1);

    .is-ghost {
      top: 1px;
    }
  }

  &.is-left {
    right: calc((${({ size }) => size}px / 2) * -1);

    .is-ghost {
      right: 1px;
    }
  }

  &.is-right {
    left: calc((${({ size }) => size}px / 2) * -1);

    .is-ghost {
      left: 1px;
    }
  }
`
