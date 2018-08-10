import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  Button,
  FormGroup,
  FormLabel,
  Input,
  Page,
  Switch,
} from '../../src/index.js'
import { App } from './decorators'

const stories = storiesOf('Page/Card', module).addDecorator(App)

stories.add('default', () => (
  <Page>
    <Page.Card>
      <Page.Header title="Customize your Bacon" subTitle="Step 1 of 2" />
      <FormGroup>
        <FormLabel label="Bacon name" helpText="Thing">
          <Input />
        </FormLabel>
      </FormGroup>
    </Page.Card>
  </Page>
))

stories.add('Example', () => (
  <Page>
    <Page.Card>
      <Page.Header
        title="Bacon Settings"
        subTitle="The story is about one of Santa's elves (Ferrell) who learns he is actually a human and goes to New York City."
      />

      <FormGroup>
        <FormLabel label="Site Name">
          <Input value="Dashing Dash" />
        </FormLabel>
      </FormGroup>

      <FormGroup>
        <FormLabel
          label="Site Visibility"
          helpText="Turns your site on or off to visitors. Visit site."
        >
          <Switch active />
        </FormLabel>
      </FormGroup>

      <FormGroup>
        <FormLabel label="Sub-domain">
          <Input value="dashingdash" suffix=".helpscoutdocs.com" />
        </FormLabel>
      </FormGroup>

      <FormGroup>
        <FormLabel label="Custom Domain">
          <Input value="kitchen.dashingdash.com" prefix="https://" />
        </FormLabel>
      </FormGroup>
    </Page.Card>

    <Page.Actions
      primary={<Button primary>Save</Button>}
      secondary={<Button>Discard Changes</Button>}
    />
  </Page>
))
