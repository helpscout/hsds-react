import React from 'react'
import { storiesOf } from '@storybook/react'
import { SideNavigation, Flexy, Heading } from '../src/index.js'
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
