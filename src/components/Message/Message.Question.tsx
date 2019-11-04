import * as React from 'react'
import Chat from './Message.Chat'

type Props = {
  primary?: boolean
  title?: string
}

const Question = (props: Props) => {
  const { primary, title, ...rest } = props

  return <Chat primary title="Question:" {...rest} />
}

export default Question
