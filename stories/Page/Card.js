import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  Button,
  ControlGroup,
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
          <ControlGroup>
            <ControlGroup.Block>
              <Input value="dashingdash" suffix=".helpscoutdocs.com" />
            </ControlGroup.Block>
            <ControlGroup.Item>
              <Input.AddOn>.helpscoutdocs.com</Input.AddOn>
            </ControlGroup.Item>
          </ControlGroup>
        </FormLabel>
      </FormGroup>

      <FormGroup>
        <FormLabel label="Custom Domain">
          <ControlGroup>
            <ControlGroup.Item>
              <Input.AddOn>https://</Input.AddOn>
            </ControlGroup.Item>
            <ControlGroup.Block>
              <Input value="kitchen.dashingdash.com" prefix="https://" />
            </ControlGroup.Block>
          </ControlGroup>
        </FormLabel>
      </FormGroup>
    </Page.Card>

    <Page.Actions
      primary={<Button primary>Save</Button>}
      secondary={<Button>Discard Changes</Button>}
    />
  </Page>
))
