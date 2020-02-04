import React from 'react'
import { storiesOf } from '@storybook/react'
import { Avatar, Message } from '../../index'

const stories = storiesOf('Message', module)
const dimensions = { width: 800, height: 500 }
const imageUrlSlow = `https://loremflickr.com/${dimensions.width}/${dimensions.height}`
const imageUrl =
  'https://img.buzzfeed.com/buzzfeed-static/static/2014-12/5/11/enhanced/webdr06/longform-original-7538-1417798667-22.jpg?downsize=715:*&output-format=auto&output-quality=auto'
const onMediaLoad = event => console.log(event.target)

stories.add('Media', () => (
  <Message.Provider theme="embed">
    <Message from avatar={<Avatar name="Arctic Puffin" />}>
      <Message.Chat>Hey Buddy!</Message.Chat>
      <Message.Media
        imageUrl={imageUrl}
        caption="image.jpg"
        onMediaLoad={onMediaLoad}
      />
    </Message>

    <Message to avatar={<Avatar name="Arctic Puffin" />}>
      <Message.Media imageUrl={imageUrl} caption="image.jpg" />
    </Message>
  </Message.Provider>
))

const onErrorTryAgainClick = () => console.log('Try again!')

stories.add('Media image:large', () => {
  const imageProps = {
    ...dimensions,
    imageUrl: imageUrlSlow,
  }
  return (
    <div>
      <Message to avatar={<Avatar name="Arctic Puffin" />}>
        <Message.Chat>Agent Chat</Message.Chat>
        <Message.Media {...imageProps} />
        <Message.Media {...imageProps} caption="image.jpg" />
        <Message.Media
          {...imageProps}
          caption="image.jpg"
          error
          onErrorTryAgainClick={onErrorTryAgainClick}
        />
      </Message>

      <Message to avatar={<Avatar name="Arctic Puffin" />}>
        <Message.Media {...imageProps} caption="image.jpg" isNote />
        <Message.Media
          {...imageProps}
          caption="image.jpg"
          error
          onErrorTryAgainClick={onErrorTryAgainClick}
          isNote
        />
        <Message.Media
          {...imageProps}
          caption="image.jpg"
          error
          onErrorTryAgainClick={onErrorTryAgainClick}
          isNote
          isUploading
        />
      </Message>

      <Message from avatar={<Avatar name="Arctic Puffin" />}>
        <Message.Media imageUrl={imageUrl} caption="image.jpg" />
      </Message>
    </div>
  )
})

stories.add('Media image:left-right', () => {
  const imageProps = {
    ...dimensions,
    imageUrl: imageUrlSlow,
  }
  return (
    <div>
      <Message to avatar={<Avatar name="Arctic Puffin" />}>
        <Message.Chat>Agent Chat</Message.Chat>
        <Message.Media {...imageProps} caption="image.jpg" />
      </Message>

      <Message from avatar={<Avatar name="Arctic Puffin" />}>
        <Message.Media {...imageProps} caption="image.jpg" />
      </Message>

      <Message to avatar={<Avatar name="Arctic Puffin" />}>
        <Message.Chat>Another message</Message.Chat>
      </Message>

      <Message from avatar={<Avatar name="Arctic Puffin" />}>
        <Message.Media {...imageProps} caption="image.jpg" />
        <Message.Chat>Follow-up message</Message.Chat>
      </Message>

      <Message to avatar={<Avatar name="Arctic Puffin" />}>
        <Message.Chat isNote>First message</Message.Chat>
        <Message.Media {...imageProps} caption="image.jpg" isNote />
        <Message.Chat isNote>Second message</Message.Chat>
      </Message>

      <Message to avatar={<Avatar name="Arctic Puffin" />}>
        <Message.Media {...imageProps} caption="image.jpg" />
      </Message>
    </div>
  )
})

stories.add('Media consecutive', () => {
  const imageProps = {
    ...dimensions,
    imageUrl: imageUrlSlow,
  }
  return (
    <div>
      <Message to avatar={<Avatar name="Arctic Puffin" />}>
        <Message.Chat>Agent Chat</Message.Chat>
        <Message.Media {...imageProps} caption="image.jpg" />
        <Message.Media {...imageProps} caption="image.jpg" />
        <Message.Media {...imageProps} caption="image.jpg" />
        <Message.Media {...imageProps} caption="image.jpg" />
      </Message>
    </div>
  )
})

stories.add('Media states', () => (
  <Message.Provider theme="embed">
    <Message from avatar={<Avatar name="Arctic Puffin" />}>
      <Message.Chat>Error</Message.Chat>
      <Message.Media caption="image.jpg" error imageUrl={imageUrl} />
      <Message.Chat>Uploading</Message.Chat>
      <Message.Media caption="image.jpg" isUploading imageUrl={imageUrl} />
    </Message>
  </Message.Provider>
))
