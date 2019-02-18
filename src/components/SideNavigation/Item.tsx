import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { COMPONENT_KEY } from './SideNavigation.utils'

import { SideNavigationItemUI } from './SideNavigation.css'

export interface Props {
  className?: string
}

export class Item extends React.PureComponent<Props> {
  static defaultProps = {}

  render() {
    const { children, className, ...rest } = this.props

    const componentClassName = classNames('c-SideNavigation__Item', className)

    return (
      <SideNavigationItemUI
        {...getValidProps(rest)}
        className={componentClassName}
      >
        {children}
      </SideNavigationItemUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Item)(Item)

export default Item
