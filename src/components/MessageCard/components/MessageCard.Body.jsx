import { BodyUI } from '../MessageCard.css'
import React from 'react'
import PropTypes from 'prop-types'
import { noop } from '../../../utilities/other'

export const MessageCardBody = ({ withMargin, body, onClick }) => {
  const getBodyToRender = () => {
    // if there is no html in the string, transform new line to paragraph
    if (body && !/<\/?[a-z][\s\S]*>/i.test(body)) {
      return body.split('\n').join('<br>')
    }
    return body
  }

  const bodyToRender = getBodyToRender()

  return bodyToRender ? (
    <BodyUI
      onClick={onClick}
      withMargin={withMargin}
      data-cy="beacon-message-body-content"
    >
      <div dangerouslySetInnerHTML={{ __html: bodyToRender }} />
    </BodyUI>
  ) : null
}

MessageCardBody.propTypes = {
  /** Body content */
  body: PropTypes.string,
  /** Indicate if should add margin above the body */
  withMargin: PropTypes.string,
  /** Callback when body clicked */
  onClick: PropTypes.func,
}

MessageCardBody.defaultProps = {
  onClick: noop,
}
