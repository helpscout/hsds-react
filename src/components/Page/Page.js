// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { PageUI } from './styles/Page.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  children?: any,
  className?: string,
}

class Page extends Component<Props> {
  static Actions: any
  static Card: any
  static Header: any

  render() {
    const { children, className, ...rest } = this.props

    const componentClassName = classNames('c-Page', className)

    return (
      <PageUI className={componentClassName} {...getValidProps(rest)}>
        {children}
      </PageUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Page)(Page)

export default Page
