import * as React from 'react'
import { createSpec, faker } from '@helpscout/helix'
import SideNavigation from '../SideNavigation'
import Icon from '../Icon'
import { noop } from '../../utilities/other'

const ItemSpec = createSpec({
  id: faker.random.uuid(),
  label: faker.name.firstName(),
  value: faker.name.firstName(),
  onClick: noop,
})

export interface Props {
  collapsable?: boolean
  badge?: string
  headerLabel?: string
}

class Sidenav extends React.PureComponent<Props> {
  static defaultProps = {
    headerLabel: 'Help Scout',
  }

  state = { active: 'chat' }

  updateActiveItem(itemName: string) {
    this.setState({ active: itemName })
  }

  renderHeader() {
    const headerItems = ItemSpec.generate(3)
    const { headerLabel, badge, collapsable } = this.props

    return (
      <SideNavigation.Header>
        {!collapsable && (
          <SideNavigation.DropdownHeader
            items={headerItems}
            selectedItem={headerItems[0]}
          >
            {headerLabel}
          </SideNavigation.DropdownHeader>
        )}

        {collapsable && (
          <SideNavigation.Heading label={headerLabel} badge={badge} />
        )}
      </SideNavigation.Header>
    )
  }

  renderItems() {
    const { active } = this.state

    const items = [
      { name: 'chat', label: 'Chats' },
      { name: 'unassigned', label: 'Unassigned' },
      { name: 'mine', label: 'Mine' },
      { name: 'alert', label: 'Needs attention' },
      { name: 'drafts', label: 'Draft' },
      { name: 'assigned', label: 'Assigned' },
      { name: 'closed', label: 'Closed' },
      { name: 'spam', label: 'Spam' },
    ]

    return (
      <SideNavigation.Section main={true}>
        {items.map(({ name, label }) => {
          return (
            <SideNavigation.Item
              key={name}
              iconName={name}
              active={active === name}
              onClick={e => this.updateActiveItem(name)}
            >
              {label}
            </SideNavigation.Item>
          )
        })}
      </SideNavigation.Section>
    )
  }

  renderSidebarFolders() {
    return (
      <SideNavigation.Section title="Folders">
        <SideNavigation.Item muted>Completed Test</SideNavigation.Item>
        <SideNavigation.Item count={13}>
          Need First Follow Up
        </SideNavigation.Item>
        <SideNavigation.Item muted>Not spam</SideNavigation.Item>
        <SideNavigation.Item count={84}>
          T-shirt Pre-Processing
        </SideNavigation.Item>
      </SideNavigation.Section>
    )
  }

  renderSidebarFooter() {
    const footerItems = ItemSpec.generate(3)

    return (
      <SideNavigation.Footer>
        <SideNavigation.DropdownFooter items={footerItems} iconName="cog">
          Edit Mailbox
        </SideNavigation.DropdownFooter>
        <SideNavigation.Button icon={<Icon name="new-convo" />}>
          New conversation
        </SideNavigation.Button>
      </SideNavigation.Footer>
    )
  }

  render() {
    return (
      <SideNavigation className="c-HsApp__Sidenav">
        {this.renderHeader()}
        {this.renderItems()}
        {this.renderSidebarFolders()}
        {this.renderSidebarFooter()}
      </SideNavigation>
    )
  }
}

export default Sidenav
