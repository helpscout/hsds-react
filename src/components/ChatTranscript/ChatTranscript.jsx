import React from 'react'
import PropTypes from 'prop-types'
import Item from './ChatTranscript.Item'
import { classNames } from '../../utilities/classNames'

class ChatTranscript extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  }

  static Item = Item

  render() {
    const { children, className, ...rest } = this.props

    const componentClassName = classNames('c-ChatTranscript', className)

    return (
      <div className={componentClassName} {...rest}>
        {children}
      </div>
    )
  }
}

export default ChatTranscript
