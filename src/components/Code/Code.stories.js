import React from 'react'
import { storiesOf } from '@storybook/react'
import { Code, Text } from '../index'

const stories = storiesOf('Code', module)

stories.add('default', () => (
  <Text>
    What is this… A&nbsp;
    <Code>npm install @zoolander/building-for-ants</Code>?!
  </Text>
))
