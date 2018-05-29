const css = props => {
  const { color, placement, size } = props
  const sizePx = `${size}px`

  const borderColor = color
    ? `
    border-color: ${color};
  `
    : ''

  return `
    .c-PopArrow {
      ${borderColor}
      border-style: solid;
      height: 0;
      position: absolute;
      width: 0;

      &.is-top {
        border-width: ${sizePx} ${sizePx} 0 ${sizePx};
        border-left-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
        bottom: -${sizePx};
        left: calc(50% - ${sizePx});
      }

      &.is-bottom {
        border-width: 0 ${sizePx} ${sizePx} ${sizePx};
        border-left-color: transparent;
        border-right-color: transparent;
        border-top-color: transparent;
        top: -${sizePx};
        left: calc(50% - ${sizePx});
      }

      &.is-left {
        border-width: ${sizePx} 0 ${sizePx} ${sizePx};
        border-top-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
        right: -${sizePx};
        top: calc(50% - ${sizePx});
      }

      &.is-right {
        border-width: ${sizePx} ${sizePx} ${sizePx} 0;
        border-top-color: transparent;
        border-left-color: transparent;
        border-bottom-color: transparent;
        left: -${sizePx};
        top: calc(50% - ${sizePx});
      }
    }
  `
}

export default css
