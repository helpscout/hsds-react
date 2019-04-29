import * as React from 'react'
import {
  HeaderUI,
  LogoUI,
  NavUI,
  DropdownTriggerUI,
  DropdownUI,
  SecIconUI,
  SecondaryNavUI,
  AvatarUI,
} from './HsApp.css'
import Icon from '../Icon/index'
import Text from '../Text/index'

export interface Props {}

class Nav extends React.PureComponent<Props> {
  renderDropdowns() {
    const items = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
      { value: 'three', label: 'Three' },
      { value: 'four', label: 'Four' },
    ]
    return ['Mailboxes', 'Docs', 'Reports', 'Manage'].map(d => (
      <DropdownUI
        key={d}
        items={items}
        trigger={
          <DropdownTriggerUI>
            <Text size="14">{d}</Text>{' '}
            <Icon name="caret-down" inline size="16" />
          </DropdownTriggerUI>
        }
      />
    ))
  }
  render() {
    return (
      <HeaderUI>
        <LogoUI>
          <Icon name="hs-logo" size="20" />
        </LogoUI>
        <NavUI>{this.renderDropdowns()}</NavUI>
        <SecondaryNavUI>
          <SecIconUI>
            <Icon name="bell" size="20" />
          </SecIconUI>
          <SecIconUI className="less-padding">
            <Icon name="buoy" size="20" withCaret />
          </SecIconUI>
          <SecIconUI>
            <Icon name="search" size="20" />
          </SecIconUI>
        </SecondaryNavUI>

        <AvatarUI shape="rounded" size="xs" />
      </HeaderUI>
    )
  }
}

export default Nav
