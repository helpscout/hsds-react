import React from 'react'
import { storiesOf } from '@storybook/react'
import { Select } from '../src/index.js'

storiesOf('Select', module)
  .add('default', () => (
    <Select options={['one', 'two', 'three']} />
  ))
  .add('groups', () => {
    const options = [
      {
        label: 'Group 1',
        value: [
          'one', 'two', 'three'
        ]
      },
      {
        label: 'Group 2',
        value: [
          'four', 'five', 'six', 'seven'
        ]
      }
    ]
    return (
      <Select options={options} value='five' />
    )
  })
  .add('placeholder', () => (
    <Select
      placeholder='Select one'
      options={['one', 'two', 'three']}
      onChange={v => console.log(v)}
    />
  ))
  .add('prefix', () => (
    <Select prefix='Filter by: ' options={['One']} />
  ))
  .add('states', () => (
    <div>
      <Select state='error' /><br />
      <Select state='success' /><br />
      <Select state='warning' />
    </div>
  ))
  .add('sizes', () => (
    <div>
      <Select autoFocus placeholder='Regular' /><br />
      <Select size='sm' autoFocus placeholder='Small' />
    </div>
  ))
