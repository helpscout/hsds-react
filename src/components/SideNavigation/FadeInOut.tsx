import * as React from 'react'
import { classNames } from '../../utilities/classNames'

import { COMPONENT_KEY } from './SideNavigation.utils'
import { propConnect } from '../PropProvider'

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

    if (!children) {
      return null
    }

    if (!collapsable) {
      return children
    }

    return <FadeInOutUI className={componentClassName}>{children}</FadeInOutUI>
  }
}

export default propConnect(COMPONENT_KEY.FadeInOut)(FadeInOut)
