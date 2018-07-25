// @flow
import { getColor } from '../../../styles/utilities/color'
import forEach from '../../../styles/utilities/forEach'
import { BEM } from '../../../utilities/classNames'

export const ILLO_DEFAULT_SIZE = 40
export const ILLO_SIZES = [ILLO_DEFAULT_SIZE, 60, 72, 80]

const bem = BEM('.c-Illo')

const css = `
  box-sizing: border-box;
  color: currentColor;
  display: block;
  height: ${ILLO_DEFAULT_SIZE}px;
  margin: auto;
  position: relative;
  width: ${ILLO_DEFAULT_SIZE}px;

  ${makeSizeStyles()}

  ${bem.element('icon')} {
    display: block;
    height: 100%;
    pointer-events: none;

    svg {
      display: block;
      height: 100%;
      max-width: 100%;
      width: 100%;
    }
  }

  ${bem.element('pathFillSecondary')} {
    opacity: 0.3;
  }

  &.has-colorSecondary {
    ${bem.element('pathFillSecondary')} {
      opacity: 1;
    }
  }

  ${bem.element('pathFill')} {
    fill: currentColor;

    &UIDark {
      fill: ${getColor('charcoal.200')};
    }
    &UI {
      fill: ${getColor('grey.600')};
    }
    &UILight {
      fill: ${getColor('grey.300')};
    }
    &UIWhite {
      fill: white;
    }
  }
`

function makeSizeStyles(): string {
  return forEach(
    ILLO_SIZES,
    size => `
    &.is-${size} {
      height: ${size}px;
      width: ${size}px;
    }
  `
  )
}

export default css
