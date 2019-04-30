import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

import { COMPONENT_KEY } from './SideNavigation.utils'
import { propConnect } from '../PropProvider'
import Icon from '../Icon'
import FadeInOut from './SideNavigation.FadeInOut'

import { FooterUI } from './styles/SideNavigation.css'

export interface Props {
  className?: string
  collapsable?: boolean
  collapsed?: boolean
  floatingMenu?: boolean
}

export class Footer extends React.PureComponent<Props> {
  static defaultProps = {}

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

export default propConnect(COMPONENT_KEY.Footer)(Footer)
