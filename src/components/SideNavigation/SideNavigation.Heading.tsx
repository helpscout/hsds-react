import * as React from 'react'
import { classNames } from '../../utilities/classNames'

import { SideNavigationHeadingProps } from './SideNavigation.types'
import Heading from '../Heading'

export class SideNavigationHeading extends React.PureComponent<
  SideNavigationHeadingProps
> {
  static defaultProps = {}
  static displayName = 'SideNavigation.Heading'

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

export default SideNavigationHeading
