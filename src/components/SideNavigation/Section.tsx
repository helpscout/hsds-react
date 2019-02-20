import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './SideNavigation.utils'

import { SectionUI, SectionHeadingUI } from './SideNavigation.css'

export interface Props {
  className?: string
  title?: string
}

export class Section extends React.PureComponent<Props> {
  static defaultProps = {}

  render() {
    const { children, className, title, ...rest } = this.props

    const componentClassName = classNames(
      'c-SideNavigation__Section',
      className
    )

    return (
      <SectionUI {...getValidProps(rest)} className={componentClassName}>
        {title && <SectionHeadingUI size="small">{title}</SectionHeadingUI>}
        {children}
      </SectionUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Section)(Section)

export default Section
