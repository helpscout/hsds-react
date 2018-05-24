import React from 'react'
import { storiesOf } from '@storybook/react'
import { Emoji } from '../src/index.js'

const stories = storiesOf('Emoji', module)

stories.add('default', () => <Emoji emoji=":santa:" />)
