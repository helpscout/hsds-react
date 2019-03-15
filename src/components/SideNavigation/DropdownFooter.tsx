import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './SideNavigation.utils'

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
}

export class DropdownFooter extends React.PureComponent<Props> {
  static defaultProps = {}

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
