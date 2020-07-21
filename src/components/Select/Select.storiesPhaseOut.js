import React from 'react'
import { Select } from '../index'

export default {
  component: Select,
  title: 'z Phasing Out/Select',
}

export const Default = () => <Select options={['one', 'two', 'three']} />

Default.story = {
  name: 'default',
}

export const Groups = () => {
  const options = [
    {
      label: 'Group 1',
      value: ['one', 'two', 'three'],
    },
    {
      label: 'Group 2',
      value: ['four', 'five', 'six', 'seven'],
    },
  ]
  return <Select options={options} value="five" />
}

Groups.story = {
  name: 'groups',
}

export const Placeholder = () => (
  <Select
    placeholder="Select one"
    options={['one', 'two', 'three']}
    onChange={v => console.log(v)}
  />
)

Placeholder.story = {
  name: 'placeholder',
}

export const Prefix = () => <Select prefix="Filter by: " options={['One']} />

Prefix.story = {
  name: 'prefix',
}

export const HelpText = () => (
  <Select helpText="This text appears below the Select" />
)

HelpText.story = {
  name: 'helpText',
}

export const HintText = () => (
  <Select hintText="This text appears above the Select" />
)

HintText.story = {
  name: 'hintText',
}

export const States = () => (
  <div>
    <Select state="error" />
    <br />
    <Select state="success" />
    <br />
    <Select state="warning" />
  </div>
)

States.story = {
  name: 'states',
}

export const StateError = () => (
  <div>
    <Select state="error" errorMessage="This is error." />
    <br />
    <Select state="error" size="sm" errorMessage="This is error." />
    <br />
  </div>
)

StateError.story = {
  name: 'state: error',
}
