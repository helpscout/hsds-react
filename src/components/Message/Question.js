import React from 'react'
import Chat from './Chat'

const Question = props => {
  const {
    primary,
    title,
    ...rest
  } = props

  return (
    <Chat primary title='Question:' {...rest} />
  )
}

export default Question
