import React from 'react'
import { storiesOf } from '@storybook/react'
import <%= name %> from '../src/components/<%= name %>'
import <%= name %>Readme from '../src/components//<%= name %>/README.md'

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

stories.addParameters({
  readme: { sidebar: <%= name %>Readme },
  a11y: { element: 'c-<%= name %>' },
})

stories.add('Default', () => (
  <<%= name %> />
))
