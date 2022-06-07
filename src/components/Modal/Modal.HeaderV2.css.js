import styled from 'styled-components'
import Toolbar from '../Toolbar'
import { getColor } from '@hsds/utils-color'

export const HeaderUI = styled(Toolbar)`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  text-align: center;

  &.is-theme-default {
    height: 60px;
    padding: 20px 30px;
  }

  &.is-seamless {
    padding: 0px 50px;
  }

  &.is-alert {
    min-height: 40px;
  }
`

export const HeaderTitleUI = styled('div')`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  flex-grow: 1;
  margin-right: 20px;
  text-align: left;
  color: ${getColor('charcoal', 800)};
`

export const HeaderDescriptionUI = styled('div')`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  padding-top: 7px;
  color: ${getColor('charcoal', 600)};
`

export const BrandedHeaderUI = styled('div')`
  border: none;
  padding: 40px 90px 40px;
  text-align: center;
  width: 100%;
  flex-grow: 1;
`

export const BrandedHeaderTitleUI = styled('div')`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: ${getColor('charcoal', 800)};
  flex-grow: 1;
`

export const BrandedHeaderImageUI = styled('div')`
  padding-bottom: 20px;
`

export const AlertHeaderUI = styled('div')`
  border: none;
  padding: 50px 50px 4px;
  text-align: center;
  width: 100%;
  flex-grow: 1;
`

export const AlertHeaderDescriptionUI = styled(HeaderDescriptionUI)`
  margin: 0px;
  padding-top: 7px;
`

export const AlertHeaderTitleUI = styled(BrandedHeaderTitleUI)`
  margin: 0px;
`

export const DotStepperUI = styled.div`
  margin-bottom: 30px;
`

export default HeaderUI
