import React from 'react'
import { storiesOf } from '@storybook/react'
import { Flexy, Skeleton } from '../src/index.js'

const stories = storiesOf('Skeleton', module)
console.log(Skeleton)

stories.add('default', () => (
  <div style={{width: 300}}>
    <Flexy>
      <Flexy.Item>
        <Skeleton.Avatar size='lg' />
      </Flexy.Item>
      <Flexy.Block>
        <Skeleton.Heading width='70%' />
        <Skeleton.Text width='40%' />
      </Flexy.Block>
    </Flexy>
    <Skeleton.Paragraph />
  </div>
))

stories.add('avatar', () => (
  <div>
    <Skeleton.Avatar size='lg' />
    <Skeleton.Avatar size='md' />
    <Skeleton.Avatar size='sm' />
  </div>
))

stories.add('heading', () => (
  <div>
    <Skeleton.Heading width='70%' />
  </div>
))

stories.add('image', () => (
  <div style={{width: 300}}>
    <Skeleton.Image />
  </div>
))

stories.add('paragraph', () => (
  <div>
    <Skeleton.Paragraph />
  </div>
))

stories.add('text', () => (
  <div>
    <Skeleton.Text width='70%' />
  </div>
))
