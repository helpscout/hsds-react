// @flow
import React, { Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'
import { ContentUI } from './styles/Content.css.js'

type Props = {
  children?: any,
  className?: string,
}

class Content extends Component<Props> {
  render() {
    const { className, children, ...rest } = this.props

    const componentClassName = classNames('c-ChatInboxContent', className)

    return (
      <ContentUI {...getValidProps(rest)} className={componentClassName}>
        {children}
      </ContentUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Content)(Content)

export default Content
