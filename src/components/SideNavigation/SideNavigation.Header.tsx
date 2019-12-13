import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

import { SideNavigationHeaderProps } from './SideNavigation.types'
import FadeInOut from './SideNavigation.FadeInOut'
import Heading from './SideNavigation.Heading'
import { HeaderUI, BadgeUI, HeaderLinkUI } from './styles/SideNavigation.css'

export class Header extends React.PureComponent<SideNavigationHeaderProps> {
  static defaultProps = {}
  static displayName = 'SideNavigation.Header'

  getInitial() {
    const { badge, label = '' } = this.props
    if (badge) return badge.toUpperCase()

    var initials = label.match(/\b\w/g) || []
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
  }

  renderLabel() {
    const { href, collapsable, label } = this.props

    const initial = this.getInitial()

    if (!label && !initial) return null
    if (collapsable) return <BadgeUI>{initial}</BadgeUI>

    return (
      <FadeInOut>
        <Heading>
          {href ? <HeaderLinkUI href={href}>{label}</HeaderLinkUI> : label}
        </Heading>
      </FadeInOut>
    )
  }

  render() {
    const { children, className, href, label, ...rest } = this.props

    const componentClassName = classNames('c-SideNavigation__Header', className)

    return (
      <HeaderUI {...getValidProps(rest)} className={componentClassName}>
        {this.renderLabel()}
        <FadeInOut>{children}</FadeInOut>
      </HeaderUI>
    )
  }
}

export default Header
