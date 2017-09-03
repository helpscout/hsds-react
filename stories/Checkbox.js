import React from 'react'
import { storiesOf } from '@storybook/react'
import { Checkbox, ChoiceGroup } from '../src/index.js'
import { Theme } from './addons/theme'

storiesOf('Checkbox', module)
  .add('default', () => (
    <Checkbox label='Label' helpText='Help description' />
  ))
  .add('group', () => (
    <ChoiceGroup>
      <Checkbox label='Derek' value='derek' />
      <Checkbox label='Hansel' value='hansel' />
      <Checkbox label='Mugatu' value='mugatu' />
    </ChoiceGroup>
  ))
  .add('disabled', () => (
    <ChoiceGroup>
      <Checkbox label='Derek (Disable)' value='derek' disabled />
      <Checkbox label='Hansel' value='hansel' />
      <Checkbox label='Mugatu' value='mugatu' />
    </ChoiceGroup>
  ))
  .add('states', () => (
    <div>
      <ChoiceGroup value='error'>
        <Checkbox label='Error' helpText='Help description' state='error' value='error' />
        <Checkbox label='Success' helpText='Help description' state='success' value='success' />
        <Checkbox label='Warning' helpText='Help description' state='warning' value='warning' />
      </ChoiceGroup>
    </div>
  ))
