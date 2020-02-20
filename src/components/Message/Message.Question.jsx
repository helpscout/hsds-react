import React from 'react'
import PropTypes from 'prop-types'
import Chat from './Message.Chat'

const Question = props => {
  const { primary, title, ...rest } = props

  return <Chat primary title="Question:" {...rest} />
}

Question.propTypes = {
  primary: PropTypes.bool,
  title: PropTypes.string,
}

Question.displayName = 'MessageQuestion'

export default Question
