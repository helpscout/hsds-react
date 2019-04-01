import baseStyles from '../../../styles/resets/baseStyles.css'
import { BEM } from '../../../utilities/classNames'

const bem = BEM('.c-MessageContent')

const css = `
  ${baseStyles}

  ${bem.element('content')} {
    max-width: 500px;
    text-align: left;

    &.is-rtl {
      direction: rtl;
      text-align: right;
    }

    .c-Card {
      border-radius: 5px;
      padding: 20px;
    }
  }
`

export default css
