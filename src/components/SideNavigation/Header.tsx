import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './SideNavigation.utils'

import Heading from '../Heading'
import { HeaderUI, BadgeUI, HeaderLinkUI } from './SideNavigation.css'

export interface Props {
  badge?: string
  collapsed?: boolean
  className?: string
  href?: string
  label?: string
}

export class Header extends React.PureComponent<Props> {
  static defaultProps = {}

  getInitial() {
    const { badge, label = '' } = this.props
    if (badge) return badge.toUpperCase()

    var initials = label.match(/\b\w/g) || []
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
  }

  renderLabel() {
    const { href, collapsed, label } = this.props

    const initial = this.getInitial()

    if (!label && !initial) return null

    if (collapsed) return <BadgeUI>{initial}</BadgeUI>

    return (
      <Heading size="h3" weight={500}>
        {href ? <HeaderLinkUI href={href}>{label}</HeaderLinkUI> : label}
      </Heading>
    )
  }

  render() {
    const { children, className, href, label, collapsed, ...rest } = this.props

    const componentClassName = classNames(
      'c-SideNavigation__Header',
      collapsed ? 'is-collapsed' : '',
      className
    )

    return (
      <HeaderUI {...getValidProps(rest)} className={componentClassName}>
        {this.renderLabel()}
        {!collapsed && children}
      </HeaderUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Header)(Header)

export default Header
