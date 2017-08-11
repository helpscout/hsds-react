import React from 'react'
import { storiesOf } from '@storybook/react'
import { Card, CardBlock } from '../src/index.js'

storiesOf('Card', module)
  .add('default', () => <Card>Hello</Card>)
  .add('link', () => <Card href='https://www.helpscout.net/'>Link to: https://www.helpscout.net/</Card>)
  .add('block', () => (
    <Card seamless>
      <CardBlock>Block One</CardBlock>
      <CardBlock>Block Two</CardBlock>
      <CardBlock>Block Three</CardBlock>
    </Card>
  ))
