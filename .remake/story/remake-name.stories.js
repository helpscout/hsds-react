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

const stories = storiesOf('<%= name %>', module)

stories.addParameters({
  a11y: { element: 'c-<%= name %>' },
})

stories.add('Default', () => (
  <<%= name %> />
))
