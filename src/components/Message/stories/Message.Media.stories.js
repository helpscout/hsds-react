import React from 'react'
import { boolean, number, text } from '@storybook/addon-knobs'
import { Avatar, Message } from '../../index'

export default {
  component: Message,
  title: 'Components/Conversation/Message (Chat)',
}
const dimensions = { width: 800, height: 500 }
const imageUrlSlow = `https://loremflickr.com/${dimensions.width}/${dimensions.height}`
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

export const _Media = () => {
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
}
