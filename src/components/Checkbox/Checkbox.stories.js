import React from 'react'
import { storiesOf } from '@storybook/react'
import { Checkbox, ChoiceGroup, Heading, Text } from '../index'

storiesOf('Checkbox', module)
  .add('default', () => <Checkbox label="Label" helpText="Help description" />)
  .add('custom content', () => (
    <Checkbox label="Label" align="top">
      <Heading size="h3" style={{ lineHeight: 1, paddingBottom: 4 }}>
        Heading
      </Heading>
      <Text>Text</Text>
    </Checkbox>
  ))
  .add('group', () => (
    <ChoiceGroup>
      <Checkbox label="Derek" value="derek" />
      <Checkbox label="Hansel" value="hansel" />
      <Checkbox label="Mugatu" value="mugatu" />
    </ChoiceGroup>
  ))
  .add('disabled', () => (
    <ChoiceGroup>
      <Checkbox label="Derek (Disable)" value="derek" disabled />
      <Checkbox label="Hansel" value="hansel" />
      <Checkbox label="Mugatu" value="mugatu" />
    </ChoiceGroup>
  ))
  .add('states', () => (
    <div>
      <ChoiceGroup value="error">
        <Checkbox
          label="Error"
          helpText="Help description"
          state="error"
          value="error"
        />
        <Checkbox
          label="Success"
          helpText="Help description"
          state="success"
          value="success"
        />
        <Checkbox
          label="Warning"
          helpText="Help description"
          state="warning"
          value="warning"
        />
      </ChoiceGroup>
    </div>
  ))
