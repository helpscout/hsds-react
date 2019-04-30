import * as React from 'react'
import { classNames } from '../../utilities/classNames'

import { COMPONENT_KEY } from './SideNavigation.utils'
import { SideNavigationHeadingProps } from './SideNavigation.types'
import { propConnect } from '../PropProvider'
import Heading from '../Heading'

export class SideNavigationHeading extends React.PureComponent<
  SideNavigationHeadingProps
> {
  static defaultProps = {}

  render() {
    const { children, className } = this.props

    const componentClassName = classNames(
      'c-SideNavigation__Heading',
      className
    )

    return (
      <Heading
        size="h3"
        weight={400}
        className={componentClassName}
        id="SideNavigation__heading"
      >
        {children}
      </Heading>
    )
  }
}

export default propConnect(COMPONENT_KEY.Heading)(SideNavigationHeading)
