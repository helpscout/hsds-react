import * as React from 'react'
import { classNames } from '../../utilities/classNames'

import { COMPONENT_KEY } from './SideNavigation.utils'
import { propConnect } from '../PropProvider'
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

export default propConnect(COMPONENT_KEY.Heading)(SideNavigationHeading)
