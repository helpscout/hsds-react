import React from 'react'
import PropTypes from 'prop-types'

import { replaceMessageVariables } from '../utils/MessageCard.utils'

import { BodyUI } from '../MessageCard.styles'

export const MessageCardBody = ({ body, onClick, variables }) => {
  const getBodyToRender = () => {
    // if there is no html in the string, transform new line to paragraph
    if (body && !/<\/?[a-z][\s\S]*>/i.test(body)) {
      return body.split('\n').join('<br>')
    }
    return body
  }

  const bodyToRender = replaceMessageVariables(getBodyToRender(), variables)

  return bodyToRender ? (
    <BodyUI onClick={onClick} data-cy="beacon-message-body-content">
      <div dangerouslySetInnerHTML={{ __html: bodyToRender }} />
    </BodyUI>
  ) : null
}

MessageCardBody.propTypes = {
  /** Body content */
  body: PropTypes.string,
  /** Callback when body clicked */
  onClick: PropTypes.func,
  /** List of variables that can be highlighted inside Body */
  variables: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      display: PropTypes.string,
    })
  ),
}

function noop() {}

MessageCardBody.defaultProps = {
  onClick: noop,
}
