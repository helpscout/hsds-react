import React from 'react'
import PropTypes from 'prop-types'
import Image from '../Image'
import Modal from '../Modal'
import Text from '../Text'
import Chat from './Chat'
import classNames from '../../utilities/classNames'
import { bubbleTypes } from './propTypes'

export const propTypes = Object.assign({}, bubbleTypes, {
  caption: PropTypes.string,
  imageUrl: PropTypes.string
})

const Media = props => {
  const {
    children,
    className,
    caption,
    from,
    imageUrl,
    isNote,
    ltr,
    primary,
    read,
    rtl,
    size,
    timestamp,
    title,
    to,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-MessageMedia',
    className
  )

  const captionMarkup = caption ? (
    <div className='c-MessageMedia__caption'>
      <Text muted size='13'>{caption}</Text>
    </div>
  ) : null

  const mediaMarkup = imageUrl ? (
    <Image
      block
      className='c-MessageMedia__media'
      src={imageUrl}
      shape='rounded'
    />
  ) : null

  const mediaContainerMarkup = imageUrl ? (
    <div className='c-MessageMedia__media-container'>
      <Modal trigger={mediaMarkup} scrollFade={false}>
        <Modal.Content>
          <div>
            {mediaMarkup}
          </div>
          {captionMarkup}
        </Modal.Content>
      </Modal>
    </div>
  ) : null

  return (
    <Chat
      className={componentClassName}
      from={from}
      isNote={isNote}
      ltr={ltr}
      primary={primary}
      read={read}
      rtl={rtl}
      size='sm'
      timestamp={timestamp}
      title={title}
      to={to}
      {...rest}
    >
      {mediaContainerMarkup}
      {captionMarkup}
    </Chat>
  )
}

Media.propTypes = propTypes

export default Media
