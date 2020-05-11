import React from 'react'
import { Card, Heading } from '../index'

export default {
  title: 'Components/Structural/Card',
  component: Card,
}

export const Default = () => <Card>Hello</Card>

Default.story = {
  name: 'default',
}

export const Link = () => (
  <Card href="https://www.helpscout.net/">
    Link to: https://www.helpscout.net/
  </Card>
)

Link.story = {
  name: 'link',
}
