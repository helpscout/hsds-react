import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './SideNavigation.utils'

import Heading from '../Heading'
import { HeaderUI } from './SideNavigation.css'

export interface Props {
  className?: string
  href?: string
  label?: string
}

export class Header extends React.PureComponent<Props> {
  static defaultProps = {}

  renderLabel() {
    const { href, label } = this.props

    const labelNode = href ? <a href={href}>{label}</a> : label

    return (
      <Heading size="h3" weight={500}>
        {labelNode}
      </Heading>
    )
  }

  render() {
    const { children, className, href, label, ...rest } = this.props

    const componentClassName = classNames('c-SideNavigation__Header', className)

    return (
      <HeaderUI {...getValidProps(rest)} className={componentClassName}>
        {this.renderLabel()}
        {children}
      </HeaderUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Header)(Header)

export default Header
