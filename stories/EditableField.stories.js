import React from 'react'
import { storiesOf } from '@storybook/react'
import EditableField from '../src/components/EditableField'
import ReadMe from '../src/components/EditableField/README.md'

import {
  withKnobs,
  boolean,
  number,
  text,
  select,
} from '@storybook/addon-knobs'
import { withArtboard } from '@helpscout/artboard'
import { jsxDecorator } from 'storybook-addon-jsx'

const stories = storiesOf('EditableField', module)

stories.addDecorator(jsxDecorator)

stories.addDecorator(
  withArtboard({
    width: 500,
    height: 300,
    withCenterGuides: false,
    showInterface: false,
  })
)

stories.addParameters({
  readme: { sidebar: ReadMe },
  a11y: { element: 'c-EditableField' },
})

stories.add('Default', () => <EditableField />)
