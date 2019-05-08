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
} from '../../src/index'
import { App } from './decorators'

const stories = storiesOf('Page/Example', module).addDecorator(App)

stories.add('Responsive', () => (
  <Page isResponsive>
    <Page.Card>
      <Page.Section>
        <Page.Header
          render={({ Title, Subtitle }) => (
            <div>
              <Title headingLevel="h1">Edit your account</Title>
              <Subtitle>Welcome to the Dharma Initiative.</Subtitle>
            </div>
          )}
        />
        <Page.Content>
          <FormGroup>
            <FormLabel label="Site Name">
              <Input value="Dashing Dash" />
            </FormLabel>
          </FormGroup>
        </Page.Content>
      </Page.Section>

      <Page.Section>
        <Page.Header
          withBorder={false}
          render={({ Title, Subtitle }) => (
            <div>
              <Title headingLevel="h2" isSecondary>
                Default Settings
              </Title>
            </div>
          )}
        />
        <ExampleContent />
      </Page.Section>
    </Page.Card>

    <Page.Card>
      <Page.Section>
        <Page.Header
          render={({ Title, Subtitle }) => (
            <div>
              <Title headingLevel="h2">More settings this way</Title>
              <Subtitle>
                Heading looks the same, but it's an H2! There should only be one
                h1 per page ;)
              </Subtitle>
            </div>
          )}
        />
        <ExampleContent />
      </Page.Section>
    </Page.Card>

    <Page.Actions
      primary={
        <Button kind="primary" size="lg" version={2}>
          Save
        </Button>
      }
      secondary={
        <Button size="md" version={2}>
          Discard Changes
        </Button>
      }
      serious={
        <Button state="danger" size="md" version={2}>
          Something serious!
        </Button>
      }
    />
  </Page>
))

function ExampleContent() {
  return (
    <Page.Content>
      <FormGroup>
        <FormLabel label="Site Name">
          <Input value="Dashing Dash" />
        </FormLabel>
      </FormGroup>

      <FormGroup>
        <FormLabel
          label="Site Visibility"
          helpText="Turns your site on or off to visitors. Visit site."
          isInline
        >
          <Switch active />
        </FormLabel>
      </FormGroup>
      <FormGroup>
        <FormLabel label="Sub-domain">
          <ControlGroup>
            <ControlGroup.Block>
              <Input value="dashingdash" />
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
              <Input value="kitchen.dashingdash.com" />
            </ControlGroup.Block>
          </ControlGroup>
        </FormLabel>
      </FormGroup>
    </Page.Content>
  )
}
