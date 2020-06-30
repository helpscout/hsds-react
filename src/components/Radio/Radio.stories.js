import React from 'react'
import { Grid, Radio, ChoiceGroup } from '../index'
import { RadioContext } from './Radio'

export default {
  component: Radio,
  title: 'Components/Forms/Radio',
}

export const Default = () => <Radio label="Label" helpText="Help description" />

Default.story = {
  name: 'default',
}

export const Group = () => (
  <ChoiceGroup>
    <Radio label="Derek" value="derek" />
    <Radio label="Hansel" value="hansel" />
    <Radio label="Mugatu" value="mugatu" />
  </ChoiceGroup>
)

Group.story = {
  name: 'group',
}

export const Disabled = () => (
  <ChoiceGroup>
    <Radio label="Derek (Disable)" value="derek" disabled />
    <Radio label="Hansel" value="hansel" />
    <Radio label="Mugatu" value="mugatu" />
  </ChoiceGroup>
)

Disabled.story = {
  name: 'disabled',
}

export const Stacked = () => (
  <ChoiceGroup>
    <Radio stacked={true} label="Derek" value="derek" />
    <Radio stacked={true} label="Hansel" value="hansel" />
    <Radio stacked={true} label="Mugatu" value="mugatu" />
  </ChoiceGroup>
)

Stacked.story = {
  name: 'stacked',
}
