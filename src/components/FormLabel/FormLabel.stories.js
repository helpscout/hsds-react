import React from 'react'
import { Page, FormLabel, FormGroup, Input, Switch } from '../index'

export default {
  component: FormLabel,
  title: 'Components/FormLabel',
}

export const Default = () => (
  <Page>
    <Page.Card>
      <FormGroup>
        <FormLabel
          label="This is the label for the Input down there"
          helpText="Ignore this message, says nothing interesting."
        >
          <Input />
        </FormLabel>
      </FormGroup>
    </Page.Card>
  </Page>
)

Default.story = {
  name: 'default',
}

export const Inline = () => (
  <Page>
    <Page.Card>
      <FormGroup>
        <FormLabel label="Label for the Switch" isInline>
          <Switch />
        </FormLabel>
      </FormGroup>
    </Page.Card>
    <Page.Card>
      <FormGroup>
        <FormLabel
          label="Label for the Switch"
          helpText="Enable this feature or you might regret it later."
          isInline
        >
          <Switch />
        </FormLabel>
      </FormGroup>
    </Page.Card>
    <Page.Card>
      <FormGroup>
        <FormLabel
          label="Label for the Switch"
          helpText="Enable this feature or you might regret it later.Enable this feature or you might regret it later.Enable this feature or you might regret it later."
          isInline
        >
          <Switch />
        </FormLabel>
      </FormGroup>
    </Page.Card>
  </Page>
)

Inline.story = {
  name: 'inline',
}
