import React from 'react'
import { storiesOf } from '@storybook/react'
import { SideNavigation, Flexy, Heading, Icon } from '../src/index.js'
import Dropdown from '../src/components/Dropdown/DropdownV2'
import { SideNavigationHeaderUI } from '../src/components/SideNavigation/SideNavigation.css'
import { ItemSpec } from './DropdownV2.stories'

import styled from '../src/components/styled'
import { render } from 'enzyme'

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

class SidebarDefaultItems extends React.PureComponent {
  state = {
    active: 'chat',
  }

  updateActiveItem(itemName) {
    console.log(itemName)
    this.setState({ active: itemName })
  }

  render() {
    const { active } = this.state
    return (
      <SideNavigation.Section>
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

stories.add('with multiple section', () => (
  <SideNavigation>
    <SideNavigation.Header label="Help Scout" />
    <SidebarDefaultItems />
    <SideNavigation.Section>
      <SideNavigation.Item label="Folder" />
    </SideNavigation.Section>
  </SideNavigation>
))

stories.add('with titled section', () => (
  <SideNavigation>
    <SideNavigation.Header label="Help Scout" />
    <SidebarDefaultItems />
    <SideNavigation.Section title="Folders">
      <SideNavigation.Item>Folder 1</SideNavigation.Item>
      <SideNavigation.Item>Folder 2</SideNavigation.Item>
      <SideNavigation.Item>Folder 3</SideNavigation.Item>
      <SideNavigation.Item>Folder 4</SideNavigation.Item>
    </SideNavigation.Section>
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
