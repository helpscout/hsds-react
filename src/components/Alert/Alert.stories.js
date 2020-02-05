import React from 'react'
import { Alert, Button, Heading, Link, Text } from '../index'

export default {
  component: Alert,
  title: 'Components/Text/Alert',
}

export const Default = () => <Alert>Buddy!</Alert>

Default.story = {
  name: 'default',
}

export const Content = () => (
  <Alert>
    <Heading size="h1">H1 Heading</Heading>
    <Heading size="h2">H2 Heading</Heading>
    <Heading size="h3">H3 Heading</Heading>
    <Heading size="h4">H4 Heading</Heading>
    <Heading size="h5">H5 Heading</Heading>
    <Heading size="h6">H6 Heading</Heading>
    <p>
      <Text>
        Paragraph. <Link>Link</Link>.
      </Text>
    </p>
    <ul>
      <li>List item</li>
      <li>List item</li>
      <li>List item</li>
    </ul>
  </Alert>
)

Content.story = {
  name: 'content',
}

export const Dismissible = () => (
  <div>
    <Alert dismissible>Buddy! This is dismissible.</Alert>

    <p>Content</p>
  </div>
)

Dismissible.story = {
  name: 'dismissible',
}

export const Badge = () => (
  <div>
    <Alert badge="Wow">Badge Buddy!</Alert>
  </div>
)

Badge.story = {
  name: 'badge',
}

export const Icon = () => (
  <div>
    <Alert icon>Icon Buddy!</Alert>
  </div>
)

Icon.story = {
  name: 'icon',
}

export const Status = () => (
  <div>
    <Alert status="info">Info Buddy!</Alert>
    <Alert status="error">Error Buddy!</Alert>
    <Alert status="success">Success Buddy!</Alert>
    <Alert status="warning">Warning Buddy!</Alert>
  </div>
)

Status.story = {
  name: 'status',
}

export const ActionRight = () => (
  <div>
    <Alert actionRight={<Button size="sm">Action!</Button>} icon>
      Action Right Buddy with Icon!
    </Alert>
  </div>
)

ActionRight.story = {
  name: 'actionRight',
}
