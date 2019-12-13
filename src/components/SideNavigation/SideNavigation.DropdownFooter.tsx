import * as React from 'react'
import { classNames } from '../../utilities/classNames'

import { createUniqueIDFactory } from '../../utilities/id'
import { noop } from '../../utilities/other'

import { COMPONENT_KEY } from './SideNavigation.utils'
import { SideNavigationDropdownFooterProps } from './SideNavigation.types'

import Icon from '../Icon'
import SideNavigation from './SideNavigation'
import Dropdown from '../Dropdown/DropdownV2'

import {} from './styles/SideNavigation.css'

const UNIQUE_ID = createUniqueIDFactory(COMPONENT_KEY.DropdownFooter)

export class DropdownFooter extends React.PureComponent<
  SideNavigationDropdownFooterProps
> {
  static displayName = 'SideNavigation.DropdownFooter'
  static defaultProps = {
    forceNavVisibleOn: noop,
    forceNavVisibleOff: noop,
  }

  id = UNIQUE_ID()

  handleOnClose = () => {
    this.props.forceNavVisibleOff(this.id)
  }

  handleOnOpen = () => {
    this.props.forceNavVisibleOn(this.id)
  }

  render() {
    const { children, className, floatingMenu, iconName, items } = this.props

    const componentClassName = classNames(
      'c-SideNavigation__DropdownFooter',
      className
    )

    return (
      <Dropdown
        className={componentClassName}
        items={items}
        onClose={this.handleOnClose}
        onOpen={this.handleOnOpen}
        renderTrigger={
          <SideNavigation.Button
            icon={
              <Icon
                name={iconName}
                offsetLeft={false}
                withCaret={!floatingMenu}
              />
            }
          >
            {children}
          </SideNavigation.Button>
        }
      />
    )
  }
}

export default DropdownFooter
