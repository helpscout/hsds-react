import base from '../../../styles/resets/base.css'

// Variables
const colors = {
  on: {
    head: '#FFE8B5',
    face: '#d79400',
  },
  off: {
    head: '#e3e8eb',
    face: '#a5b2bd',
  },
}
const sizes = {
  default: '26px',
  md: '26px',
  sm: '16px',
}

// Styles
const css = `
.c-Emoticon {
  ${base}
  color: currentColor;
  cursor: pointer;
  display: block;
  height: ${sizes.default};
  position: relative;
  width: ${sizes.default};

  &__icon {
    color: currentColor;
    display: block;
    pointer-events: none;

    svg {
      display: block;
      height: auto;
      max-width: 100%;
      width: 100%;
    }
  }

  .c-Emoticon__pathHead {
    fill: ${colors.off.head};
  }
  .c-Emoticon__pathFace {
    fill: ${colors.off.face};
  }

  /**
   * Modifiers
   */
  // Alignment
  &.is-center {
    margin-left: auto;
    margin-right: auto;
  }

  &.is-inline {
    display: inline-block;
  }

  // Interactions
  &.is-noInteract {
    cursor: initial;
    pointer-events: none;
  }

  // Color
  &.is-active {
    .c-Emoticon__pathHead {
      fill: ${colors.on.head};
    }
    .c-Emoticon__pathFace {
      fill: ${colors.on.face};
    }
  }

  // Size
  &.is-md {
    height: ${sizes.md};
    width: ${sizes.md};
  }
  &.is-sm {
    height: ${sizes.sm};
    width: ${sizes.sm};
  }
}
`

export default css
