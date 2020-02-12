import Toolbar from '../../Toolbar'
import styled from '../../styled'
import { getColor, rgba } from '../../../styles/utilities/color'

export const HeaderUI = styled(Toolbar)`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  text-align: center;

  &.is-theme-default {
    height: 58px;
    padding: 20px 30px;
  }

  &.is-seamless {
    padding: 0px 50px;
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
  margin-top: 7px;
  margin: 7px 90px;
  color: ${getColor('charcoal', 600)};
`

export const BrandedHeaderUI = styled('div')`
  border: none;
  padding: 20px 30px 0px;
  text-align: center;
  width: 100%;
  margin-top: 36px;
  flex-grow: 1;
`

export const BrandedHeaderTitleUI = styled('div')`
  font-style: normal;
  font-weight: 500;
  margin: 0px 90px;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: ${getColor('charcoal', 800)};
  flex-grow: 1;
`

export const BrandedHeaderImageUI = styled('div')`
  margin-bottom: 20px;
`

export const AlertHeaderUI = styled('div')`
  border: none;
  padding: 0px 50px;
  text-align: center;
  width: 100%;
  margin-top: 36px;
  flex-grow: 1;
`

export const AlertHeaderDescriptionUI = styled(HeaderDescriptionUI)`
  margin: 7px 50px 22px;
`

export const AlertHeaderTitleUI = styled(BrandedHeaderTitleUI)`
  margin: 0px;
`

export default HeaderUI
