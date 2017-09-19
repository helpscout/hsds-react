import React from 'react'
import { storiesOf } from '@storybook/react'
import { Avatar, Message } from '../src/index.js'

storiesOf('Message', module)
  .add('default', () => (
    <div>
      <Message from avatar={<Avatar name='Arctic Puffin' />}>
        <Message.Question read timestamp='9:41am'>
          How's it goin'?
        </Message.Question>
      </Message>
      <Message to>
        <Message.Action read timestamp='9:41am'>
          Buddy became upset. <a href='#'>Find out what happened</a>
        </Message.Action>
      </Message>
      <Message to avatar={<Avatar name='Buddy' />}>
        <Message.Chat read timestamp='9:41am'>
          :sob:
          <br />
          omgomgomg
          {1}
        </Message.Chat>
        <Message.Chat read timestamp='9:41am'>
          <strong>*Frantically running through North pole*</strong>
        </Message.Chat>
      </Message>

      <Message from avatar={<Avatar name='Arctic Puffin' />}>
        <Message.Chat read timestamp='9:41am'>
          Hey Buddy!
        </Message.Chat>
        <Message.Media imageUrl='https://img.buzzfeed.com/buzzfeed-static/static/2014-12/5/11/enhanced/webdr06/longform-original-7538-1417798667-22.jpg?downsize=715:*&output-format=auto&output-quality=auto' caption='image.jpg' timestamp='9:41am' read />
      </Message>

      <Message to avatar={<Avatar name='Buddy' />}>
        <Message.Chat read timestamp='9:41am'>
          <strong>*NOT NOW ARCTIC PUFFIN!*</strong>
        </Message.Chat>
      </Message>

      <Message from avatar={<Avatar name='Arctic Puffin' />}>
        <Message.Chat read timestamp='9:41am'>
          :sob:
        </Message.Chat>
      </Message>

      <Message to>
        <Message.Action read timestamp='9:41am'>
          Buddy left the North Pole.
        </Message.Action>
      </Message>
    </div>
  ))
