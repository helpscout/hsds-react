import React from 'react'
import { storiesOf } from '@storybook/react'
import { Page, FormLabel, FormGroup, Input, Switch } from '../src/index.js'

storiesOf('FormLabel', module)
  .add('default', () => (
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
  ))
  .add('inline', () => (
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
  ))
