import React from 'react'
import { storiesOf } from '@storybook/react'
import { Input } from '../src/index.js'

storiesOf('Input', module)
  .add('default', () => <Input />)
  .add('multiline', () => <Input multiline placeholder='This is a textarea!' autoFocus />)
  .add('multiline + resizable', () => <Input multiline={3} resizable autoFocus placeholder='This is a resizable textarea!' />)
  .add('label', () => <Input label='Labelled' autoFocus />)
  .add('placeholder', () => <Input placeholder='Hello' autoFocus />)
  .add('prefix + suffix', () => <Input prefix='$' suffix='.00' autoFocus />)
  .add('seamless', () => <Input seamless autoFocus />)
  .add('disabled', () => <Input disabled autoFocus />)
  .add('readonly', () => <Input readOnly autoFocus value={`I can't turn left`} />)
  .add('states', () => (
    <div>
      <Input state='error' autoFocus /><br />
      <Input state='success' helpText="You're Awesome!" autoFocus /><br />
      <Input state='warning' autoFocus />
    </div>
  ))
  .add('sizes', () => (
    <div>
      <Input autoFocus placeholder='Regular' /><br />
      <Input size='sm' autoFocus placeholder='Small' />
    </div>
  ))
