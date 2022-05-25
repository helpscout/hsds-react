import styled from 'styled-components'
import CopyButton from '../CopyButton'
import { getColor } from '@hsds/utils-color'

export const config = {
  borderColor: getColor('border'),
  borderColorFocus: getColor('blue.500'),
  boxShadow: '0 0 0 0 transparent',
  boxShadowFocus: `0 0 0 1px ${getColor('blue.500')}`,
  fontSize: 12,
  lineHeight: 22,
  padding: 20,
}

export const WrapperUI = styled('div')`
  position: relative;
  max-width: ${({ maxWidth }) => maxWidth + 'px' || '100%'};
`

export const CopyCodeUI = styled('div')`
  border-radius: 4px;
  border: 1px solid ${config.borderColor};
  box-shadow: ${config.boxShadow};
  box-sizing: border-box;
  font-family: var(--HSDSGlobalFontFamilyMono);
  font-size: ${config.fontSize};
  height: auto;
  line-height: calc(${config.lineHeight} / ${config.fontSize});
  outline: none;
  overflow: hidden;
  padding: 15px 20px;
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
  bottom: 10px;
  right: 10px;
`

export const SyntaxHighlight = styled('div')`
  width: 100%;
  height: 100%;
  word-break: break-all;
  white-space: pre-wrap;
  background: none;
  font-family: 'Roboto Mono', monospace;
  font-size: 12px;
  line-height: 26px;
  outline: none;
  color: #4f5d6b;

  div::-moz-selection,
  span::-moz-selection {
    background: ${getColor('blue.200')};
  }
  div::selection,
  span::selection {
    background: ${getColor('blue.200')};
  }

  .token.parameter {
    color: #e87800;
  }

  .token.operator,
  .token.attr-name,
  .token.punctuation {
    color: #4f5d6b;
  }

  .token.class-name,
  .token.tag {
    color: #d21b14;
  }

  .token.builtin,
  .token.number {
    color: #e87800;
  }

  .token.function,
  .token.keyword {
    color: #237ab3;
  }

  .token.attr-value,
  .token.string {
    color: #3cb170;
  }
`
