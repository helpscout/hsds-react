import React, { useContext } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

import FadeInOut from './SideNavigation.FadeInOut'
import Heading from './SideNavigation.Heading'
import { HeaderUI, BadgeUI, HeaderLinkUI } from './styles/SideNavigation.css'
import { SideNavigationContext } from './SideNavigation'

const getInitial = ({ badge, label = '' }) => {
  if (badge) return badge.toUpperCase()

  var initials = label.match(/\b\w/g) || []
  return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
}

export const Header = ({
  children,
  className,
  href,
  label,
  badge,
  ...rest
}) => {
  const { collapsable } = useContext(SideNavigationContext)

  const initial = getInitial({ badge, label })

  const labelComponent = collapsable ? (
    <BadgeUI>{initial}</BadgeUI>
  ) : (
    <FadeInOut>
      <Heading>
        {href ? <HeaderLinkUI href={href}>{label}</HeaderLinkUI> : label}
      </Heading>
    </FadeInOut>
  )

  const componentClassName = classNames('c-SideNavigation__Header', className)
  const showLabel = label || badge
  return (
    <HeaderUI {...getValidProps(rest)} className={componentClassName}>
      {showLabel && labelComponent}
      <FadeInOut>{children}</FadeInOut>
    </HeaderUI>
  )
}

Header.displayName = 'SideNavigation.Header'

export default Header
