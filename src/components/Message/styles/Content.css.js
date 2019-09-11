import { styledComponent } from '../../styled'
import ChatBlock from '../Message.ChatBlock'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { BEM } from '../../../utilities/classNames'

const bem = BEM('.c-MessageContent')

export const ContentUI = styledComponent(ChatBlock)`
  ${baseStyles}

  ${bem.element('content')} {
    max-width: 500px;
    text-align: left;

    &.is-rtl {
      direction: rtl;
      text-align: right;
    }
  }
`
