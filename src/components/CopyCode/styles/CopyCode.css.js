// @flow
import styled from '../../styled'
import CopyButton from '../../CopyButton'
import { getColor } from '../../../styles/utilities/color'

export const WrapperUI = styled('div')`
  position: relative;
`

export const CopyCodeUI = styled('div')`
  width: auto;
  height: auto;
  padding: 20px;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid ${getColor('border')};
  box-shadow: 0px 0px 0px 1px ${getColor('border')};
  border-radius: 4px;
  outline: none;
  word-break: break-all;
  white-space: normal;
  font-family: 'Roboto Mono', monospace;
  font-size: 12px;
  line-height: 22px;

  :focus {
    border-color: ${getColor('blue.400')};
    box-shadow: 0px 0px 0px 1px ${getColor('blue.400')};
  }

  pre {
    margin: 0;
  }
`

export const CopyButtonUI = styled(CopyButton)`
  position: absolute;
  top: 10px;
  right: 10px;
  box-shadow: 0 0 0 2px white;
`
