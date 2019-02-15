// @flow
import baseStyles from '../../../styles/resets/base.css.js'

const css = (props: Object) => {
  const { color, size } = props
  const sizePx = `${size}px`
  const dblSizePx = `${size * 2}px`

  const borderColor = color
    ? `
    background: ${color};
  `
    : ''

  const verticalStartEnd = `
    left: calc(50% - (${sizePx} / 2));
    &.is-start {
      left: calc(0% + ${dblSizePx});
    }
    &.is-end {
      left: calc(100% - ${dblSizePx} - ${sizePx});
    }
  `

  const horizontalStartEnd = `
    top: calc(50% - (${sizePx} / 2));
    &.is-start {
      top: calc(0% + ${dblSizePx});
    }
    &.is-end {
      top: calc(100% - ${dblSizePx} - ${sizePx});
    }
  `

  return `
    ${baseStyles};
    ${borderColor};
    height: ${sizePx};
    position: absolute;
    transform: rotate(45deg);
    width: ${sizePx};

    &.is-top {
      bottom: calc((${sizePx} / 2) * -1);
      ${verticalStartEnd};

      &.is-ghost {
        margin-bottom: 1px;
      }
    }

    &.is-bottom {
      top: calc((${sizePx} / 2) * -1);
      ${verticalStartEnd};

      &.is-ghost {
        margin-top: 1px;
      }
    }

    &.is-left {
      right: calc((${sizePx} / 2) * -1);
      ${horizontalStartEnd};

      &.is-ghost {
        margin-right: 1px;
      }
    }

    &.is-right {
      left: calc((${sizePx} / 2) * -1);
      ${horizontalStartEnd};

      &.is-ghost {
        margin-left: 1px;
      }
    }
  `
}

export default css
