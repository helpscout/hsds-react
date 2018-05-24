import React, { PureComponent as Component } from 'react'
import { Avatar, ChatList, List, Button } from '../../src/index.js'
import AvatarSpec from '../Avatar/specs/Avatar'
import ChatSpec from './specs/Chat'

class ChatListItemStateExample extends Component {
  constructor() {
    super()
    this.state = {
      ...ChatSpec.generate(),
      avatar: undefined,
      name: 'This is a super long name',
      isAssigned: false,
      isTyping: false,
      isFocused: false,
      isWaiting: false,
      isViewing: false,
      newMessageCount: 0,
    }
    this.toggleAssigned = this.toggleAssigned.bind(this)
    this.toggleCount = this.toggleCount.bind(this)
    this.toggleFocused = this.toggleFocused.bind(this)
    this.toggleTyping = this.toggleTyping.bind(this)
    this.toggleViewing = this.toggleViewing.bind(this)
    this.toggleWaiting = this.toggleWaiting.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick() {
    if (this.state.isFocused) {
      this.setState({
        newMessageCount: 0,
      })
    }
  }

  toggleAssigned() {
    const avatarFixture = AvatarSpec.generate()
    const avatar = (
      <Avatar
        image={avatarFixture.image}
        name={avatarFixture.name}
        size="xs"
        shape="rounded"
      />
    )
    this.setState({
      isAssigned: !this.state.isAssigned,
      avatar: this.state.avatar ? undefined : avatar,
    })
  }

  toggleCount() {
    this.setState({
      newMessageCount: this.state.newMessageCount ? 0 : 3,
    })
  }

  toggleFocused() {
    this.setState({
      isFocused: !this.state.isFocused,
    })
  }

  toggleTyping() {
    this.setState({
      isTyping: !this.state.isTyping,
    })
  }

  toggleViewing() {
    this.setState({
      isViewing: !this.state.isViewing,
    })
  }

  toggleWaiting() {
    this.setState({
      isWaiting: !this.state.isWaiting,
    })
  }

  render() {
    const item = this.state
    const handleOnClick = this.handleOnClick
    const toggleAssigned = this.toggleAssigned
    const toggleCount = this.toggleCount
    const toggleFocused = this.toggleFocused
    const toggleTyping = this.toggleTyping
    const toggleViewing = this.toggleViewing
    const toggleWaiting = this.toggleWaiting

    return (
      <div>
        <ChatList.Item
          avatar={item.avatar}
          isAssigned={item.isAssigned}
          isFocused={item.isFocused}
          isTyping={item.isTyping}
          isViewing={item.isViewing}
          isWaiting={item.isWaiting}
          onClick={handleOnClick}
          message={item.message}
          name={item.name}
          newMessageCount={item.newMessageCount}
          tags={item.tags}
          timestamp={item.timestamp}
        />
        <br />
        <List>
          <List.Item>
            <Button onClick={toggleAssigned}>Toggle Assigned</Button>
          </List.Item>
          <List.Item>
            <Button onClick={toggleCount}>Toggle Count</Button>
          </List.Item>
          <List.Item>
            <Button onClick={toggleFocused}>Toggle Focused</Button>
          </List.Item>
          <List.Item>
            <Button onClick={toggleTyping}>Toggle Typing</Button>
          </List.Item>
          <List.Item>
            <Button onClick={toggleViewing}>Toggle Viewing</Button>
          </List.Item>
          <List.Item>
            <Button onClick={toggleWaiting}>Toggle Waiting</Button>
          </List.Item>
        </List>
      </div>
    )
  }
}

export default ChatListItemStateExample
