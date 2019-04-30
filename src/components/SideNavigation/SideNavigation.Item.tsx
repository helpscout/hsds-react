import * as React from 'react'

import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { SideNavigationItemProps } from './SideNavigation.types'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'

import Icon from '../Icon'
import FadeInOut from './SideNavigation.FadeInOut'

import { ItemUI, ButtonUI, CountUI, IconUI } from './styles/SideNavigation.css'

export class Item extends React.PureComponent<SideNavigationItemProps> {
  static defaultProps = {
    active: false,
    danger: false,
    muted: false,
    disabled: false,
    onClick: noop,
  }

  render() {
    const {
      children,
      className,
      iconName,
      count,
      href,
      active,
      muted,
      disabled,
      onClick,
      collapsed,
      danger,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-SideNavigation__Item',
      active ? 'is-active' : '',
      muted ? 'is-muted' : '',
      disabled ? 'is-disabled' : '',
      danger ? 'is-danger' : '',
      className
    )

    const buttonClassName = classNames(
      danger ? 'is-danger' : '',
      active && !danger ? 'is-primary' : ''
    )

    return (
      <ItemUI {...getValidProps(rest)} className={componentClassName}>
        <ButtonUI
          version={2}
          href={href}
          disabled={disabled}
          onClick={onClick}
          className={buttonClassName}
        >
          {iconName && (
            <IconUI>
              <Icon name={iconName} size={24} />
            </IconUI>
          )}
          <FadeInOut>
            {children}
            {count && <CountUI>{count}</CountUI>}
          </FadeInOut>
        </ButtonUI>
      </ItemUI>
    )
  }
}

export default Item
