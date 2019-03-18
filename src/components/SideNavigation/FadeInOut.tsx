import * as React from 'react'
import { classNames } from '../../utilities/classNames'

import { FadeInOutUI } from './SideNavigation.css'

export interface Props {
  className?: string
  collapsed?: boolean
  collapsable?: boolean
}

export class FadeInOut extends React.PureComponent<Props> {
  render() {
    const { children, className, collapsed, collapsable } = this.props

    const componentClassName = classNames(
      'c-SideNavigation__FadeInOut',
      collapsed ? '' : 'is-visible',
      className
    )

    if (!collapsable) {
      return children
    }

    return <FadeInOutUI className={componentClassName}>{children}</FadeInOutUI>
  }
}

export default FadeInOut
