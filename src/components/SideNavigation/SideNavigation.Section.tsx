import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

import { COMPONENT_KEY } from './SideNavigation.utils'
import { propConnect } from '../PropProvider'
import { SectionUI, SectionHeadingUI } from './styles/SideNavigation.css'
import FadeInOut from './SideNavigation.FadeInOut'

export interface Props {
  className?: string
  title?: string
  withPadding?: boolean
}

export class Section extends React.PureComponent<Props> {
  static defaultProps = {
    withPadding: false,
  }

  render() {
    const { children, className, title, withPadding, ...rest } = this.props

    const componentClassName = classNames(
      'c-SideNavigation__Section',
      withPadding ? 'is-with-padding' : '',
      className
    )

    return (
      <SectionUI {...getValidProps(rest)} className={componentClassName}>
        {title && (
          <FadeInOut>
            <SectionHeadingUI size="small">{title}</SectionHeadingUI>
          </FadeInOut>
        )}
        {children}
      </SectionUI>
    )
  }
}

export default propConnect(COMPONENT_KEY.Section)(Section)
