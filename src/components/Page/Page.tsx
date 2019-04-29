import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Actions from './Page.Actions'
import Card from './Page.Card'
import Content from './Page.Content'
import Header from './Page.Header'
import Section from './Page.Section'
import PropProvider from '../PropProvider'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { PageUI } from './styles/Page.css'
import { COMPONENT_KEY } from './Page.utils'

export interface Props {
  children?: any
  className?: string
  isResponsive: boolean
}

class Page extends React.PureComponent<Props> {
  static defaultProps = {
    isResponsive: false,
  }
  static Actions = Actions
  static Card = Card
  static Content = Content
  static Header = Header
  static Section = Section

  getPropProviderProps = () => {
    const { isResponsive } = this.props

    return {
      Accordion: { isPage: true, isSeamless: true },
      [COMPONENT_KEY.Section]: {
        isResponsive,
      },
      [COMPONENT_KEY.Header]: {
        isResponsive,
      },
      [COMPONENT_KEY.Content]: {
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
