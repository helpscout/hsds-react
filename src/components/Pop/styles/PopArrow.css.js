const css = props => {
  const { color, placement, size } = props
  const sizePx = `${size}px`
  const dblSizePx = `${size * 2}px`

  const borderColor = color
    ? `
    border-color: ${color};
  `
    : ''

  const verticalStartEnd = `
    left: calc(50% - ${sizePx});
    &.is-start {
      left: calc(0% + ${dblSizePx});
    }
    &.is-end {
      left: calc(100% - ${dblSizePx} - ${sizePx});
    }
  `

  const horizontalStartEnd = `
    top: calc(50% - ${sizePx});
    &.is-start {
      top: calc(0% + ${dblSizePx});
    }
    &.is-end {
      top: calc(100% - ${dblSizePx} - ${sizePx});
    }
  `

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
        ${verticalStartEnd}
      }

      &.is-bottom {
        border-width: 0 ${sizePx} ${sizePx} ${sizePx};
        border-left-color: transparent;
        border-right-color: transparent;
        border-top-color: transparent;
        top: -${sizePx};
        ${verticalStartEnd}
      }

      &.is-left {
        border-width: ${sizePx} 0 ${sizePx} ${sizePx};
        border-top-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
        right: -${sizePx};
        ${horizontalStartEnd}
      }

      &.is-right {
        border-width: ${sizePx} ${sizePx} ${sizePx} 0;
        border-top-color: transparent;
        border-left-color: transparent;
        border-bottom-color: transparent;
        left: -${sizePx};
        ${horizontalStartEnd}
      }
    }
  `
}

export default css
