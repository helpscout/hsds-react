import * as React from 'react'

import {
  HsAppUI,
  ContentUI,
  InnerContentUI,
  AppLayoutUI,
  AppContainerUI,
} from './HsApp.css'
import Nav from './Nav'
import Sidenav from './Sidenav'

export interface Props {
  children?: any
  withInnerWrapper?: boolean
  sidebarComponent?: any
  contentComponent?: any
  navComponent?: any
}

class HsApp extends React.PureComponent<Props> {
  static defaultProps = {
    withInnerWrapper: true,
    sidebarComponent: null,
    contentComponent: null,
  }

  static Nav = Nav
  static Sidenav = Sidenav

  componentDidMount() {
    document.body.classList.add('with-hsapp-wrapper')
  }

  componentWillUnmount() {
    document.body.classList.remove('with-hsapp-wrapper')
  }

  renderChildren() {
    const { children, withInnerWrapper } = this.props
    if (withInnerWrapper) {
      return <InnerContentUI>{children}</InnerContentUI>
    }
    return children
  }

  render() {
    const { sidebarComponent, contentComponent, navComponent } = this.props
    return (
      <HsAppUI>
        {navComponent ? navComponent : <HsApp.Nav />}
        <AppLayoutUI>
          <AppContainerUI>
            {sidebarComponent ? sidebarComponent : <HsApp.Sidenav />}
            {contentComponent ? (
              contentComponent
            ) : (
              <ContentUI>{this.renderChildren()}</ContentUI>
            )}
          </AppContainerUI>
        </AppLayoutUI>
      </HsAppUI>
    )
  }
}
export default HsApp
