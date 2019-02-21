import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs'

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
      <SideNavigation.Item>Folder 1</SideNavigation.Item>
      <SideNavigation.Item>Folder 2</SideNavigation.Item>
      <SideNavigation.Item>Folder 3</SideNavigation.Item>
      <SideNavigation.Item>Folder 4</SideNavigation.Item>
    </SideNavigation.Section>
  )
}

const footerItems = ItemSpec.generate(3)

const renderSidebarFooter = isFloating => {
  return (
    <SideNavigation.Footer>
      <Dropdown
        items={footerItems}
        renderTrigger={
          <SideNavigation.Button
            icon={
              <Icon
                name="workflow"
                offsetLeft={false}
                withCaret={!isFloating}
              />
            }
          >
            Edit Mailbox
          </SideNavigation.Button>
        }
      />
      <SideNavigation.Button icon={<Icon name="image-add" />}>
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
  state = {
    isCollapsed: true,
  }

  handleMouseOver = () => {
    this.setState({ isCollapsed: false })
  }
  handleMouseOut = () => {
    this.setState({ isCollapsed: true })
  }

  render() {
    const { badge, headerLabel } = this.props

    return (
      <SideNavigation
        collapsed={this.state.isCollapsed}
        onMouseEnter={this.handleMouseOver}
        onMouseLeave={this.handleMouseOut}
      >
        <SideNavigation.Header label={headerLabel} badge={badge} />
        <SidebarDefaultItems />
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
            <SidebarDefaultItems />
            {renderSidebarFolders()}
            {renderSidebarFooter(true)}
          </SideNavigationFloatingUI>
        )}
      </div>
    )
  }
}

class SidebarDefaultItems extends React.PureComponent {
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
          count={10}
          active={active === 'chat'}
          onClick={e => this.updateActiveItem('chat')}
        >
          Chat
        </SideNavigation.Item>
        <SideNavigation.Item
          icon={<Icon name="tag" />}
          active={active === 'unassigned'}
          onClick={e => this.updateActiveItem('unassigned')}
        >
          Unassigned
        </SideNavigation.Item>
        <SideNavigation.Item
          icon={<Icon name="user" />}
          active={active === 'mine'}
          onClick={e => this.updateActiveItem('mine')}
        >
          Mine
        </SideNavigation.Item>
        <SideNavigation.Item
          icon={<Icon name="document" />}
          active={active === 'document'}
          onClick={e => this.updateActiveItem('document')}
        >
          Draft
        </SideNavigation.Item>
        <SideNavigation.Item
          muted={true}
          active={active === 'muted'}
          onClick={e => this.updateActiveItem('muted')}
        >
          Muted
        </SideNavigation.Item>
        <SideNavigation.Item disabled={true}>Disabled</SideNavigation.Item>
      </SideNavigation.Section>
    )
  }
}

const stories = storiesOf('SideNavigation', module)
stories.addDecorator(withKnobs)
stories.addDecorator(storyFn => <SidebarWrapper>{storyFn()}</SidebarWrapper>)

stories.add('empty', () => <SideNavigation />)

stories.add('with header', () => (
  <SideNavigation>
    <SideNavigation.Header label="Help Scout" />
    <SidebarDefaultItems />
  </SideNavigation>
))

stories.add('with linkable header', () => (
  <SideNavigation>
    <SideNavigation.Header href="https://duckduckgo.com/" label="Link" />
    <SidebarDefaultItems />
  </SideNavigation>
))

stories.add('with dropdown header', () => {
  const items = ItemSpec.generate(3)
  return (
    <SideNavigation>
      <SideNavigation.Header>
        <Dropdown
          items={items}
          renderTrigger={<Heading size="h3">Dropdown </Heading>}
        />
      </SideNavigation.Header>
      <SidebarDefaultItems />
    </SideNavigation>
  )
})

stories.add('with long list dropdown', () => {
  const items = ItemSpec.generate(25)
  return (
    <SideNavigation>
      <SideNavigation.Header>
        <AutoDropdown
          items={items}
          renderTrigger={<Heading size="h3">Dropdown </Heading>}
        />
      </SideNavigation.Header>
      <SidebarDefaultItems />
    </SideNavigation>
  )
})

stories.add('with custom width', () => (
  <SideNavigation width={200}>
    <SideNavigation.Header label="Help Scout" />
    <SidebarDefaultItems />
  </SideNavigation>
))

stories.add('with multiple section', () => (
  <SideNavigation>
    <SideNavigation.Header label="Help Scout" />
    <SidebarDefaultItems />
    {renderSidebarFolders()}
    <SideNavigation.Section>
      <SideNavigation.Item>Teams</SideNavigation.Item>
    </SideNavigation.Section>
  </SideNavigation>
))

stories.add('with regular button', () => (
  <SideNavigation>
    <SideNavigation.Header label="Help Scout" />
    <SidebarDefaultItems />
    <SideNavigation.Section withPadding={true}>
      <Button version={2} kind="secondary">
        Open mailbox
      </Button>
    </SideNavigation.Section>
  </SideNavigation>
))

stories.add('with titled section', () => (
  <SideNavigation>
    <SideNavigation.Header label="Help Scout" />
    <SidebarDefaultItems />
    {renderSidebarFolders()}
  </SideNavigation>
))

stories.add('with linkable items', () => (
  <SideNavigation>
    <SideNavigation.Header label="Help Scout" />
    <SidebarDefaultItems />
    <SideNavigation.Section title="Linkable">
      <SideNavigation.Item href="https://duckduckgo.com/">
        Link 1
      </SideNavigation.Item>
      <SideNavigation.Item href="https://google.com/">
        Link 2
      </SideNavigation.Item>
    </SideNavigation.Section>
  </SideNavigation>
))

stories.add('with footer', () => {
  return (
    <SideNavigation>
      <SideNavigation.Header label="Help Scout" />
      <SidebarDefaultItems />
      {renderSidebarFolders()}
      {renderSidebarFooter()}
    </SideNavigation>
  )
})

stories.add('is collapsed', () => {
  const badge = text('badgeLabel')
  const headerLabel = text('headerLabel', 'Help Scout')
  return <SidebarCollapsed badge={badge} headerLabel={headerLabel} />
})

stories.add('is floating', () => {
  return <SidebarFloatingMenu />
})
