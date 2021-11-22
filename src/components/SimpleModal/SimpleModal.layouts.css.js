import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'

export const HeaderUI = styled('header')`
  height: 58px;
  padding: 0 30px;
  background-color: #fff;
  border-radius: 4px 4px 0 0;
  flex-shrink: 0;

  &:not(.with-custom-header-content) {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  h1 {
    margin: 0;
    font-weight: 500;
    font-size: 16px;
    color: ${getColor('charcoal.800')};
  }
`

export const BodyUI = styled('div')`
  padding: 40px 90px;
`

export const FooterUI = styled('footer')`
  height: 80px;
  padding: 0 30px;
  background-color: #f7f9fc;
  border-radius: 0 0 4px 4px;
  flex-shrink: 0;
`
