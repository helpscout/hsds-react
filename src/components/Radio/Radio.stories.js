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

export const Custom = () => (
  <RadioContext.Provider value={{ kind: 'custom' }}>
    <ChoiceGroup>
      <Radio label="Derek (Disable)" value="derek" disabled />
      <Radio label="Hansel" value="hansel" />
      <Radio label="Mugatu" value="mugatu" />
    </ChoiceGroup>
  </RadioContext.Provider>
)

Custom.story = {
  name: 'custom',
}

export const Stacked = () => (
  <RadioContext.Provider value={{ kind: 'custom', stacked: true }}>
    <ChoiceGroup style={{ maxWidth: 600 }} multiSelect={false}>
      <Grid.Row>
        <Grid.Col size="3">
          <Radio
            label="Derek (Disable)"
            helpText="Help text"
            value="derek"
            disabled
          />
        </Grid.Col>
        <Grid.Col size="3">
          <Radio label="Hansel" helpText="Help text" value="hansel" />
        </Grid.Col>
        <Grid.Col size="3">
          <Radio label="Mugatu" helpText="Help text" value="mugatu" />
        </Grid.Col>
      </Grid.Row>
    </ChoiceGroup>
  </RadioContext.Provider>
)

Stacked.story = {
  name: 'stacked',
}

export const States = () => (
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
)

States.story = {
  name: 'states',
}
