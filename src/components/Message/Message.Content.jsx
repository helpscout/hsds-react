import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import PreviewCardContext from '../PreviewCard/PreviewCard.Context'
import classNames from 'classnames'
import { ContentUI } from './Message.Content.css'

const MessageContent = props => {
  const {
    children,
    className,
    from,
    isNote,
    ltr,
    read,
    rtl,
    timestamp,
    to,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-MessageContent',
    isNote && 'is-note',
    className
  )

  const innerComponentClassName = classNames(
    'c-MessageContent__content',
    from && 'is-from',
    isNote && 'is-note',
    ltr && !rtl && 'is-ltr',
    !ltr && rtl && 'is-rtl',
    to && 'is-to'
  )

  const chatProps = {
    from,
    ltr,
    read,
    rtl,
    timestamp,
    to,
  }

  const contextProps = {
    isNote,
  }

  return (
    <ContentUI {...chatProps} className={componentClassName}>
      <PreviewCardContext.Provider value={contextProps}>
        <div {...getValidProps(rest)} className={innerComponentClassName}>
          {children}
        </div>
      </PreviewCardContext.Provider>
    </ContentUI>
  )
}

MessageContent.defaultProps = {
  'data-cy': 'MessageContent',
}

MessageContent.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Provides author information and applies "From" styles. */
  from: PropTypes.any,
  /** Applies the "Note" theme styles. */
  isNote: PropTypes.bool,
  /** Applies left-to-right text styles. */
  ltr: PropTypes.bool,
  /** Determines if the Message is read. */
  read: PropTypes.bool,
  /** Applies right-to-left text styles. */
  rtl: PropTypes.bool,
  /** Timestamp for the Message. */
  timestamp: PropTypes.string,
  /** Provides author information and applies "To" styles. */
  to: PropTypes.any,
  /** Callback when clicked. */
  onClick: PropTypes.func,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default MessageContent
