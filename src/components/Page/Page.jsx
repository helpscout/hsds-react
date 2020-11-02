import React from 'react'
import PropTypes from 'prop-types'
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
        <PageUI {...rest} className={componentClassName}>
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

Page.propTypes = {
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Custom class names to be added to the component. */
  isResponsive: PropTypes.bool,
}

export default Page
