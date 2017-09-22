import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button } from '../src/index.js'

storiesOf('Button', module)
  .add('default', () => <Button>Click Me</Button>)
  .add('types', () => (
    <div>
      <Button>Regular</Button>
      <Button primary>Primary</Button>
      <Button plain>Plain</Button>
    </div>
  ))
  .add('sizes', () => (
    <div>
      <Button size='lg'>Large</Button>
      <Button size='md'>Medium</Button>
      <Button size='sm'>Small</Button>
    </div>
  ))
  .add('states', () => (
    <div>
      <Button state='success'>Success</Button>
      <Button state='error'>Error</Button>
      <Button state='warning'>Warning</Button>
    </div>
  ))
  .add('disabled', () => (
    <div>
      <Button disabled>Can't touch this!</Button>
    </div>
  ))
