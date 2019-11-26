import styled from 'styled-components'
import { BEM } from '../../../utilities/classNames'

const bem = BEM('.c-ModalBody')

export const BodyUI = styled('div')`
  display: flex;
  flex: 1 1 auto;
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

export default BodyUI
