import React from 'react'
import { storiesOf } from '@storybook/react'
import { Tag } from '../src/index.js'

const stories = storiesOf('Tag', module)

stories.add('default', () => (
  <Tag>Ron</Tag>
))

stories.add('colors', () => (
  <div>
    <Tag color='red'>Ron</Tag>
    <Tag color='grey'>Ron</Tag>
    <Tag color='green'>Ron</Tag>
    <Tag color='blue'>Ron</Tag>
    <Tag color='orange'>Ron</Tag>
    <Tag color='purple'>Ron</Tag>
  </div>
))

stories.add('filled', () => (
  <div>
    <Tag color='red' filled>Ron</Tag>
    <Tag color='grey' filled>Ron</Tag>
    <Tag color='green' filled>Ron</Tag>
    <Tag color='blue' filled>Ron</Tag>
    <Tag color='orange' filled>Ron</Tag>
    <Tag color='purple' filled>Ron</Tag>
  </div>
))

stories.add('pulsing', () => (
  <div>
    <Tag color='red' pulsing>Ron</Tag>
    <Tag color='grey' pulsing>Ron</Tag>
    <Tag color='green' pulsing>Ron</Tag>
    <Tag color='blue' pulsing>Ron</Tag>
    <Tag color='orange' pulsing>Ron</Tag>
    <Tag color='purple' pulsing>Ron</Tag>
  </div>
))
