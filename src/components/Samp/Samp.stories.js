import React from 'react'
import { storiesOf } from '@storybook/react'
import { Samp } from '../index'

const stories = storiesOf('Samp', module)

stories.add('default', () => <Samp>/hansel</Samp>)
