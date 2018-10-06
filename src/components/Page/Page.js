// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Actions from './Actions'
import Card from './Card'
import Content from './Content'
import Header from './Header'
import PropProvider from '../PropProvider'
import { classNames } from '../../utilities/classNames.ts'
import { namespaceComponent } from '../../utilities/component.ts'
import { PageUI } from './styles/Page.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  children?: any,
  className?: string,
  isResponsive: boolean,
}

class Page extends Component<Props> {
  static defaultProps = {
    isResponsive: false,
  }
  static Actions = Actions
  static Card = Card
  static Content = Content
  static Header = Header

  getPropProviderProps = () => {
    const { isResponsive } = this.props

    return {
      Accordion: { isPage: true, isSeamless: true },
      [COMPONENT_KEY.Card]: {
        isResponsive,
      },
      [COMPONENT_KEY.Header]: {
        isResponsive,
      },
    }
  }

  render() {
    const { children, className, isResponsive, ...rest } = this.props

    const componentClassName = classNames(
      'c-Page',
      isResponsive && 'is-responsive',
      className
    )

    return (
      <PropProvider value={this.getPropProviderProps()}>
        <PageUI {...getValidProps(rest)} className={componentClassName}>
          {children}
        </PageUI>
      </PropProvider>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Page)(Page)

export default Page
