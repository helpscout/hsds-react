// @flow
import styled from '../../styled'
import baseStyles from '../../../styles/resets/baseStyles.css.js'

export const OverlayUI = styled('div')`
  ${props => {
    console.log(props)
  }} ${baseStyles} align-items: center;
  background-color: rgba(57, 73, 86, 0.15);
  bottom: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;

  &.is-fixed {
    position: fixed;
  }

  &.is-transparent {
    cursor: default;
    opacity: 0;
  }
`

export default OverlayUI
