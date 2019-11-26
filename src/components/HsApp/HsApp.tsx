import * as React from 'react'

import {
  HsAppUI,
  ContentUI,
  InnerContentUI,
  AppLayoutUI,
  AppContainerUI,
} from './styles/HsApp.css'
import Nav from './HsApp.Nav'
import Sidenav from './HsApp.Sidenav'

export interface Props {
  children?: any
  withInnerWrapper: boolean
  sidenavComponent?: any
  contentComponent?: any
  navComponent?: any
}

class HsApp extends React.PureComponent<Props> {
  static defaultProps = {
    withInnerWrapper: true,
    sidenavComponent: null,
    navComponent: null,
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
    const { sidenavComponent, contentComponent, navComponent } = this.props
    return (
      <div className="c-HsApp">
        {navComponent ? navComponent : <HsApp.Nav />}
        <AppLayoutUI>
          <AppContainerUI>
            {sidenavComponent ? sidenavComponent : <HsApp.Sidenav />}
            {contentComponent ? (
              contentComponent
            ) : (
              <ContentUI>{this.renderChildren()}</ContentUI>
            )}
          </AppContainerUI>
        </AppLayoutUI>
      </div>
    )
  }
}
export default HsApp
