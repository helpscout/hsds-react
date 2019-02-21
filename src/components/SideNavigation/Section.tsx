import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './SideNavigation.utils'

import { SectionUI, SectionHeadingUI } from './SideNavigation.css'

export interface Props {
  className?: string
  collapsed?: boolean
  main?: boolean
  title?: string
  withPadding?: boolean
}

export class Section extends React.PureComponent<Props> {
  static defaultProps = {
    main: false,
    withPadding: false,
  }

  render() {
    const {
      children,
      className,
      title,
      main,
      collapsed,
      withPadding,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-SideNavigation__Section',
      withPadding ? 'is-with-padding' : '',
      className
    )

    if (collapsed && !main) {
      return null
    }

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
