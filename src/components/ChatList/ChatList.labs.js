import React from 'react'
import { storiesOf } from '@storybook/react'
import ChatSpec from '../../utilities/specs/chat.specs'
import AvatarSpec from '../../utilities/specs/avatar.specs'
import { Avatar, ChatList, List, Button } from '../index'

const stories = storiesOf('PhaseOut/ChatList', module)
const avatars = AvatarSpec.generate(8)

const getItemMarkup = () => {
  const fixtures = ChatSpec.generate(8)
  const values = Object.values(fixtures).filter(i => !!i)
  return values.map((item, index) => {
    const avatar = (
      <Avatar
        image={avatars[4].image}
        name={avatars[4].name}
        size="xs"
        shape="rounded"
      />
    )

    return (
      <ChatList.Item
        avatar={item.isAssigned ? avatar : null}
        key={item.id}
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
}

stories.add('default', () => {
  const itemMarkup = getItemMarkup()
  return (
    <div style={{ width: 300 }}>
      <ChatList>{itemMarkup}</ChatList>
    </div>
  )
})

class ChatListItemStateExample extends React.Component {
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

stories.add('item: states', () => (
  <div style={{ width: 300 }}>
    <ChatListItemStateExample />
  </div>
))
