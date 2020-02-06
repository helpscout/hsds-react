import React from 'react'
import { Checkbox, ChoiceGroup } from '../index'

export default {
  component: Checkbox,
  title: 'Components/Forms/Checkbox',
}

export const Default = () => (
  <ChoiceGroup>
    <Checkbox label="Derek" value="derek" />
    <Checkbox label="Hansel" value="hansel" />
    <Checkbox label="Mugatu" value="mugatu" />
  </ChoiceGroup>
)

Default.story = {
  name: 'default',
}

export const Disabled = () => (
  <ChoiceGroup>
    <Checkbox label="Derek (Disable)" value="derek" disabled />
    <Checkbox label="Hansel" value="hansel" disabled />
  </ChoiceGroup>
)

Disabled.story = {
  name: 'disabled',
}
