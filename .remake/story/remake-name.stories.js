import React from 'react'
import { storiesOf } from '@storybook/react'
import <%= name %> from '../src/components/<%= name %>'
import {
  withKnobs,
  boolean,
  number,
  text,
  select,
} from '@storybook/addon-knobs'
import { withArtboard, Guide, GuideContainer } from '@helpscout/artboard'

const stories = storiesOf('<%= name %>', module)

stories.addDecorator(
  withArtboard({ id: 'hsds-<%= name %>', width: 400, height: 400 })
)
stories.addDecorator(withKnobs)

stories.add('Default', () => (
  <<%= name %>>
))
