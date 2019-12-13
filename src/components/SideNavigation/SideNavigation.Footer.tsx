import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

import { SideNavigationFooterProps } from './SideNavigation.types'
import Icon from '../Icon'
import FadeInOut from './SideNavigation.FadeInOut'

import { FooterUI } from './styles/SideNavigation.css'

export class Footer extends React.PureComponent<SideNavigationFooterProps> {
  static defaultProps = {}
  static displayName = 'SideNavigation.Footer'

  render() {
    const {
      children,
      className,
      collapsable,
      floatingMenu,
      ...rest
    } = this.props

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
}

export default Footer
