import styled from 'styled-components'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { getColor } from '../../../styles/utilities/color'
import Dropdown from '../../Dropdown/DropdownV2'
import Avatar from '../../Avatar'

export const config = {
  headerHeight: '54px',
}

export const HsAppUI = styled('div')`
  ${baseStyles};
`

export const AppLayoutUI = styled('div')`
  align-items: stretch;
  display: flex;
  justify-content: space-between;
`
export const AppContainerUI = styled('div')`
  align-items: stretch;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  justify-content: space-between;
  min-height: calc((100vh) - (${config.headerHeight}));
  width: 100%;
`

export const HeaderUI = styled('div')`
  background: ${getColor('blue.700')};
  padding: 7px 10px 7px 4px;
  position: relative;
  height: ${config.headerHeight};
  color: ${getColor('blue.300')};
  display: flex;
  align-items: center;
`

export const LogoUI = styled('span')`
  padding: 0 10px 0 16px;
  color: ${getColor('blue.300')};

  &:hover {
    cursor: pointer;
    color: white;
  }
`

export const SecIconUI = styled('span')`
  padding: 0 18px;
  color: ${getColor('blue.300')};

  &.less-padding {
    padding-right: 10px;
  }

  &:hover {
    cursor: pointer;
    color: white;
  }
`

export const SecondaryNavUI = styled('span')`
  margin-left: auto;
  display: flex;
  align-items: center;
`

export const NavUI = styled('span')`
  display: flex;
  flew-direction: row;
`

export const AvatarUI = styled(Avatar)`
  margin: 0 10px;
`

export const DropdownTriggerUI = styled('span')`
  display: inline-flex;
  align-items: center;
  height: 40px;
  padding: 0 10px 0 17px;
  color: ${getColor('blue.300')};
  &:hover {
    color: white;
  }

  .c-Icon {
    top: 2px;
    margin-left: 2px;
  }
`

export const DropdownUI = styled(Dropdown)`
  .is-open ${DropdownTriggerUI} {
    color: white;
  }
`

export const SidenavUI = styled('div')`
  background: ${getColor('grey.300')};
  width: 250px;
  border-right: 1px solid ${getColor('grey.500')};
  height: 100%;
`

export const ContentUI = styled('div')`
  box-shadow: -1px 0 0 #d6dde3, 1px 0 0 #d6dde3, 0 1px 0 #d6dde3;
  box-sizing: border-box;
  flex: 1;
  flex-basis: auto;
  max-width: 100%;
  min-width: 0;
  position: relative;
  z-index: 2;
  background: #f9fafa;
  /* background: ${getColor('grey.400')}; */
  padding: 20px;
`

export const InnerContentUI = styled('div')`
  background: #fff;
  padding: 20px;
`
