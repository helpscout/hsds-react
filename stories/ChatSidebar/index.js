import React, {PureComponent as Component} from 'react'
import { storiesOf } from '@storybook/react'
import {
  AvatarList,
  Button,
  ChatInbox,
  ChatList,
  ChatSidebar,
  Flexy
} from '../../src/index.js'
import AvatarSpec from '../Avatar/specs/Avatar'

const stories = storiesOf('ChatSidebar', module)

class SampleComponent extends Component {
  constructor () {
    super()
    this.state = { hasNewMessage: true }
    this.handleOnAddBloop = this.handleOnAddBloop.bind(this)
    this.handleOnBloopClose = this.handleOnBloopClose.bind(this)
  }

  handleOnAddBloop () {
    this.setState({ hasNewMessage: true })
  }

  handleOnBloopClose () {
    this.setState({ hasNewMessage: false })
  }

  render () {
    const { hasNewMessage } = this.state
    const handleOnAddBloop = this.handleOnAddBloop
    const handleOnBloopClose = this.handleOnBloopClose
    const sidebarMarkup = (
      <div style={{width: 300, height: '100vh'}}>
        <ChatSidebar
          hasNewMessage={hasNewMessage}
          onBloopClose={handleOnBloopClose}
        >
          <ChatInbox>
            <ChatInbox.Header
              avatars={
                <AvatarList avatars={AvatarSpec.generate(4)} max={3} />
              }
              count={1}
            >
              Chats
            </ChatInbox.Header>
            <ChatInbox.Content>
              <ChatList>
                <ChatList.Item />
                <ChatList.Item />
                <ChatList.Item />
                <ChatList.Item />
                <ChatList.Item />
                <ChatList.Item />
              </ChatList>
            </ChatInbox.Content>
          </ChatInbox>

          <ChatInbox isCollapsible>
            <ChatInbox.Header
              avatars={
                <AvatarList avatars={AvatarSpec.generate(4)} max={3} />
              }
              count={2}
            >
              Assigned
            </ChatInbox.Header>
            <ChatInbox.Content>
              <ChatList>
                <ChatList.Item />
                <ChatList.Item />
                <ChatList.Item />
                <ChatList.Item />
                <ChatList.Item />
                <ChatList.Item />
                <ChatList.Item />
              </ChatList>
            </ChatInbox.Content>
          </ChatInbox>
        </ChatSidebar>
      </div>
    )
    return (
      <Flexy align='top'>
        <Flexy.Item>
          {sidebarMarkup}
        </Flexy.Item>
        <Flexy.Block>
          <Button onClick={handleOnAddBloop}>Add New Message</Button>
        </Flexy.Block>
      </Flexy>
    )
  }
}

stories.add('default', () => (
  <SampleComponent />
))
