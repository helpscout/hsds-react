import React from 'react'
import { Checkbox, ChoiceGroup, Heading, Text } from '../index'

export default {
  component: Checkbox,
  title: 'Components/Forms/Checkbox',
}

export const Default = () => (
  <Checkbox label="Label" helpText="Help description" />
)

Default.story = {
  name: 'default',
}

export const CustomContent = () => (
  <Checkbox label="Label" align="top">
    <Heading size="h3" style={{ lineHeight: 1, paddingBottom: 4 }}>
      Heading
    </Heading>
    <Text>Text</Text>
  </Checkbox>
)

CustomContent.story = {
  name: 'custom content',
}

export const Group = () => (
  <ChoiceGroup>
    <Checkbox label="Derek" value="derek" />
    <Checkbox label="Hansel" value="hansel" />
    <Checkbox label="Mugatu" value="mugatu" />
  </ChoiceGroup>
)

Group.story = {
  name: 'group',
}

export const Disabled = () => (
  <ChoiceGroup>
    <Checkbox label="Derek (Disable)" value="derek" disabled />
    <Checkbox label="Hansel" value="hansel" />
    <Checkbox label="Mugatu" value="mugatu" />
  </ChoiceGroup>
)

Disabled.story = {
  name: 'disabled',
}

export const States = () => (
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
)

States.story = {
  name: 'states',
}
