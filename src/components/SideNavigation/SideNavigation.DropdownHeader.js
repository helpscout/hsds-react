import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

import { createUniqueIDFactory } from '../../utilities/id'

import Icon from '../Icon'
import SearchableDropdown from '../SearchableDropdown/SearchableDropdown'

import { DropdownHeaderUI } from './SideNavigation.css'
import SideNavigation, { SideNavigationContext } from './SideNavigation'

const UNIQUE_ID = createUniqueIDFactory('DropdownHeader')

export class DropdownHeader extends React.PureComponent {
  static displayName = 'SideNavigation.DropdownHeader'
  static defaultProps = {}

  id = UNIQUE_ID()

  handleOnClose = () => {
    this.props.forceNavVisibleOff(this.id)
  }

  handleOnOpen = () => {
    this.props.forceNavVisibleOn(this.id)
  }

  render() {
    const {
      children,
      className,
      items = [],
      selectedItem,
      ...rest
    } = this.props
    const componentClassName = classNames(
      'c-SideNavigation__DropdownHeader',
      className
    )

    return (
      <DropdownHeaderUI>
        <SearchableDropdown
          {...getValidProps(rest)}
          className={componentClassName}
          items={items}
          selectedItem={selectedItem}
          onClose={this.handleOnClose}
          onOpen={this.handleOnOpen}
          menuOffsetTop={8}
          limit={10}
          trigger={
            <SideNavigation.Heading>
              {children} <Icon name="caret-down" inline size="14" />
            </SideNavigation.Heading>
          }
        />
      </DropdownHeaderUI>
    )
  }
}

const DropdownHeaderConsummer = props => {
  const contextValue = React.useContext(SideNavigationContext)

  if (contextValue) {
    const newProps = { ...props, ...contextValue }
    newProps.className = classNames(props.className, contextValue.className)
    return <DropdownHeader {...newProps} />
  }

  return <DropdownHeader {...props} />
}

export default DropdownHeaderConsummer
