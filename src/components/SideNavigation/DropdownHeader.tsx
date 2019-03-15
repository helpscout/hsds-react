import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './SideNavigation.utils'

import Icon from '../Icon'
import Dropdown from '../Dropdown/DropdownV2'
import AutoDropdown from '../AutoDropdown'

import { DropdownHeaderUI, DropdownHeaderTriggerUI } from './SideNavigation.css'

export interface Props {
  className?: string
  items: Array<any>
  selectedItem: any
}

export class DropdownHeader extends React.PureComponent<Props> {
  static defaultProps = {}

  render() {
    const { children, className, items, selectedItem, ...rest } = this.props
    const componentClassName = classNames(
      'c-SideNavigation__DropdownHeader',
      className
    )

    const ElementName: AutoDropdown | Dropdown =
      items.length > 10 ? AutoDropdown : Dropdown

    return (
      <DropdownHeaderUI>
        <ElementName
          {...getValidProps(rest)}
          className={componentClassName}
          items={items}
          selectedItem={selectedItem}
          trigger={
            <DropdownHeaderTriggerUI weight={400} size="20">
              {children} <Icon name="caret-down" inline size="12" />
            </DropdownHeaderTriggerUI>
          }
        />
      </DropdownHeaderUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.DropdownHeader)(DropdownHeader)

export default DropdownHeader
