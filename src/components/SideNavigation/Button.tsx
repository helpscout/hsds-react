import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

import { COMPONENT_KEY } from './SideNavigation.utils'
import { propConnect } from '../PropProvider'

import Icon from '../Icon'
import { ButtonUI, ButtonFooterUI } from './SideNavigation.css'

export interface Props {
  className?: string
  floatingMenu?: boolean
  icon?: Icon
}

export class Button extends React.PureComponent<Props> {
  static defaultProps = {
    floatingMenu: false,
  }

  render() {
    const { children, className, icon, floatingMenu, ...rest } = this.props

    const componentClassName = classNames('c-SideNavigation__Button', className)
    const ElementName: ButtonUI | ButtonFooterUI = floatingMenu
      ? ButtonUI
      : ButtonFooterUI

    return (
      <ElementName
        version={2}
        {...getValidProps(rest)}
        className={componentClassName}
      >
        {icon && icon}
        {floatingMenu && children}
      </ElementName>
    )
  }
}

export default propConnect(COMPONENT_KEY.Button)(Button)
