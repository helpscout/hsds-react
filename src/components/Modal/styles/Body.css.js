// @flow
import { BEM } from '../../../utilities/classNames'
import baseStyles from '../../../styles/resets/baseStyles.css.js'

const bem = BEM('.c-ModalBody')

const css = `
  ${baseStyles}
  display: flex;
  flex: 1;
  height: 100%;
  max-width: 100%;
  min-height: 0;

  &.is-not-scrollable {
    padding: 20px;
  }

  ${bem.element('scrollableContent')} {
    padding: 20px;
  }

  &.is-seamless {
    ${bem.element('scrollableContent')} {
      padding: 0;
    }
  }
`

export default css
