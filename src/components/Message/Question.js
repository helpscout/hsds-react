// @flow
import React from 'react'
import Chat from './Chat'

type Props = {
  primary?: boolean,
  title?: string,
}

const Question = (props: Props) => {
  const { primary, title, ...rest } = props

  return <Chat primary title="Question:" {...rest} />
}

Question.displayName = 'Message.Question'

export default Question
