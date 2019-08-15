import * as React from 'react'

export interface Props {
  onSortEnd: function
}

export class MessageList extends React.Component<Props> {
  render() {
    return <div>list of things</div>
  }
}

export default MessageList
