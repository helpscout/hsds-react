import * as React from 'react'
import { classNames } from '../../utilities/classNames'

import { SideNavigationFadeInOutProps } from './SideNavigation.types'

import { FadeInOutUI } from './styles/SideNavigation.css'

export class FadeInOut extends React.PureComponent<
  SideNavigationFadeInOutProps
> {
  static displayName = 'SideNavigation.FadeInOut'
  render() {
    const { children, className, collapsable } = this.props

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
}

export default FadeInOut
