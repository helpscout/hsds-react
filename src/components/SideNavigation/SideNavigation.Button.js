import React, { useContext } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

import Icon from '../Icon'
import { SideNavigationContext } from './SideNavigation'
import { ButtonUI, ButtonFooterUI } from './SideNavigation.css'

export const Button = ({ children, className, iconName, icon, ...rest }) => {
  const componentClassName = classNames('c-SideNavigation__Button', className)
  const { floatingMenu } = useContext(SideNavigationContext)
  const ElementName = floatingMenu ? ButtonUI : ButtonFooterUI
  return (
    <ElementName {...getValidProps(rest)} className={componentClassName}>
      {iconName && <Icon name={iconName} />}
      {icon && icon}
      {floatingMenu && children}
    </ElementName>
  )
}

Button.displayName = 'SideNavigation.Button'
Button.defaultProps = {
  floatingMenu: false,
}

export default Button
