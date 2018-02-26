import React from 'react'
import { storiesOf } from '@storybook/react'
import {Avatar, Message} from '../../src/index.js'

const stories = storiesOf('EmbedChat', module)

stories.add('default', () => {
  return (
    <div style={{background: '#f9fafa', width: 330, padding: 10}}>
      <Message.Provider theme='embed'>
        <Message
          from
          avatar={
            <Avatar
              borderColor='#f9fafa'
              name='Help Bot'
            />
          }
        >
          <Message.Chat>
            Write your question here, and I'll find a human to answer!
          </Message.Chat>
        </Message>

        <Message
          to
        >
          <Message.Chat>
            Can I get an extension?
          </Message.Chat>
        </Message>

        <Message>
          <Message.Action>
            Buddy left the North Pole.
          </Message.Action>
        </Message>

        <Message
          from
          avatar={
            <Avatar
              borderColor='#f9fafa'
              name='Arctic Puffin'
            />
          }
        >
          <Message.Chat>
            Hey!
          </Message.Chat>
          <Message.Chat>
            Yeah of course! I've gone and added that to your account.
          </Message.Chat>
        </Message>
      </Message.Provider>
    </div>
  )
})
