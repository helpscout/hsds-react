import PropTypes from 'prop-types'
import { ContentUI } from '../MessageCard.css'
import React from 'react'

export const MessageCardContent = ({ children, withMargin, render }) => {
  if (!render) {
    return null
  }
  return <ContentUI withMargin={withMargin}>{children}</ContentUI>
}

MessageCardContent.propTypes = {
  children: PropTypes.any,
  /** Indicates if should add margin to the top */
  withMargin: PropTypes.bool,
  /** Indicates if should render the content at all */
  render: PropTypes.bool,
}
