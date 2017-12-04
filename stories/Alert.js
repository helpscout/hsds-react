import React from 'react'
import { storiesOf } from '@storybook/react'
import { Alert, Button, Heading, Link, Text } from '../src/index.js'

const stories = storiesOf('Alert', module)

stories.add('default', () => (
  <Alert>Buddy!</Alert>
))

stories.add('content', () => (
  <Alert>
    <Heading size='h1'>H1 Heading</Heading>
    <Heading size='h2'>H2 Heading</Heading>
    <Heading size='h3'>H3 Heading</Heading>
    <Heading size='h4'>H4 Heading</Heading>
    <Heading size='h5'>H5 Heading</Heading>
    <Heading size='h6'>H6 Heading</Heading>
    <p>
      <Text>Paragraph. <Link>Link</Link>.</Text>
    </p>
    <ul>
      <li>List item</li>
      <li>List item</li>
      <li>List item</li>
    </ul>
  </Alert>
))

stories.add('actionRight', () => (
  <div>
    <Alert
      actionRight={<Button size='sm'>Action!</Button>}
      icon
    >
      Action Right Buddy with Icon!
    </Alert>
  </div>
))

stories.add('dismissible', () => (
  <div>
    <Alert dismissible>
      Buddy! This is dismissible.
    </Alert>

    <p>Content</p>
  </div>
))

stories.add('badge', () => (
  <div>
    <Alert badge='Wow'>Badge Buddy!</Alert>
  </div>
))

stories.add('icon', () => (
  <div>
    <Alert icon>Icon Buddy!</Alert>
  </div>
))

stories.add('status', () => (
  <div>
    <Alert status='info'>Info Buddy!</Alert>
    <Alert status='error'>Error Buddy!</Alert>
    <Alert status='success'>Success Buddy!</Alert>
    <Alert status='warning'>Warning Buddy!</Alert>
  </div>
))
