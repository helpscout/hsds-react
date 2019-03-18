import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './SideNavigation.utils'

import Heading from '../Heading'

export interface Props {
  className?: string
}

export class SideNavigationHeading extends React.PureComponent<Props> {
  static defaultProps = {}

  render() {
    const { children, className } = this.props

    const componentClassName = classNames(
      'c-SideNavigation__Heading',
      className
    )

    return (
      <Heading size="h3" weight={400} className={componentClassName}>
        {children}
      </Heading>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Heading)(SideNavigationHeading)

export default SideNavigationHeading
