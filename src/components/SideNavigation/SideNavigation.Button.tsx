import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

import { SideNavigationButtonProps } from './SideNavigation.types'

import Icon from '../Icon'
import { ButtonUI, ButtonFooterUI } from './styles/SideNavigation.css'

export class Button extends React.PureComponent<SideNavigationButtonProps> {
  static displayName = 'SideNavigation.Button'

  static defaultProps = {
    floatingMenu: false,
  }

  render() {
    const {
      children,
      className,
      iconName,
      icon,
      floatingMenu,
      ...rest
    } = this.props

    const componentClassName = classNames('c-SideNavigation__Button', className)
    const ElementName = floatingMenu ? ButtonUI : ButtonFooterUI

    return (
      <ElementName {...getValidProps(rest)} className={componentClassName}>
        {iconName && <Icon name={iconName} />}
        {icon && icon}
        {floatingMenu && children}
      </ElementName>
    )
  }
}

export default Button
