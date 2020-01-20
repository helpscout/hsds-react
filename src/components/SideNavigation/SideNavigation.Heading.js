import React from 'react'
import { classNames } from '../../utilities/classNames'

import Heading from '../Heading'

export const SideNavigationHeading = ({ children, className }) => (
  <Heading
    size="h3"
    weight={400}
    className={classNames('c-SideNavigation__Heading', className)}
    id="SideNavigation__heading"
  >
    {children}
  </Heading>
)

SideNavigationHeading.displayName = 'SideNavigation.Heading'

export default SideNavigationHeading
