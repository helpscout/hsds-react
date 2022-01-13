import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import Input from '../Input'

import CopyButton from '../CopyButton'
import { TextUI } from '../CopyButton/CopyButton.css'

export const CopyInputUI = styled(Input)`
  input::-moz-selection {
    background: ${getColor('blue.200')};
  }

  input::selection {
    background: ${getColor('blue.200')};
  }
`

export const CopyButtonUI = styled(CopyButton)`
  &.is-size-lg {
    --confirmColor: ${getColor('blue.500')};
    --confirmBorderColor: ${getColor('blue.500')};
    --buttonMinWidth: 40px;
    --buttonPadding: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  ${TextUI} {
    padding: 0 30px;
  }
`
