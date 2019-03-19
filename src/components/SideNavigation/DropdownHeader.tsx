import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { COMPONENT_KEY } from './SideNavigation.utils'

import { createUniqueIDFactory } from '../../utilities/id'
import { noop } from '../../utilities/other'
import { propConnect } from '../PropProvider'

import Icon from '../Icon'
import Dropdown from '../Dropdown/DropdownV2'
import AutoDropdown from '../AutoDropdown/AutoDropdown'

import { DropdownHeaderUI, DropdownHeaderTriggerUI } from './SideNavigation.css'
import SideNavigation from './SideNavigation'

export interface Props {
  className?: string
  items: Array<any>
  selectedItem: any
  forceNavVisibleOn(id: string)
  forceNavVisibleOff(id: string)
}

const UNIQUE_ID = createUniqueIDFactory(COMPONENT_KEY.DropdownHeader)

export class DropdownHeader extends React.PureComponent<Props> {
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

    const ElementName: any = items.length > 10 ? AutoDropdown : Dropdown

    return (
      <DropdownHeaderUI>
        <ElementName
          {...getValidProps(rest)}
          className={componentClassName}
          items={items}
          selectedItem={selectedItem}
          onClose={this.handleOnClose}
          onOpen={this.handleOnOpen}
          trigger={
            <SideNavigation.Heading>
              {children} <Icon name="caret-down" inline size="12" />
            </SideNavigation.Heading>
          }
        />
      </DropdownHeaderUI>
    )
  }
}

export default propConnect(COMPONENT_KEY.DropdownHeader)(DropdownHeader)
