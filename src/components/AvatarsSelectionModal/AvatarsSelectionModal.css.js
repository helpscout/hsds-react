import Modal from '../Modal'
import Text from '../Text'
import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'

export const ModalTitleUI = styled('div')`
  align-items: center;
  display: flex;
`

export const ModalUI = styled(Modal)`
  .c-Modal__innerWrapper {
    max-width: 885px;
    width: 885px !important;
  }

  .c-Modal__Card {
    width: 885px !important;
  }

  .c-ModalBody {
    max-height: 620px;
  }
`

export const ModalTitleTextUI = styled('div')`
  flex: 1;
`

export const UserCountTextUI = styled(Text)`
  color: ${getColor('charcoal.600')} !important;
`
