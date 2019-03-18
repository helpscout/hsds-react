import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import Icon from '../Icon'

import { ItemUI, ButtonUI, CountUI, IconUI } from './SideNavigation.css'
import SideNavigation from './'

export interface Props {
  className?: string
  collapsed?: boolean
  href?: string
  icon?: Icon
  count?: number
  active?: boolean
  muted?: boolean
  disabled?: boolean
  onClick: (event: Event) => void
}

export class Item extends React.PureComponent<Props> {
  static defaultProps = {
    active: false,
    muted: false,
    disabled: false,
    onClick: noop,
  }

  render() {
    const {
      children,
      className,
      icon,
      count,
      href,
      active,
      muted,
      disabled,
      onClick,
      collapsed,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-SideNavigation__Item',
      active ? 'is-active' : '',
      muted ? 'is-muted' : '',
      disabled ? 'is-disabled' : '',
      className
    )

    return (
      <ItemUI {...getValidProps(rest)} className={componentClassName}>
        <ButtonUI version={2} href={href} disabled={disabled} onClick={onClick}>
          {icon && <IconUI>{icon}</IconUI>}
          <SideNavigation.FadeInOut>
            {children}
            {count && <CountUI>{count}</CountUI>}
          </SideNavigation.FadeInOut>
        </ButtonUI>
      </ItemUI>
    )
  }
}

export default Item
