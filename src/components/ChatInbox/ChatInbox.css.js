import styled from 'styled-components'
import Flexy from '../Flexy'

export const config = {
  height: 54,
}

export const HeaderUI = styled('div')`
  &.is-collapsible {
    cursor: pointer;
  }
`

export const ContentUI = styled(Flexy)`
  min-height: ${config.height}px;
  padding: 12px 20px;
`

export default HeaderUI
