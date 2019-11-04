import styled from 'styled-components'
import { getColor } from '../../../styles/utilities/color'
import { shadowlessBoxShadowWithHover } from '../../../styles/mixins/cardStyles.css'
import { noteBoxShadowWithHover } from '../../../styles/mixins/noteStyles.css'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { BEM } from '../../../utilities/classNames'
import Card from '../../Card'

const bem = BEM('.c-PreviewCard')

export const PreviewCardUI = styled(Card)`
  ${baseStyles};
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
    ${noteBoxShadowWithHover()}
    border: none;
  }
`
