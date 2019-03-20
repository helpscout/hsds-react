import styled from '../styled'
import baseStyles from '../../styles/resets/baseStyles.css.js'
import { getColor } from '../../styles/utilities/color'

import Button from '../Button'
import Text from '../Text'
import Heading from '../Heading'

import { DropdownUI, TriggerUI } from '../Dropdown/V2/Dropdown.css'
import { darken, lighten } from '../../utilities/color'

const config = {
  sidePadding: '18px',
  border: `1px solid ${getColor('grey.500')}`,
  badgeHeight: '31px',
  collapsableHeight: '60px',
  dangerColor: getColor('red.500'),
  baseNavWidth: '250px',
}

export const FadeInOutUI = styled('div')`
  display: flex;
  flex: 1 1 100%;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  will-change: opacity;
`

export const IconUI = styled('span')`
  color: ${getColor('grey.600')};
  margin-right: 10px;
`

export const CountUI = styled(Text)`
  margin-left: auto;
`

export const ButtonUI = styled(Button)`
  &.is-danger,
  &.is-default {
    color: ${getColor('charcoal.400')};
    border-radius: 0;
    font-size: 14px;
    justify-content: left;
    text-decoration: none;
    width: 100%;
    padding: 0 ${config.sidePadding};

    &:focus {
      text-decoration: none;
      outline: ${getColor('charcoal.400')} auto 3px;
    }

    &:hover {
      text-decoration: none;
      background-color: ${getColor('grey.400')};
      color: ${getColor('charcoal.500')};

      ${IconUI} {
        color: ${getColor('charcoal.300')};
      }
    }

    &:disabled,
    &.is-disabled {
      color: ${getColor('charcoal.200')};
    }
  }

  &.is-danger {
    ${IconUI} {
      color: ${config.dangerColor};
    }

    &:hover {
      color: ${config.dangerColor};
      ${IconUI} {
        color: ${config.dangerColor};
      }
    }
  }
`

export const ButtonFooterUI = styled(Button)`
  &.is-default {
    border-top: ${config.border};
    border-bottom: ${config.border};
    color: ${getColor('charcoal.200')};
    background-color: ${lighten(getColor('grey.400'), 2)};
    display: inline-flex;
    width: 100%;
    border-radius: 0;

    &:hover {
      background-color: ${darken(getColor('grey.400'), 2)};
    }

    :not(:first-child) {
      border-left: ${config.border};
    }
    .withCaret {
      width: 36px;
      margin-right: 0;
    }
    .c-Icon__icon.is-caret {
      height: 14px;
      top: calc(50% - 7px);
      width: 14px;
    }
  }
`

export const FooterUI = styled('footer')`
  display: flex;

  ${DropdownUI}, ${ButtonFooterUI} {
    flex: 1 1 0;
  }
  ${TriggerUI} {
    width: 100%;
  }

  &.is-floating-menu {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 16px;
    border-top: ${config.border};
    padding-top: 16px;
  }
`

export const SectionUI = styled('div')`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }

  &.is-with-padding {
    padding: 0 ${config.sidePadding};
  }
`

export const ItemUI = styled('div')`
  padding-bottom: 2px;

  &.is-muted {
    ${ButtonUI}.is-default {
      color: ${getColor('charcoal.200')};
    }
  }

  &.is-active {
    ${ButtonUI}.is-default {
      font-weight: bold;
    }
    ${ButtonUI}.is-primary {
      font-weight: bold;
      color: ${getColor('blue.600')};

      ${IconUI} {
        color: ${getColor('blue.600')};
      }
    }
  }

  &.is-disabled {
    ${ButtonUI} {
      &.is-default:disabled {
        color: ${getColor('charcoal.200')} !important;
        cursor: not-allowed;
      }
    }
  }
`

export const HeaderUI = styled('header')`
  padding: 0 ${config.sidePadding};
  color: ${getColor('charcoal.500')};
  margin-bottom: calc(40px - ${config.badgeHeight});
  height: ${config.badgeHeight};

  ${Heading} {
    margin-bottom: 0;
  }

  &.is-collapsed {
    padding: 0;
    display: flex;
    justify-content: center;
  }
`

export const DropdownHeaderUI = styled('div')`
  .is-open .c-SideNavigation__Heading {
    color: ${getColor('blue.600')};
  }
`

export const HeaderLinkUI = styled('a')`
  color: ${getColor('charcoal.500')};
  text-decoration: none;

  &:hover {
    color: ${getColor('charcoal.800')};
    cursor: pointer;
  }
`

export const SectionHeadingUI = styled(Heading)`
  -webkit-font-smoothing: antialiased;

  &.is-small {
    padding: 8px ${config.sidePadding} 6px;
    color: ${getColor('grey.800')};
  }
`

export const BadgeUI = styled('span')`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${getColor('blue.400')};
  border-radius: ${config.badgeHeight};
  color: white;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 1px;
  height: ${config.badgeHeight};
  width: ${config.badgeHeight};
  left: -4px;
  position: relative;
`

export const SideNavigationCollapsableUI = styled('div')`
  position: relative;
  height: 100%;
  width: ${config.collapsableHeight};
`

export const SideNavigationFloatingUI = styled('div')`
  position: relative;
  height: 100%;
  width: 100%;
`

export const SideNavigationUI = styled('nav')`
  ${baseStyles};
  background-color: ${getColor('grey.300')};
  border-right: ${config.border};
  height: 100%;
  width: ${props => (props.width ? `${props.width}px` : config.baseNavWidth)};
  padding-top: 16px;
  padding-bottom: 100px;
  overflow: hidden;

  &.is-collapsable {
    position: absolute;
    top: 0;
    bottom: 0;
    height: auto;
    left: 0;
    width: ${config.collapsableHeight};
    transition: width 0.05s ease-in-out;
    will-change: width;

    ${FooterUI} {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      color: ${getColor('charcoal.200')};
    }

    &:hover,
    &.is-nav-always-visible {
      width: ${props =>
        props.width ? `${props.width}px` : config.baseNavWidth};

      ${FadeInOutUI} {
        opacity: 1;
        visibility: visible;
        transition: opacity 0.2s linear;
      }

      ${BadgeUI} {
        display: none;
      }

      .c-SideNavigation__more {
        display: none;
      }
    }
  }
`
