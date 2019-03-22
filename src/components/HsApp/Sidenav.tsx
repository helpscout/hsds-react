import * as React from 'react'
import { createSpec, faker } from '@helpscout/helix'
import SideNavigation from '../SideNavigation'
import Icon from '../Icon'

const ItemSpec = createSpec({
  id: faker.random.uuid(),
  label: faker.name.firstName(),
  value: faker.name.firstName(),
  onClick: () => (value, props) => console.log('Clicked!', value),
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

    return (
      <SideNavigation.Section main={true}>
        <SideNavigation.Item
          icon={<Icon name="chat" />}
          active={active === 'chat'}
          onClick={e => this.updateActiveItem('chat')}
        >
          Chats
        </SideNavigation.Item>
        <SideNavigation.Item
          count={137}
          icon={<Icon name="unassigned" />}
          active={active === 'unassigned'}
          onClick={e => this.updateActiveItem('unassigned')}
        >
          Unassigned
        </SideNavigation.Item>
        <SideNavigation.Item
          count={1}
          icon={<Icon name="mine" />}
          active={active === 'mine'}
          onClick={e => this.updateActiveItem('mine')}
        >
          Mine
        </SideNavigation.Item>
        <SideNavigation.Item
          count={2}
          icon={<Icon name="alert" />}
          active={active === 'alert'}
          onClick={e => this.updateActiveItem('alert')}
          danger={true}
        >
          Needs attention
        </SideNavigation.Item>
        <SideNavigation.Item
          count={88}
          icon={<Icon name="drafts" />}
          active={active === 'drafts'}
          onClick={e => this.updateActiveItem('drafts')}
        >
          Draft
        </SideNavigation.Item>
        <SideNavigation.Item
          count={131}
          icon={<Icon name="assigned" />}
          active={active === 'assigned'}
          onClick={e => this.updateActiveItem('assigned')}
        >
          Assigned
        </SideNavigation.Item>
        <SideNavigation.Item
          muted={true}
          icon={<Icon name="closed" />}
          active={active === 'closed'}
          onClick={e => this.updateActiveItem('closed')}
        >
          Closed
        </SideNavigation.Item>
        <SideNavigation.Item
          muted={true}
          icon={<Icon name="spam" />}
          active={active === 'spam'}
          onClick={e => this.updateActiveItem('spam')}
        >
          Spam
        </SideNavigation.Item>
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
      <SideNavigation>
        {this.renderHeader()}
        {this.renderItems()}
        {this.renderSidebarFolders()}
        {this.renderSidebarFooter()}
      </SideNavigation>
    )
  }
}

export default Sidenav
