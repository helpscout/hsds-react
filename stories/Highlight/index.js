import React from 'react'
import { storiesOf } from '@storybook/react'
import { Highlight } from '../../src/index.js'

const stories = storiesOf('Highlight', module)

stories.add('Default', () => <Highlight />)
