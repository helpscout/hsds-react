import React from 'react'
import { storiesOf } from '@storybook/react'
import { Grid, PropProvider, Radio, ChoiceGroup } from '../src/index.js'

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
  .add('custom', () => (
    <PropProvider value={{ Radio: { kind: 'custom' } }}>
      <ChoiceGroup>
        <Radio label="Derek (Disable)" value="derek" disabled />
        <Radio label="Hansel" value="hansel" />
        <Radio label="Mugatu" value="mugatu" />
      </ChoiceGroup>
    </PropProvider>
  ))
  .add('stacked', () => (
    <PropProvider value={{ Radio: { kind: 'custom', stacked: true } }}>
      <ChoiceGroup style={{ maxWidth: 600 }}>
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
    </PropProvider>
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
