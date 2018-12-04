import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { ContentUI } from './styles/Content.css'
import { COMPONENT_KEY } from './utils'

export interface Props {
  children?: any
  className?: string
  isResponsive: boolean
}

class Content extends React.PureComponent<Props> {
  static defaultProps = {
    isResponsive: false,
  }

  render() {
    const { children, className, isResponsive, ...rest } = this.props

    const componentClassName = classNames(
      'c-PageContent',
      isResponsive && 'is-responsive',
      className
    )

    return (
      <ContentUI {...getValidProps(rest)} className={componentClassName}>
        {children}
      </ContentUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Content)(Content)

export default Content
