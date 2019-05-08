import styled from '../../styled'
import CopyButton from '../../CopyButton'
import { getColor } from '../../../styles/utilities/color'

export const config = {
  borderColor: getColor('border'),
  borderColorFocus: getColor('blue.400'),
  boxShadow: '0 0 0 0 transparent',
  boxShadowFocus: `0 0 0 1px ${getColor('blue.400')}`,
  fontFamily:
    '"SFMono-Regular","Roboto Mono",Consolas,"Liberation Mono",Menlo,Courier,monospace',
  fontSize: 12,
  lineHeight: 22,
  padding: 20,
}

export const WrapperUI = styled('div')`
  position: relative;
`

export const CopyCodeUI = styled('div')`
  border-radius: 4px;
  border: 1px solid ${config.borderColor};
  box-shadow: ${config.boxShadow};
  box-sizing: border-box;
  font-family: ${config.fontFamily};
  font-size: ${config.fontSize};
  height: auto;
  line-height: calc(${config.lineHeight} / ${config.fontSize});
  outline: none;
  overflow: hidden;
  padding: ${config.padding}px;
  white-space: normal;
  width: auto;
  word-break: break-all;

  :focus {
    border-color: ${config.borderColorFocus};
    box-shadow: ${config.boxShadowFocus};
  }

  pre {
    margin: 0;
    white-space: normal;
  }
`

export const CopyButtonUI = styled(CopyButton)`
  box-shadow: 0 0 0 2px white;
  position: absolute !important;
  top: 10px;
  right: 10px;
`
