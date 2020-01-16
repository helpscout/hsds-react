import styled from '../../styled'
import { getColor } from '../../../styles/utilities/color'
import Input from '../../Input'

export const CopyInputUI = styled(Input)`
  input::-moz-selection {
    background: ${getColor('blue.200')};	    background: ${getColor('blue.200')};
  }	  }

  input::selection {
    background: ${getColor('blue.200')};	    background: ${getColor('blue.200')};
  }	  }
`
