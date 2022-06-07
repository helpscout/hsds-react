import React from 'react'
import { createSpec, faker } from '@hsds/helix'
import { Avatar, ChatScroller, Message, Scrollable } from '../index'

const MessageSpec = createSpec({
  id: faker.datatype.uuid(),
  message: faker.lorem.sentence(),
})

export const Default = () => {
  class Chat extends React.Component {
    state = {
      messages: MessageSpec.generate(5),
      isTyping: false,
    }

    addMessage = () => {
      this.setState({
        messages: [...this.state.messages, MessageSpec.generate()],
      })
    }

    toggleTyping = () => {
      this.setState({
        isTyping: !this.state.isTyping,
      })
    }

    render() {
      return (
        <div>
          <button onClick={this.addMessage}>Add Message</button>
          <button onClick={this.toggleTyping}>Toggle Typing</button>
          <div style={{ width: 320, height: 300 }}>
            <ChatScroller
              messages={this.state.messages}
              isTyping={this.state.isTyping}
            >
              <div style={{ display: 'flex', height: '100%', width: '100%' }}>
                <Scrollable>
                  <div style={{ padding: '0 15px' }}>
                    <Message from avatar={<Avatar name="Arctic Puffin" />}>
                      {this.state.messages.map(props => (
                        <Message.Chat key={props.id}>
                          {props.message}
                        </Message.Chat>
                      ))}
                    </Message>
                    {this.state.isTyping && <Message.Chat typing />}
                  </div>
                </Scrollable>
              </div>
            </ChatScroller>
          </div>
        </div>
      )
    }
  }

  return (
    <div style={{ width: 400, height: 400 }}>
      <Chat />
    </div>
  )
}
