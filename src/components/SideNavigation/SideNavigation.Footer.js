import React, { useContext } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

import Icon from '../Icon'
import FadeInOut from './SideNavigation.FadeInOut'

import { FooterUI } from './SideNavigation.css'
import { SideNavigationContext } from './SideNavigation'

export const Footer = ({ children, className, ...rest }) => {
  const { collapsable, floatingMenu } = useContext(SideNavigationContext)

  const componentClassName = classNames(
    'c-SideNavigation__Footer',
    floatingMenu ? 'is-floating-menu' : '',
    className
  )

  return (
    <FooterUI {...getValidProps(rest)} className={componentClassName}>
      {collapsable && (
        <Icon className="c-SideNavigation__more" name="option-dots" />
      )}
      <FadeInOut>{children}</FadeInOut>
    </FooterUI>
  )
}

Footer.displayName = 'SideNavigation.Footer'

export default Footer
