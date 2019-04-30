const css = `
&.ax-fade {
  opacity: 0;
  pointer-events: none;

  &.ax-entered {
    opacity: 1;
    pointer-events: auto;
  }

  &.ax-exiting {
    pointer-events: none;
  }
}
`

export default css
