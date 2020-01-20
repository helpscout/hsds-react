import styled from 'styled-components'
import Scrollable from '../Scrollable'

export const ChatSidebarUI = styled('div')`
  display: flex;
  height: 100%;
  position: relative;

  .c-Scrollable__content {
    padding-bottom: 20px;
  }
`

export const StatusBarWrapperUI = styled('div')`
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
`

export const ContentUI = styled(Scrollable)`
  position: relative;
  z-index: 0;
`
