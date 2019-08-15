import React from 'react'
import { storiesOf } from '@storybook/react'
import MessageList from '../src/components/MessageList'
import Page from '../src/components/Page'
import {
  withKnobs,
  boolean,
  number,
  text,
  select,
} from '@storybook/addon-knobs'
import { withArtboard } from '@helpscout/artboard'

const stories = storiesOf('MessageList', module)

stories.add('Default', () => {
  const props = {}

  return (
    <Page>
      <Page.Card>
        <MessageList />
      </Page.Card>
    </Page>
  )
})
