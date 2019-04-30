import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { COMPONENT_KEY } from './SideNavigation.utils'
import { SideNavigationDropdownHeaderProps } from './SideNavigation.types'

import { createUniqueIDFactory } from '../../utilities/id'
import { propConnect } from '../PropProvider'

import Icon from '../Icon'
import AutoDropdown from '../AutoDropdown/AutoDropdown'

import { DropdownHeaderUI } from './styles/SideNavigation.css'
import SideNavigation from './SideNavigation'

const UNIQUE_ID = createUniqueIDFactory(COMPONENT_KEY.DropdownHeader)

export class DropdownHeader extends React.PureComponent<
  SideNavigationDropdownHeaderProps
> {
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
        <AutoDropdown
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

export default propConnect(COMPONENT_KEY.DropdownHeader)(DropdownHeader)
