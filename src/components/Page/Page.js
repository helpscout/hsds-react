import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Actions from './Page.Actions'
import Card from './Page.Card'
import Content from './Page.Content'
import Header from './Page.Header'
import Section from './Page.Section'
import { classNames } from '../../utilities/classNames'
import { PageUI } from './styles/Page.css'

export const PageContext = React.createContext({})

export class Page extends React.PureComponent {
  static defaultProps = {
    isResponsive: false,
  }
  static Actions = Actions
  static Card = Card
  static Content = Content
  static Header = Header
  static Section = Section

  getContextValue = () => {
    const { isResponsive } = this.props

    // [CONDITIONLIST_COMPONENT_KEY.ConditionList]: { isWithOffset: true },
    return {
      accordion: {
        isPage: true,
        isSeamless: true,
      },
      isWithOffset: true,
      isResponsive,
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
      <PageContext.Provider value={this.getContextValue()}>
        <PageUI {...getValidProps(rest)} className={componentClassName}>
          {children}
        </PageUI>
      </PageContext.Provider>
    )
  }
}

export default Page
