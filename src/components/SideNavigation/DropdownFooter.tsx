import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './SideNavigation.utils'

import { createUniqueIDFactory } from '../../utilities/id'
import { noop } from '../../utilities/other'

import Icon from '../Icon'
import SideNavigation from './SideNavigation'
import Dropdown from '../Dropdown/DropdownV2'

import {} from './SideNavigation.css'

export interface Props {
  className?: string
  items: Array<any>
  selectedItem: any
  floatingMenu?: boolean
  iconName: string
  forceNavVisibleOn(id: string)
  forceNavVisibleOff(id: string)
}

const UNIQUE_ID = createUniqueIDFactory(COMPONENT_KEY.DropdownFooter)

export class DropdownFooter extends React.PureComponent<Props> {
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
    const {
      children,
      className,
      floatingMenu,
      iconName,
      items,
      selectedItem,
      ...rest
    } = this.props

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

namespaceComponent(COMPONENT_KEY.DropdownFooter)(DropdownFooter)

export default DropdownFooter
