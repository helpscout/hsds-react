import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import { COMPONENT_KEY } from './Page.utils'
import { classNames } from '../../utilities/classNames'
import { SectionUI } from './styles/Page.Section.css'
import { PageSectionProps } from './Page.types'

export class Section extends React.PureComponent<PageSectionProps> {
  static defaultProps = {
    isResponsive: false,
  }

  render() {
    const { children, className, isResponsive, ...rest } = this.props

    const componentClassName = classNames(
      'c-PageSection',
      isResponsive && 'is-responsive',
      className
    )

    return (
      <SectionUI className={componentClassName}>
        {this.props.children}
      </SectionUI>
    )
  }
}

export default propConnect(COMPONENT_KEY.Section)(Section)
