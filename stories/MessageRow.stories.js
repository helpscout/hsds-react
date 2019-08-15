import React from 'react'
import { storiesOf } from '@storybook/react'
import Accordion from '../src/components/Accordion'
import MessageRow from '../src/components/MessageRow'
import {
  withKnobs,
  boolean,
  number,
  text,
  select,
} from '@storybook/addon-knobs'
import { withArtboard } from '@helpscout/artboard'

const stories = storiesOf('MessageRow', module)

stories.add('Default', () => {
  const messageName = text('messageName', '"Link Row One"')
  const isError = boolean('isError', false)
  const isPaused = boolean('isPaused', true)
  const errorMessage = text(
    'errorMessage',
    'Message paused because of an issue'
  )

  const props = {
    errorMessage,
    name: messageName,
    isError,
    isPaused,
    to: '/',
  }

  const messageTwoName = text('messageTwoName', 'Link Row Two')

  return (
    <Accordion isSeamless>
      <MessageRow {...props} />
      <MessageRow name={messageTwoName} to="/" />
    </Accordion>
  )
})
