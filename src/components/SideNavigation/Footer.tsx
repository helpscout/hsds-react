import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './SideNavigation.utils'

import { FooterUI } from './SideNavigation.css'

export interface Props {
  className?: string
}

export class Footer extends React.PureComponent<Props> {
  static defaultProps = {}

  render() {
    const { children, className, ...rest } = this.props

    const componentClassName = classNames('c-SideNavigation__Footer', className)

    return (
      <FooterUI {...getValidProps(rest)} className={componentClassName}>
        {children}
      </FooterUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Section)(Footer)

export default Footer
