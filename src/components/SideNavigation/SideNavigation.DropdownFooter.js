import React from 'react'
import { classNames } from '../../utilities/classNames'

import { createUniqueIDFactory } from '../../utilities/id'
import { noop } from '../../utilities/other'

import Icon from '../Icon'
import SideNavigation, { SideNavigationContext } from './SideNavigation'
import Dropdown from '../Dropdown/DropdownV2'

import {} from './SideNavigation.css'

const UNIQUE_ID = createUniqueIDFactory('DropdownFooter')

export class DropdownFooter extends React.PureComponent {
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

const DropdownFooterConsummer = props => {
  const contextValue = React.useContext(SideNavigationContext)

  if (contextValue) {
    const newProps = { ...props, ...contextValue }
    newProps.className = classNames(props.className, contextValue.className)
    return <DropdownFooter {...newProps} />
  }

  return <DropdownFooter {...props} />
}

export default DropdownFooterConsummer
