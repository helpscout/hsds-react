// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Actions from './Actions'
import Card from './Card'
import Header from './Header'
import PropProvider from '../PropProvider'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { PageUI } from './styles/Page.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  children?: any,
  className?: string,
}

class Page extends Component<Props> {
  static Actions = Actions
  static Card = Card
  static Header = Header

  render() {
    const { children, className, ...rest } = this.props

    const componentClassName = classNames('c-Page', className)

    return (
      <PageUI {...getValidProps(rest)} className={componentClassName}>
        <PropProvider value={{ Accordion: { isPage: true, isSeamless: true } }}>
          {children}
        </PropProvider>
      </PageUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Page)(Page)

export default Page
