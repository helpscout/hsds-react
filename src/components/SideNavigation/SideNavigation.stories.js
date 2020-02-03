import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import { withAktiv } from '../../utilities/storybook'
import { ItemSpec } from '../Dropdown/DropdownV2.stories'
import { SideNavigation, Flexy, Heading, Button } from '../index'

const renderSidebarFolders = () => {
  return (
    <SideNavigation.Section title="Folders">
      <SideNavigation.Item muted>Completed Test</SideNavigation.Item>
      <SideNavigation.Item count={13}>Need First Follow Up</SideNavigation.Item>
      <SideNavigation.Item muted>Not spam</SideNavigation.Item>
      <SideNavigation.Item count={84}>
        T-shirt Pre-Processing
      </SideNavigation.Item>
    </SideNavigation.Section>
  )
}

const renderSidebarFooter = () => {
  const footerItems = ItemSpec.generate(3)

  return (
    <SideNavigation.Footer>
      <SideNavigation.DropdownFooter items={footerItems} iconName="cog">
        Edit Mailbox
      </SideNavigation.DropdownFooter>
      <SideNavigation.Button iconName="new-convo">
        New conversation
      </SideNavigation.Button>
    </SideNavigation.Footer>
  )
}

class SidebarWrapper extends React.PureComponent {
  render() {
    return (
      <Flexy style={{ height: '90vh' }} gap="xl" align="top">
        <Flexy.Item
          style={{
            height: '100%',
          }}
        >
          {this.props.children}
        </Flexy.Item>
        <Flexy.Block>
          <Heading>CONTENT</Heading>
        </Flexy.Block>
      </Flexy>
    )
  }
}

class SidebarCollapsed extends React.PureComponent {
  render() {
    const { badge, headerLabel } = this.props
    const items = ItemSpec.generate(3)

    return (
      <SideNavigation collapsable>
        <SideNavigation.Header badge={badge}>
          <SideNavigation.DropdownHeader items={items} selectedItem={items[0]}>
            {headerLabel}
          </SideNavigation.DropdownHeader>
        </SideNavigation.Header>
        <SidebarHsAppItems />
        {renderSidebarFolders()}
        {renderSidebarFooter()}
      </SideNavigation>
    )
  }
}

class SidebarHsAppItems extends React.PureComponent {
  state = {
    active: 'chat',
  }

  updateActiveItem(itemName) {
    this.setState({ active: itemName })
  }

  render() {
    const { active } = this.state
    return (
      <SideNavigation.Section main={true}>
        <SideNavigation.Item
          iconName="chat"
          active={active === 'chat'}
          onClick={e => this.updateActiveItem('chat')}
        >
          Chats
        </SideNavigation.Item>
        <SideNavigation.Item
          count={137}
          iconName="unassigned"
          active={active === 'unassigned'}
          onClick={e => this.updateActiveItem('unassigned')}
        >
          Unassigned
        </SideNavigation.Item>
        <SideNavigation.Item
          count={1}
          iconName="mine"
          active={active === 'mine'}
          onClick={e => this.updateActiveItem('mine')}
        >
          Mine
        </SideNavigation.Item>
        <SideNavigation.Item
          count={2}
          iconName="alert"
          active={active === 'alert'}
          onClick={e => this.updateActiveItem('alert')}
          danger={true}
        >
          Needs attention
        </SideNavigation.Item>
        <SideNavigation.Item
          count={88}
          iconName="drafts"
          active={active === 'drafts'}
          onClick={e => this.updateActiveItem('drafts')}
        >
          Draft
        </SideNavigation.Item>
        <SideNavigation.Item
          count={131}
          iconName="assigned"
          active={active === 'assigned'}
          onClick={e => this.updateActiveItem('assigned')}
        >
          Assigned
        </SideNavigation.Item>
        <SideNavigation.Item
          muted={true}
          iconName="closed"
          active={active === 'closed'}
          onClick={e => this.updateActiveItem('closed')}
        >
          Closed
        </SideNavigation.Item>
        <SideNavigation.Item
          muted={true}
          iconName="spam"
          active={active === 'spam'}
          onClick={e => this.updateActiveItem('spam')}
        >
          Spam
        </SideNavigation.Item>
      </SideNavigation.Section>
    )
  }
}

const stories = storiesOf('SideNavigation', module)
stories.addDecorator(withAktiv)
stories.addDecorator(withKnobs)
stories.addDecorator(storyFn => <SidebarWrapper>{storyFn()}</SidebarWrapper>)

stories.add('empty', () => <SideNavigation />)

stories.add('with header', () => (
  <SideNavigation>
    <SideNavigation.Header label="Help Scout" />
    <SidebarHsAppItems />
  </SideNavigation>
))

stories.add('with linkable header', () => (
  <SideNavigation>
    <SideNavigation.Header href="https://duckduckgo.com/" label="Link" />
    <SidebarHsAppItems />
  </SideNavigation>
))

stories.add('with dropdown header', () => {
  const items = ItemSpec.generate(3)
  return (
    <SideNavigation>
      <SideNavigation.Header>
        <SideNavigation.DropdownHeader items={items} selectedItem={items[0]}>
          Dropdown
        </SideNavigation.DropdownHeader>
      </SideNavigation.Header>
      <SidebarHsAppItems />
    </SideNavigation>
  )
})

stories.add('with long list dropdown', () => {
  const items = ItemSpec.generate(25)
  return (
    <SideNavigation>
      <SideNavigation.Header>
        <SideNavigation.DropdownHeader items={items} selectedItem={items[0]}>
          Dropdown
        </SideNavigation.DropdownHeader>
      </SideNavigation.Header>
      <SidebarHsAppItems />
    </SideNavigation>
  )
})

stories.add('with custom width', () => (
  <SideNavigation width={200}>
    <SideNavigation.Header label="Help Scout" />
    <SidebarHsAppItems />
  </SideNavigation>
))

stories.add('with multiple section', () => (
  <SideNavigation>
    <SideNavigation.Header label="Help Scout" />
    <SidebarHsAppItems />
    <SideNavigation.Section title="Section #1">
      <SideNavigation.Item>Item #1</SideNavigation.Item>
    </SideNavigation.Section>
    <SideNavigation.Section title="Section #2">
      <SideNavigation.Item>Item #1</SideNavigation.Item>
    </SideNavigation.Section>
  </SideNavigation>
))

stories.add('with CTA button', () => (
  <SideNavigation>
    <SideNavigation.Header label="Help Scout" />
    <SidebarHsAppItems />
    <SideNavigation.Section withPadding={true}>
      <Button kind="secondary" size="sm">
        Open mailbox
      </Button>
    </SideNavigation.Section>
  </SideNavigation>
))

stories.add('with linkable items', () => (
  <SideNavigation>
    <SideNavigation.Header label="Help Scout" />
    <SidebarHsAppItems />
    <SideNavigation.Section title="Linkable">
      <SideNavigation.Item href="https://duckduckgo.com/">
        duckduckgo.com
      </SideNavigation.Item>
      <SideNavigation.Item href="https://google.com/">
        google.com
      </SideNavigation.Item>
    </SideNavigation.Section>
  </SideNavigation>
))

stories.add('with footer', () => {
  return (
    <SideNavigation>
      <SideNavigation.Header label="Help Scout" />
      <SidebarHsAppItems />
      {renderSidebarFooter()}
    </SideNavigation>
  )
})

stories.add('is collapsed', () => {
  const badge = text('badgeLabel', 'HS')
  const headerLabel = text('headerLabel', 'Help Scout')
  return <SidebarCollapsed badge={badge} headerLabel={headerLabel} />
})
