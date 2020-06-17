import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Item from './ChatTranscript.Item'
import { classNames } from '../../utilities/classNames'

class ChatTranscript extends React.Component {
  static Item = Item

  render() {
    const { children, className, ...rest } = this.props

    const componentClassName = classNames('c-ChatTranscript', className)

    return (
      <div className={componentClassName} {...getValidProps(rest)}>
        {children}
      </div>
    )
  }
}

ChatTranscript.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

ChatTranscript.defaultProps = {
  'data-cy': 'ChatTranscript',
}

export default ChatTranscript
