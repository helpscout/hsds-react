import React from 'react'
import { storiesOf } from '@storybook/react'
import { Select } from '../src/index.js'

const stories = storiesOf('Select', module)

stories.add('default', () => (
  <Select options={['one', 'two', 'three']} />
))

stories.add('groups', () => {
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

stories.add('placeholder', () => (
  <Select
    placeholder='Select one'
    options={['one', 'two', 'three']}
    onChange={v => console.log(v)}
  />
))

stories.add('prefix', () => (
  <Select prefix='Filter by: ' options={['One']} />
))

stories.add('helpText', () => (
  <Select helpText='This text appears below the Select' />
))

stories.add('hintText', () => (
  <Select hintText='This text appears above the Select' />
))

stories.add('states', () => (
  <div>
    <Select state='error' /><br />
    <Select state='success' /><br />
    <Select state='warning' />
  </div>
))

stories.add('sizes', () => (
  <div>
    <Select autoFocus placeholder='Regular' /><br />
    <Select size='sm' autoFocus placeholder='Small' />
  </div>
))
