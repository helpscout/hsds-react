import React from 'react'
import { storiesOf } from '@storybook/react'
import RatingFace from '../src/components/RatingFace'
import {
  withKnobs,
  boolean,
  number,
  text,
  select,
} from '@storybook/addon-knobs'
import { withArtboard } from '@helpscout/artboard'

const stories = storiesOf('RatingFace', module)

stories.addDecorator(
  withArtboard({ id: 'hsds-RatingFace', width: 500, height: 300 })
)
stories.addDecorator(withKnobs)

stories.add('Default', () => <RatingFace />)
