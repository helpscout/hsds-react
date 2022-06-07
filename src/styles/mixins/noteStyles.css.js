import { getColor } from '@hsds/utils-color'

export const noteBoxShadow = () => `
  box-shadow:
    0px 1px 3px 0px rgba(0, 0, 0, 0),
    inset 0px 0px 0px 1px ${getColor('yellow.400')};
`

export const noteBoxShadowHover = () => `
  box-shadow:
    0 3px 12px 0 rgba(0, 0, 0, 0.1),
    inset 0px 0px 0px 1px ${getColor('yellow.400')};
`

export const noteBoxShadowWithHover = () => `
  ${noteBoxShadow()}
  &:hover {
    ${noteBoxShadowHover()}
  }
`
