import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'

import Header from './Header'
import Item from './Item'
import Section from './Section'
import Footer from './Footer'
import Button from './Button'
import { COMPONENT_KEY } from './SideNavigation.utils'

import { SideNavigationUI } from './SideNavigation.css'

export interface Props {
  className?: string
  width?: number
}

export class SideNavigation extends React.PureComponent<Props> {
  static defaultProps = {}

  static Header = Header
  static Item = Item
  static Section = Section
  static Footer = Footer
  static Button = Button

  render() {
    const { children, className, width, ...rest } = this.props

    const componentClassName = classNames('c-SideNavigation', className)

    let styles: object = {}
    if (width) {
      styles = {
        width: `${width}px`,
      }
    }

    return (
      <SideNavigationUI
        aria-label="SideNavigation"
        {...getValidProps(rest)}
        className={componentClassName}
        style={styles}
      >
        {children}
      </SideNavigationUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.SideNavigation)(SideNavigation)

export default SideNavigation
