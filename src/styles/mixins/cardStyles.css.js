import { getColor } from '@hsds/utils-color'
import { rgba } from '@hsds/utils-color'

export const generateCardStyles = () => {
  const bottomColor = getColor('grey.600')
  const color = getColor('grey.600')
  const colorHover = getColor('grey.700')
  const hoverShadow = '0 3px 12px 0 rgba(0, 0, 0, 0.1)'

  return `
    background-color: white;
    border-radius: 3px;
    box-shadow:
      0 1px 3px 0 rgba(0, 0, 0, 0.1),
      inset 0 0 0 1px ${rgba(color, 0.7)},
      inset 0 -1px 0 0 ${bottomColor};
    transition: box-shadow 200ms linear;
    will-change: box-shadow;

    &:hover {
      box-shadow:
        ${hoverShadow},
        inset 0 0 0 1px ${colorHover},
        inset 0 -1px 0 0 ${bottomColor}
    }
  `
}

export const shadowlessCardBoxShadow = () => `
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0),
    inset 0 0 0 1px ${rgba(getColor('grey.600'), 0.7)},
    inset 0 -1px 0 0 ${getColor('grey.700')};
`

export const shadowlessBoxShadowHover = () => `
  box-shadow:
    0 3px 12px 0 rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px ${getColor('grey.600')},
    inset 0 -1px 0 0 ${getColor('grey.700')};
`

export const shadowlessBoxShadowWithHover = () => `
  &.is-hoverable {
    ${shadowlessCardBoxShadow()}
    &:hover {
      ${shadowlessBoxShadowHover()}
    }
  }
`

export default generateCardStyles
