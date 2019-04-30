import styled from '../../styled'
import baseStyles from '../../../styles/resets/baseStyles.css'

export const ResizerUI = styled('div')`
  ${baseStyles};
  bottom: 0;
  height: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  visibility: hidden;
`

export const GhostUI = styled('div')`
  border: 1px solid transparent;
  padding: 12px 16px;
  line-height: normal;
  white-space: pre-wrap;
  word-wrap: break-word;

  &.is-seamless {
    padding-left: 0;
    padding-right: 0;
  }
`
