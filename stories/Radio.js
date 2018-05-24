import React from 'react'
import { storiesOf } from '@storybook/react'
import { Radio, ChoiceGroup } from '../src/index.js'

storiesOf('Radio', module)
  .add('default', () => <Radio label="Label" helpText="Help description" />)
  .add('group', () => (
    <ChoiceGroup>
      <Radio label="Derek" value="derek" />
      <Radio label="Hansel" value="hansel" />
      <Radio label="Mugatu" value="mugatu" />
    </ChoiceGroup>
  ))
  .add('disabled', () => (
    <ChoiceGroup>
      <Radio label="Derek (Disable)" value="derek" disabled />
      <Radio label="Hansel" value="hansel" />
      <Radio label="Mugatu" value="mugatu" />
    </ChoiceGroup>
  ))
  .add('states', () => (
    <div>
      <ChoiceGroup value="error">
        <Radio
          label="Error"
          helpText="Help description"
          state="error"
          value="error"
        />
        <Radio
          label="Success"
          helpText="Help description"
          state="success"
          value="success"
        />
        <Radio
          label="Warning"
          helpText="Help description"
          state="warning"
          value="warning"
        />
      </ChoiceGroup>
    </div>
  ))
