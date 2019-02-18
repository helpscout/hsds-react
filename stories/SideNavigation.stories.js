import React from 'react'
import { storiesOf } from '@storybook/react'
import { SideNavigation, Flexy, Heading } from '../src/index.js'
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

const stories = storiesOf('SideNavigation', module)
stories.addDecorator(storyFn => <SidebarWrapper>{storyFn()}</SidebarWrapper>)

stories.add('default', () => <SideNavigation />)

stories.add('with header', () => (
  <SideNavigation>
    <SideNavigation.Header label="Help Scout" />
  </SideNavigation>
))

stories.add('with linkable header', () => (
  <SideNavigation>
    <SideNavigation.Header href="https://duckduckgo.com/" label="Link" />
  </SideNavigation>
))

stories.add('with dropdown header', () => {
  const items = ItemSpec.generate(3)
  return (
    <SideNavigation>
      <SideNavigation.Header>
        <Dropdown
          items={items}
          renderTrigger={<Heading size="h3">Dropdown</Heading>}
        />
      </SideNavigation.Header>
      test
    </SideNavigation>
  )
})
