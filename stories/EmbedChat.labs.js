import React from 'react'
import { storiesOf } from '@storybook/react'
import { Avatar, Message } from '../src/index'

const stories = storiesOf('EmbedChat', module)

stories.add('default', () => {
  return (
    <div style={{ background: '#f9fafa', width: 330, padding: '20px 17px' }}>
      <Message.Provider theme="embed">
        <Message
          from="Help Bot"
          avatar={
            <Avatar
              name="Help Bot"
              image="https://img.buzzfeed.com/buzzfeed-static/static/2014-12/5/11/enhanced/webdr06/longform-original-7538-1417798667-22.jpg?downsize=715:*&output-format=auto&output-quality=auto"
            />
          }
        >
          <Message.Chat>
            Write your question here, and I'll find a human to answer!
          </Message.Chat>
        </Message>

        <Message to>
          <Message.Chat>Can I get an extension?</Message.Chat>
          <Message.Media
            imageUrl="https://img.buzzfeed.com/buzzfeed-static/static/2014-12/5/11/enhanced/webdr06/longform-original-7538-1417798667-22.jpg?downsize=715:*&output-format=auto&output-quality=auto"
            caption="image.jpg"
          />
          <Message.Chat>Can I get an extension?</Message.Chat>
        </Message>

        <Message>
          <Message.Action>Buddy left the North Pole.</Message.Action>
        </Message>

        <Message from="Help Bot" avatar={<Avatar name="Arctic Puffin" />}>
          <Message.Chat>Hey!</Message.Chat>
          <Message.Chat>
            Yeah of course! I've gone and added that to your account.
          </Message.Chat>
          <Message.Attachment
            filename="puffin.png"
            url="https://img.buzzfeed.com/buzzfeed-static/static/2014-12/5/11/enhanced/webdr06/longform-original-7538-1417798667-22.jpg?downsize=715:*&output-format=auto&output-quality=auto"
          />
        </Message>
      </Message.Provider>
    </div>
  )
})
