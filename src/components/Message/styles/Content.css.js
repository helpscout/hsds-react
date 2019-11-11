import styled from 'styled-components'
import ChatBlock from '../Message.ChatBlock'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { BEM } from '../../../utilities/classNames'

const bem = BEM('.c-MessageContent')

export const ContentUI = styled(ChatBlock)`
  ${bem.element('content')} {
    max-width: 500px;
    text-align: left;

    &.is-rtl {
      direction: rtl;
      text-align: right;
    }
  }
`
