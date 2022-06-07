import styled from 'styled-components'
import { rgba, getColor } from '@hsds/utils-color'
import { noteBoxShadowWithHover } from '@hsds/utils-mixins'

import { BEM } from '@hsds/utils-bem'
import Card from '../Card'

const bem = BEM('.c-PreviewCard')
const shadowlessCardBoxShadow = () => `
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0),
    inset 0 0 0 1px ${rgba(getColor('grey.600'), 0.7)},
    inset 0 -1px 0 0 ${getColor('grey.700')};
`
const shadowlessBoxShadowHover = () => `
  box-shadow:
    0 3px 12px 0 rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px ${getColor('grey.600')},
    inset 0 -1px 0 0 ${getColor('grey.700')};
`
const shadowlessBoxShadowWithHover = () => `
  &.is-hoverable {
    ${shadowlessCardBoxShadow()}
    &:hover {
      ${shadowlessBoxShadowHover()}
    }
  }
`

export const PreviewCardUI = styled(Card)`
  ${shadowlessBoxShadowWithHover()};
  padding: 20px;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }

  ${bem.element('title')} {
    margin-bottom: 4px;
  }

  &.is-link {
    ${bem.element('title')} {
      color: ${getColor('link.base')};
    }
  }

  &.is-hoverable {
    border-radius: 5px;
  }

  &.is-note {
    ${noteBoxShadowWithHover()};
    border: none;
  }
`
