import styled from 'styled-components'
import ScrollableContainer from '../ScrollableContainer'

export const ScrollableContainerUI = styled(ScrollableContainer)`
  z-index: 0;
`

export const HeaderUI = styled.div`
  height: 60px;
  padding: 20px 30px;
  display: flex;
  align-items: center;
`

export const BodyUI = styled.div`
  padding: 40px 90px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const FooterUI = styled.div`
  background-color: #f7f9fc;
  height: 80px;
  padding: 20px 30px;
  display: flex;
  align-items: center;
`
