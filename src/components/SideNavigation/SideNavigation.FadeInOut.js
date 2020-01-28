import React, { useContext } from 'react'
import { classNames } from '../../utilities/classNames'

import { SideNavigationContext } from './SideNavigation'
import { FadeInOutUI } from './SideNavigation.css'

export const FadeInOut = ({ children, className }) => {
  const { collapsable } = useContext(SideNavigationContext)
  const componentClassName = classNames(
    'c-SideNavigation__FadeInOut',
    className
  )

  if (!children) {
    return null
  }

  if (!collapsable) {
    return children
  }

  return <FadeInOutUI className={componentClassName}>{children}</FadeInOutUI>
}

FadeInOut.displayName = 'SideNavigation.FadeInOut'

export default FadeInOut
