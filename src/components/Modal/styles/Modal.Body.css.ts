import styled from '../../styled'
import { BEM } from '../../../utilities/classNames'
import baseStyles from '../../../styles/resets/baseStyles.css'

const bem: any = BEM('.c-ModalBody')

export const BodyUI = styled('div')`
  ${baseStyles} display: flex;
  flex: 1 1 auto;
  height: 100%;
  max-width: 100%;
  min-height: 0;

  &.is-not-scrollable {
    padding: 20px;
  }

  ${// TODO: fix typescript complains
  // @ts-ignore
  bem.element('scrollableContent')} {
    padding: 20px;
  }

  &.is-seamless {
    ${// TODO: fix typescript complains
    // @ts-ignore
    bem.element('scrollableContent')} {
      padding: 0;
    }
  }
`

export default BodyUI
