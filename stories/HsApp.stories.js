import React from 'react'
import { storiesOf } from '@storybook/react'
import { HsApp } from '../src/index'

const stories = storiesOf('HsApp', module)

stories.add('Default', () => <HsApp />)
