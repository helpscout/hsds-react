import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import PageActions from './Page.Actions'
import PageCard from './Page.Card'
import PageContent from './Page.Content'
import PageHeader from './Page.Header'
import PageSection from './Page.Section'
import { classNames } from '../../utilities/classNames'
import { PageUI } from './Page.css'

export const PageContext = React.createContext({})

export class Page extends React.PureComponent {
  static Actions = PageActions
  static Card = PageCard
  static Content = PageContent
  static Header = PageHeader
  static Section = PageSection

  getContextValue = () => {
    const { isResponsive } = this.props

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

Page.defaultProps = {
  'data-cy': 'Page',
  isResponsive: false,
}

export default Page
