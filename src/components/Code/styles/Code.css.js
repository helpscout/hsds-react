// @flow
import styled from '../../styled'

export const config = {
  borderRadius: 3,
  fontFamily:
    "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
  fontSize: '85%',
  padding: '0.2em 0',
}

export const CodeUI = styled('code')`
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: ${config.borderRadius}px;
  box-sizing: border-box;
  font-family: ${config.fontFamily};
  font-size: ${config.fontSize};
  margin: 0;
  padding: ${config.padding};
  word-wrap: break-word;

  &::before,
  &::after {
    content: '\00a0';
    letter-spacing: -0.2em;
  }
`

export default CodeUI
