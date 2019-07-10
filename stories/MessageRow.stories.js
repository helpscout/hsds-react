import React from 'react'
import { storiesOf } from '@storybook/react'
import Accordion from '../src/components/Accordion'
import GreeterRow from '../src/components/GreeterRow'
import Page from '../src/components/Page'
import {
  withKnobs,
  boolean,
  number,
  text,
  select,
} from '@storybook/addon-knobs'
import { withArtboard } from '@helpscout/artboard'

const stories = storiesOf('GreeterRow', module)

stories.add('Default', () => {
  const greeterName = text('greeterName', '"Link Row One"')
  const isError = boolean('isError', false)
  const isPaused = boolean('isPaused', true)
  const errorMessage = text(
    'errorMessage',
    'Greeter paused because of an issue'
  )

  const props = {
    errorMessage,
    name: greeterName,
    isError,
    isPaused,
    to: '/',
  }

  const greeterTwoName = text('greeterTwoName', 'Link Row Two')

  return (
    <Page>
      <Page.Card>
        <Accordion isSeamless>
          <GreeterRow {...props} />
          <GreeterRow name={greeterTwoName} to="/" />
        </Accordion>
      </Page.Card>
    </Page>
  )
})
