import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs'
import { Avatar, Message } from '../../src/index.js'

const stories = storiesOf('Message', module)
stories.addDecorator(withKnobs)

const dimensions = { width: 800, height: 500 }
const imageUrlSlow = `https://loremflickr.com/${dimensions.width}/${
  dimensions.height
}`

const imageUrl =
  'https://img.buzzfeed.com/buzzfeed-static/static/2014-12/5/11/enhanced/webdr06/longform-original-7538-1417798667-22.jpg?downsize=715:*&output-format=auto&output-quality=auto'

const onMediaLoad = event => console.log(event.target)

const defaultProps = {
  className: '',
  errorMessage: `Couldn't send.`,
  openMediaInModal: true,
  maxHeight: 250,
  maxWidth: 350,
  modalAnimationDuration: 250,
  modalAnimationEasing: 'ease',
  overlayAnimationDuration: 250,
  modalAnimationSequence: 'fade up',
  showErrorTryAgainLink: true,
  tryAgainLabel: 'Try again',
  isUploading: false,
}

stories.add('Media', () => {
  const {
    error,
    modalAnimationDuration,
    modalAnimationEasing,
    modalAnimationSequence,
    overlayAnimationDuration,
    isUploading,
    tryAgainLabel,
  } = defaultProps

  const props = {
    ...dimensions,
    caption: text('caption', 'image.jpg'),
    error: text('error', error),
    imageUrl: imageUrlSlow,
    modalAnimationDuration: number(
      'modalAnimationDuration',
      modalAnimationDuration
    ),
    modalAnimationEasing: text('modalAnimationEasing', modalAnimationEasing),
    modalAnimationSequence: text(
      'modalAnimationSequence',
      modalAnimationSequence
    ),
    overlayAnimationDuration: number(
      'overlayAnimationDuration',
      overlayAnimationDuration
    ),
    isUploading: boolean('isUploading', isUploading),
    tryAgainLabel: text('tryAgainLabel', tryAgainLabel),
  }

  return (
    <div>
      <Message to avatar={<Avatar name="Arctic Puffin" />}>
        <Message.Chat>Agent Chat</Message.Chat>
        <Message.Media {...props} />
      </Message>
    </div>
  )
})
