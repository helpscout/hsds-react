// @flow
import React, { PureComponent as Component } from 'react'
import Item from './Item'
import { classNames } from '../../utilities/classNames'

type Props = {
  className?: string,
  children?: any,
}

class ChatTranscript extends Component<Props> {
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
