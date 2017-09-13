import React from 'react'
import { storiesOf } from '@storybook/react'
import { Card } from '../src/index.js'

storiesOf('Card', module)
  .add('default', () => <Card>Hello</Card>)
  .add('link', () => <Card href='https://www.helpscout.net/'>Link to: https://www.helpscout.net/</Card>)
  .add('block', () => (
    <Card seamless>
      <Card.Block>Block One</Card.Block>
      <Card.Block>Block Two</Card.Block>
      <Card.Block>Block Three</Card.Block>
    </Card>
  ))
