import React from 'react'
import { storiesOf } from '@storybook/react'
import ConditionField from '../src/components/ConditionField'
import ConditionFieldReadme from '../src/components/ConditionField/README.md'

import {
  withKnobs,
  boolean,
  number,
  text,
  select,
} from '@storybook/addon-knobs'
import { withArtboard } from '@helpscout/artboard'
import { jsxDecorator } from 'storybook-addon-jsx'

const stories = storiesOf('ConditionField', module)

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
  readme: { sidebar: ConditionFieldReadme },
  a11y: { element: 'c-ConditionField' },
})

stories.add('Default', () => <ConditionField />)
