import React from 'react'
import { storiesOf } from '@storybook/react'
import { CopyInput } from '../../src/index.js'

const stories = storiesOf('CopyInput', module)

stories.add('Default', () => <CopyInput />)
