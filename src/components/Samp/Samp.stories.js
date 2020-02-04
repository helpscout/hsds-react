import React from 'react'
import { storiesOf } from '@storybook/react'
import { Samp } from '../index'

const stories = storiesOf('Deleted/Samp', module)

stories.add('default', () => <Samp>/hansel</Samp>)
