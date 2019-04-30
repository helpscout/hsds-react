import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

import { COMPONENT_KEY } from './SideNavigation.utils'
import { propConnect } from '../PropProvider'
import FadeInOut from './SideNavigation.FadeInOut'
import Heading from './SideNavigation.Heading'
import { HeaderUI, BadgeUI, HeaderLinkUI } from './styles/SideNavigation.css'

export interface Props {
  badge?: string
  collapsable?: boolean
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

export default propConnect(COMPONENT_KEY.Header)(Header)
