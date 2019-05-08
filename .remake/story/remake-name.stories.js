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
import { withArtboard } from '@helpscout/artboard'

const stories = storiesOf('<%= name %>', module)

stories.addDecorator(
  withArtboard({
    width: 500,
    height: 300,
    withCenterGuides: false,
    showInterface: false
  })
)

stories.add('Default', () => (
  <<%= name %> />
))
