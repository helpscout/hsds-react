import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { SectionUI } from './styles/Page.Section.css'
import { PageSectionProps } from './Page.types'

export class Section extends React.PureComponent<PageSectionProps> {
  static displayName = 'Page.Section'
  static defaultProps = {
    isResponsive: false,
  }

  render() {
    const { children, className, isResponsive } = this.props

    const componentClassName = classNames(
      'c-PageSection',
      isResponsive && 'is-responsive',
      className
    )

    return <SectionUI className={componentClassName}>{children}</SectionUI>
  }
}

export default Section
