import styled from '../styled'
import baseStyles from '../../styles/resets/base.css.js'

const css = (props: Object) => {
  const { color, size } = props
  const sizePx = `${size}px`

  const borderColor = color
    ? `
    background: ${color};
  `
    : ''

  return `
    ${baseStyles};
    height: ${sizePx};
    pointer-events: none;
    position: absolute;
    width: ${sizePx};

    &.is-hidden {
      visibility: hidden;
    }

    .c-PopArrow {
      ${baseStyles};
      ${borderColor};
      position: absolute;
      transform: rotate(45deg);
      height: calc(${sizePx} - 4px);
      width: calc(${sizePx} - 4px);
      margin: 2px;
    }

    &.is-top {
      bottom: calc((${sizePx} / 2) * -1);

      .is-ghost {
        bottom: 1px;
      }
    }

    &.is-bottom {
      top: calc((${sizePx} / 2) * -1);

      .is-ghost {
        top: 1px;
      }
    }

    &.is-left {
      right: calc((${sizePx} / 2) * -1);

      .is-ghost {
        right: 1px;
      }
    }

    &.is-right {
      left: calc((${sizePx} / 2) * -1);

      .is-ghost {
        left: 1px;
      }
    }
  `
}

export const ArrowUI = styled('span')(css)
