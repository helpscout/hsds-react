import styled from 'styled-components'
import base from '../../../styles/resets/base.css'

export const HuzzahUI = styled.div`
  display: block;
  height: 120px;
  margin-left: auto;
  margin-right: auto;
  width: 120px;

  > svg {
    display: block;
    height: auto;
    max-width: 100%;
    width: 100%;
  }

  &.is-lg {
    height: 160px;
    width: 160px;
  }
  &.is-md {
    height: 120px;
    width: 120px;
  }
  &.is-sm {
    height: 80px;
    width: 80px;
  }
`
