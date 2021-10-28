import React from 'react'
import { UrlAttachmentImageUI } from '../MessageCard.css'
import PropTypes from 'prop-types'

function MessageCardUrlAttachmentImage({
  url,
  altText = 'Page preview image',
}) {
  if (!url) {
    return null
  }
  return (
    <UrlAttachmentImageUI>
      <img src={url} alt={altText} />
    </UrlAttachmentImageUI>
  )
}

MessageCardUrlAttachmentImage.propTypes = {
  /** URL of a Attachment preview image - component not rendered if not provided */
  url: PropTypes.string,
  /** Alt text for an image */
  altText: PropTypes.string,
}

export default MessageCardUrlAttachmentImage
