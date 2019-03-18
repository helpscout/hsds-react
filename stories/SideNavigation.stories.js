import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs'
import withAktiv from './utils/withAktiv'

import {
  SideNavigation,
  Flexy,
  Heading,
  Icon,
  Button,
  AutoDropdown,
} from '../src/index.js'
import Dropdown from '../src/components/Dropdown/DropdownV2'
import { SideNavigationHeaderUI } from '../src/components/SideNavigation/SideNavigation.css'
import { ItemSpec } from './DropdownV2.stories'

import styled from '../src/components/styled'
import { render } from 'enzyme'

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
      <SideNavigation.Button icon={<Icon name="new-convo" />}>
        New conversation
      </SideNavigation.Button>
    </SideNavigation.Footer>
  )
}

export const SideNavigationFloatingUI = styled(SideNavigation)`
  position: absolute;
  left: 8px;
  top: 50px;
  height: auto;
`

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
          <SideNavigation.DropdownHeader items={items} selectedItems={items[0]}>
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

class SidebarFloatingMenu extends React.PureComponent {
  state = {
    isOpen: false,
  }

  toggleMenu = () => {
    const { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
  }

  render() {
    const { isOpen } = this.state

    return (
      <div>
        <Button version={2} kind="secondary" onClick={this.toggleMenu}>
          <Icon name="drag" />
        </Button>

        {isOpen && (
          <SideNavigationFloatingUI floatingMenu={true}>
            <SideNavigation.Header label="Help Scout" />
            <SidebarHsAppItems />
            {renderSidebarFolders()}
            {renderSidebarFooter()}
          </SideNavigationFloatingUI>
        )}
      </div>
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
        <SideNavigation.DropdownHeader items={items} selectedItems={items[0]}>
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
        <SideNavigation.DropdownHeader items={items} selectedItems={items[0]}>
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
      <Button version={2} kind="secondary" size="sm">
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

stories.add('is floating', () => {
  return <SidebarFloatingMenu />
})

const storiesHsApp = storiesOf('SideNavigation/HS App Demo', module)
storiesHsApp.addDecorator(withAktiv)
storiesHsApp.addDecorator(withKnobs)
storiesHsApp.addDecorator(storyFn => (
  <SidebarWrapper>{storyFn()}</SidebarWrapper>
))

storiesHsApp.add('HS App - Mailbox', () => {
  const items = ItemSpec.generate(3)

  return (
    <SideNavigation>
      <SideNavigation.Header>
        <SideNavigation.DropdownHeader items={items} selectedItems={items[0]}>
          Dropdown
        </SideNavigation.DropdownHeader>
      </SideNavigation.Header>
      <SidebarHsAppItems />
      {renderSidebarFolders()}
      {renderSidebarFooter()}
    </SideNavigation>
  )
})
