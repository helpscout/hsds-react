// @flow
import { getColor } from '../utilities/color'

export const cardBaseStyles = (subtle: boolean = false) => {
  const color = subtle ? getColor('grey', 500) : getColor('grey', 600)
  const colorHover = subtle ? getColor('grey', 600) : getColor('grey', 700)
  const hoverShadow = subtle
    ? '0 2px 4px 0 rgba(0, 0, 0, 0.1)'
    : '0 3px 12px 0 rgba(0, 0, 0, 0.1)'

  return `
    background-color: white;
    border-radius: 3px;
    box-shadow:
      0 1px 3px 0 rgba(0, 0, 0, 0.1),
      inset 0 0 0 1px ${color},
      inset 0 -1px 0 0 #c1cbd4;
    transition: all 200ms linear;

    &:hover {
      box-shadow:
        ${hoverShadow},
        inset 0 0 0 1px ${colorHover},
        inset 0 -1px 0 0 #c1cbd4
    }
  `
}

export const cardStyles = () => cardBaseStyles()

export const cardSubtleStyles = () => {
  const subtle = true
  return cardBaseStyles(subtle)
}

export default cardStyles
