import * as React from 'react'
import { COMPONENT_KEY } from './Page.utils'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { SectionUI } from './styles/Page.Section.css'

export interface Props {
  children?: any
  className?: string
  isResponsive?: boolean
}

class Section extends React.PureComponent<Props> {
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

namespaceComponent(COMPONENT_KEY.Section)(Section)

export default Section
