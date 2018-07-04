const css = `
  box-sizing: border-box;
  will-change: contents;

  &.is-auto {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export default css
