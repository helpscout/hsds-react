import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button } from '../../src/index.js'
import './ButtonV2'

const stories = storiesOf('Button', module)

stories.add('default', () => <Button>Click Me</Button>)

stories.add('types', () => (
  <div>
    <Button>Regular</Button>
    <Button primary>Primary</Button>
    <Button plain>Plain</Button>
    <Button outline>Outline Button</Button>
  </div>
))

stories.add('sizes', () => (
  <div>
    <div>
      <Button size="lg">Large</Button>
      <Button size="md">Medium</Button>
      <Button size="sm">Small</Button>
      <Button size="xs">Extra Small</Button>
    </div>
    <div>
      <Button size="lg" outline>
        Large
      </Button>
      <Button size="md" outline>
        Medium
      </Button>
      <Button size="sm" outline>
        Small
      </Button>
      <Button size="xs" outline>
        Extra Small
      </Button>
    </div>
  </div>
))

stories.add('states', () => (
  <div>
    <Button state="success">Success</Button>
    <Button state="error">Error</Button>
    <Button state="warning">Warning</Button>
  </div>
))

stories.add('disabled', () => (
  <div>
    <Button disabled>Cant touch this!</Button>
  </div>
))

stories.add('themes', () => (
  <div>
    <Button theme="editing" block size="lg">
      Block
    </Button>
    <br />
    <Button theme="editing" block disabled>
      Block
    </Button>
    <br />
    <Button theme="pill" size="lg">
      Pill Button
    </Button>
    <br />
    <Button theme="pill" disabled>
      Pill Button
    </Button>
    <br />
  </div>
))
