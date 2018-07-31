const css = `
&.ax-fade {
  opacity: 0;
  pointer-events: none;

  &.ax-entering {
    will-change: opacity;
  }

  &.ax-entered {
    opacity: 1;
    pointer-events: auto;
  }

  &.ax-exiting {
    pointer-events: none;
    will-change: opacity;
  }
}
`

export default css
