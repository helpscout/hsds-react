const up = `
&.ax-up {
  transform: translateY(12px);

  &.ax-entered {
    transform: translateY(0);
  }
}
`

const down = `
&.ax-down {
  transform: translateY(-12px);

  &.ax-entered {
    transform: translateY(0);
  }
}
`

const left = `
&.ax-left {
  transform: translateX(12px);

  &.ax-entered {
    transform: translateX(0);
  }
}
`

const right = `
&.ax-right {
  transform: translateX(-12px);

  &.ax-entered {
    transform: translateX(0);
  }
}
`

const upUp = `
&.ax-upUp {
  transform: translateY(12px);

  &.ax-entered {
    transform: translateY(0);
  }
  &.ax-exiting {
    transform: translateY(-12px);
  }
  &.ax-exited {
    transform: translateY(-12px);
  }
}
`

const fade = `
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

const scale = `
&.ax-scale {
  transform: scale(0.8);

  &.ax-entered {
    transform: scale(1);
  }
}

&.ax-scaleLg {
  transform: scale(0.5);

  &.ax-entered {
    transform: scale(1);
  }
}

&.ax-scaleXl {
  transform: scale(0.3);

  &.ax-entered {
    transform: scale(1);
  }
}
`

export default `
${up}
${down}
${left}
${right}

${upUp}

${fade}
${scale}
`
