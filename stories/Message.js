import React from 'react'
import { storiesOf } from '@storybook/react'
import { Message } from '../src/index.js'

storiesOf('Message', module)
  .add('default', () => (
    <Message>
      <Message.Chat>
        Hi there
      </Message.Chat>
      <Message.Chat>
        :wave:
      </Message.Chat>
      <Message.Chat>
        This is a thing
      </Message.Chat>
    </Message>
  ))
