import * as React from 'react'
import Item from './ChatTranscript.Item'
import { classNames } from '../../utilities/classNames'

type Props = {
  className?: string
  children?: any
}

class ChatTranscript extends React.Component<Props> {
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
