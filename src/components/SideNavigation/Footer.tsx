import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

import Icon from '../Icon'
import SideNavigation from './SideNavigation'

import { FooterUI } from './SideNavigation.css'

export interface Props {
  className?: string
  collapsable?: boolean
  collapsed?: boolean
  floatingMenu?: boolean
}

export class Footer extends React.PureComponent<Props> {
  static defaultProps = {}

  render() {
    const {
      children,
      className,
      collapsed,
      collapsable,
      floatingMenu,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-SideNavigation__Footer',
      collapsed ? 'is-collapsed' : '',
      floatingMenu ? 'is-floating-menu' : '',
      className
    )

    const isCollapsed = collapsable && collapsed

    return (
      <FooterUI {...getValidProps(rest)} className={componentClassName}>
        {isCollapsed && <Icon name="option-dots" />}
        <SideNavigation.FadeInOut>{children}</SideNavigation.FadeInOut>
      </FooterUI>
    )
  }
}

export default Footer
