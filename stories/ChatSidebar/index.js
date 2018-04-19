import React, {PureComponent as Component} from 'react'
import { storiesOf } from '@storybook/react'
import {
  Avatar,
  AvatarList,
  Button,
  ChatInbox,
  ChatList,
  ChatSidebar,
  Flexy
} from '../../src/index.js'
import AvatarSpec from '../Avatar/specs/Avatar'
import ChatSpec from '../ChatList/specs/Chat'

ChatSpec.afterGenerate(({isTyping, ...rest}) => {
  return {
    ...rest,
    isTyping: false
  }
})

const avatars = AvatarSpec.generate(8)

const stories = storiesOf('ChatSidebar', module)

class SampleComponent extends Component {
  constructor () {
    super()
    this.state = {
      chats: [
        ChatSpec.generate(),
        ChatSpec.generate(),
        ChatSpec.generate(),
        ChatSpec.generate()
      ],
      isShowStatusBar: false
    }
    this.handleOnAddMessage = this.handleOnAddMessage.bind(this)
    this.handleOnHideStatusBar = this.handleOnHideStatusBar.bind(this)
  }

  handleOnAddMessage () {
    const { chats } = this.state
    this.setState({
      chats: [...chats, ChatSpec.generate()],
      isShowStatusBar: true
    })
  }

  handleOnHideStatusBar (value) {
    this.setState({
      isShowStatusBar: false
    })
  }

  render () {
    const {
      chats,
      isShowStatusBar
    } = this.state
    const handleOnAddMessage = this.handleOnAddMessage
    const handleOnHideStatusBar = this.handleOnHideStatusBar

    const messageMarkup = chats.map((item, index) => {
      const avatar = (
        <Avatar
          image={avatars[4].image}
          name={avatars[4].name}
          shape='rounded'
          size='xs'
        />
      )

      return (
        <ChatList.Item
          key={item.id}
          avatar={item.isAssigned ? avatar : null}
          isAssigned={item.isAssigned}
          isFocused={index === 2}
          isTyping={item.isTyping}
          isViewing={item.isViewing}
          isWaiting={item.isWaiting}
          message={item.message}
          name={item.name}
          newMessageCount={item.newMessageCount}
          tags={item.tags}
          timestamp={item.timestamp}
        />
      )
    })

    const newMessageCount = chats.length
    const avatarListMarkup = (
      <AvatarList max={3}>
        {avatars.map(({image, name}) => (
          <Avatar {...{image, name}} key='name' shape='rounded' size='xs' />
        ))}
      </AvatarList>
    )

    const sidebarMarkup = (
      <div style={{width: 300, height: '100vh'}}>
        <ChatSidebar
          newMessageCount={newMessageCount}
          onHideStatusBar={handleOnHideStatusBar}
          isShowStatusBar={isShowStatusBar}
        >
          <ChatInbox>
            <ChatInbox.Header count={chats.length}>
              Chats
            </ChatInbox.Header>
            <ChatInbox.Content>
              <ChatList>
                {messageMarkup}
              </ChatList>
            </ChatInbox.Content>
          </ChatInbox>

          <ChatInbox isCollapsible>
            <ChatInbox.Header
              avatars={avatarListMarkup}
              count={7}
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
          <Button onClick={handleOnAddMessage}>Add New Message</Button>
        </Flexy.Block>
      </Flexy>
    )
  }
}

stories.add('default', () => (
  <SampleComponent />
))
