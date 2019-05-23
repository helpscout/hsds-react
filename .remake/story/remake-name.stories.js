import React from 'react'
import { storiesOf } from '@storybook/react'
import <%= name %> from '../src/components/<%= name %>'
import ReadMe from '../src/components/<%= name %>/README.md'

import {
  withKnobs,
  boolean,
  number,
  text,
  select,
} from '@storybook/addon-knobs'
import { withArtboard } from '@helpscout/artboard'
import { jsxDecorator } from 'storybook-addon-jsx'

const stories = storiesOf('<%= name %>', module)

stories.addDecorator(jsxDecorator)

stories.addDecorator(
  withArtboard({
    width: 500,
    height: 300,
    withCenterGuides: false,
    showInterface: false
  })
)

stories.addParameters({
  readme: { sidebar: <%= name %>ReadMe },
  a11y: { element: 'c-<%= name %>' },
})

stories.add('Default', () => (
  <<%= name %> />
))
