import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './SideNavigation.utils'

import Icon from '../Icon'

import { FooterUI } from './SideNavigation.css'

export interface Props {
  className?: string
  collapsed?: boolean
  floatingMenu?: boolean
}

export class Footer extends React.PureComponent<Props> {
  static defaultProps = {}

  render() {
    const { children, className, collapsed, floatingMenu, ...rest } = this.props

    const componentClassName = classNames(
      'c-SideNavigation__Footer',
      collapsed ? 'is-collapsed' : '',
      floatingMenu ? 'is-floating-menu' : '',
      className
    )

    return (
      <FooterUI {...getValidProps(rest)} className={componentClassName}>
        {collapsed && <Icon name="option-dots" />}
        {!collapsed && children}
      </FooterUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Section)(Footer)

export default Footer
