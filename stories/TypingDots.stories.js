import React from 'react'
import { storiesOf } from '@storybook/react'
import TypingDots from '../src/components/TypingDots'
import ReadMe from '../src/components/TypingDots/README.md'

import {
  withKnobs,
  boolean,
  number,
  text,
  select,
} from '@storybook/addon-knobs'
import { withArtboard } from '@helpscout/artboard'
import { jsxDecorator } from 'storybook-addon-jsx'

const stories = storiesOf('TypingDots', module)

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
  a11y: { element: 'c-TypingDots' },
})

stories.add('Default', () => <TypingDots />)
