import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

import PropProvider from '../PropProvider'
import Button from './Button'
import DropdownHeader from './DropdownHeader'
import DropdownFooter from './DropdownFooter'
import FadeInOut from './FadeInOut'
import Footer from './Footer'
import Header from './Header'
import Heading from './Heading'
import Item from './Item'
import Section from './Section'
import { COMPONENT_KEY } from './SideNavigation.utils'

import {
  SideNavigationUI,
  SideNavigationCollapsableUI,
} from './SideNavigation.css'

export interface Props {
  className?: string
  width?: number
  collapsable?: boolean
  collapsed?: boolean
  floatingMenu?: boolean
}
export interface States {
  dropdowns: string[]
}

export class SideNavigation extends React.PureComponent<Props, States> {
  static defaultProps = {}

  static Button = Button
  static DropdownHeader = DropdownHeader
  static DropdownFooter = DropdownFooter
  static FadeInOut = FadeInOut
  static Footer = Footer
  static Header = Header
  static Heading = Heading
  static Item = Item
  static Section = Section

  constructor(props) {
    super(props)

    this.state = {
      dropdowns: [],
    }
  }

  forceNavVisibleOn = (dropdownId: string) => {
    const { dropdowns } = this.state
    this.setState({ dropdowns: [...dropdowns, dropdownId] })
  }

  forceNavVisibleOff = dropdownId => {
    const { dropdowns } = this.state
    this.setState({ dropdowns: dropdowns.filter(id => id !== dropdownId) })
  }

  getProviderValue() {
    const { collapsable, floatingMenu } = this.props

    return {
      [COMPONENT_KEY.Item]: {
        collapsable,
        floatingMenu,
      },
      [COMPONENT_KEY.Header]: {
        collapsable,
      },
      [COMPONENT_KEY.Footer]: {
        collapsable,
        floatingMenu,
      },
      [COMPONENT_KEY.Button]: {
        floatingMenu,
      },
      [COMPONENT_KEY.DropdownFooter]: {
        floatingMenu,
        forceNavVisibleOn: this.forceNavVisibleOn,
        forceNavVisibleOff: this.forceNavVisibleOff,
      },
      [COMPONENT_KEY.DropdownHeader]: {
        floatingMenu,
        forceNavVisibleOn: this.forceNavVisibleOn,
        forceNavVisibleOff: this.forceNavVisibleOff,
      },
      [COMPONENT_KEY.FadeInOut]: {
        collapsable,
      },
    }
  }

  shouldMenuStayOpen() {
    return this.state.dropdowns.length > 0
  }

  renderSidenav() {
    const {
      children,
      className,
      width,
      collapsable,
      floatingMenu,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-SideNavigation',
      collapsable ? 'is-collapsable' : '',
      this.shouldMenuStayOpen() ? 'is-nav-always-visible' : '',
      className
    )

    let styles: object = {}
    if (width) {
      styles = {
        width: `${width}px`,
      }
    }

    const sidenavComponent = (
      <SideNavigationUI
        aria-label="SideNavigation"
        aria-labelledby="SideNavigation__heading"
        {...getValidProps(rest)}
        className={componentClassName}
        style={styles}
      >
        {children}
      </SideNavigationUI>
    )

    if (collapsable) {
      return (
        <SideNavigationCollapsableUI>
          {sidenavComponent}
        </SideNavigationCollapsableUI>
      )
    }

    return sidenavComponent
  }

  render() {
    return (
      <PropProvider value={this.getProviderValue()}>
        {this.renderSidenav()}
      </PropProvider>
    )
  }
}

export default SideNavigation
