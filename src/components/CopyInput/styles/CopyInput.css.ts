import styled from '../../styled'
import { getColor } from '../../../styles/utilities/color'
import Input from '../../Input'

export const CopyInputUI = styled(Input)`
  ::-moz-selection {
    background: ${getColor('blue.200')};
  }

  ::selection {
    background: ${getColor('blue.200')};
  }
`
