import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'

/**
 * Header and Footer layout
 */
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

/**
 * Confirmation layout
 */
export const ConfirmationWrapperUI = styled('div')`
  display: flex;
  flex-direction: column;
  height: 247px;
  width: 440px;
  padding: 45px 50px 60px 50px;

  &.is-compact {
    height: 197px;
  }
`

export const ConfirmationHeadingUI = styled('h1')`
  color: ${getColor('charcoal.800')};
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  margin: 0 0 10px 0;

  .is-compact & {
    margin-bottom: 25px;
  }
`

export const ConfirmationBodyUI = styled('div')`
  color: ${getColor('charcoal.600')};
  text-align: center;
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
  margin-bottom: 25px;
`

export const ConfirmationFooterUI = styled('footer')`
  display: flex;
  justify-content: center;

  button:first-child {
    margin-right: 10px;
  }
`
