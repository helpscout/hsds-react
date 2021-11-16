import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import ScrollableContainer from './ScrollableContainer'

export const ScrollableContainerUI = styled(ScrollableContainer)`
  border-radius: 6px;
  margin: 50px auto;
`

export const HeaderUI = styled('header')`
  height: 75px;
  padding: 20px 30px;
  background-color: #fff;

  h1 {
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: ${getColor('charcoal.700')};
  }
`

export const BodyUI = styled('div')`
  padding: 10px 30px;
  background-color: #e5e9ec;
`
export const FooterUI = styled('footer')`
  height: 75px;
  padding: 20px 30px;
  background-color: #fff;

  button {
    width: 100%;
  }
`
