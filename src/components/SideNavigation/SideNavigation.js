import React, { useState } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

import Button from './SideNavigation.Button'
import DropdownHeader from './SideNavigation.DropdownHeader'
import DropdownFooter from './SideNavigation.DropdownFooter'
import FadeInOut from './SideNavigation.FadeInOut'
import Footer from './SideNavigation.Footer'
import Header from './SideNavigation.Header'
import Heading from './SideNavigation.Heading'
import Item from './SideNavigation.Item'
import Section from './SideNavigation.Section'

import {
  SideNavigationUI,
  SideNavigationCollapsableUI,
} from './SideNavigation.css'

export const SideNavigationContext = React.createContext({})

export const SideNavigation = ({
  children,
  className,
  width,
  collapsable,
  floatingMenu,
  ...rest
}) => {
  const [dropdowns, setDropdowns] = useState([])

  const forceNavVisibleOn = dropdownId => {
    setDropdowns([...dropdowns, dropdownId])
  }

  const forceNavVisibleOff = dropdownId => {
    setDropdowns(dropdowns.filter(id => id !== dropdownId))
  }

  const contextValue = {
    collapsable,
    floatingMenu,
    forceNavVisibleOn,
    forceNavVisibleOff,
  }

  const componentClassName = classNames(
    'c-SideNavigation',
    collapsable ? 'is-collapsable' : '',
    dropdowns.length > 0 ? 'is-nav-always-visible' : '',
    className
  )

  let sidenavComponent = (
    <SideNavigationUI
      aria-label="SideNavigation"
      aria-labelledby="SideNavigation__heading"
      {...getValidProps(rest)}
      className={componentClassName}
      width={width}
    >
      {children}
    </SideNavigationUI>
  )

  if (collapsable) {
    sidenavComponent = (
      <SideNavigationCollapsableUI>
        {sidenavComponent}
      </SideNavigationCollapsableUI>
    )
  }

  return (
    <SideNavigationContext.Provider value={contextValue}>
      {sidenavComponent}
    </SideNavigationContext.Provider>
  )
}

SideNavigation.Button = Button
SideNavigation.DropdownHeader = DropdownHeader
SideNavigation.DropdownFooter = DropdownFooter
SideNavigation.FadeInOut = FadeInOut
SideNavigation.Footer = Footer
SideNavigation.Header = Header
SideNavigation.Heading = Heading
SideNavigation.Item = Item
SideNavigation.Section = Section

export default SideNavigation
