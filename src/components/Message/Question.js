// @flow
import React from 'react'
import Chat from './Chat'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'

type Props = {
  primary?: boolean,
  title?: string,
}

const Question = (props: Props) => {
  const { primary, title, ...rest } = props

  return <Chat primary title="Question:" {...rest} />
}

namespaceComponent(COMPONENT_KEY.Question)(Question)

export default Question
