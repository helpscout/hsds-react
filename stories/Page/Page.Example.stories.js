import React from 'react'
import { storiesOf } from '@storybook/react'
import { action as addonAction } from '@storybook/addon-actions'
import { boolean, number } from '@storybook/addon-knobs'
import {
  Button,
  ControlGroup,
  FormGroup,
  FormLabel,
  Input,
  Page,
  Switch,
} from '../../src/index'
import { PageDecorator } from '../../src/utilities/storybook'

const stories = storiesOf('Page/Example', module).addDecorator(PageDecorator)

const action = name => (...args) => {
  addonAction(name)(...args)
  console.log(name, { args })
}

stories.add('Responsive', () => {
  const isResponsive = boolean('isResponsive', true)
  const isSticky = boolean('isSticky', true)
  const zIndex = number('zIndex', 100)

  return (
    <Page isResponsive={isResponsive}>
      <Page.Card>
        <Page.Header
          render={({ Title, Subtitle }) => (
            <div>
              <Title headingLevel="h1">Edit your account</Title>
              <Subtitle>Welcome to the Dharma Initiative.</Subtitle>
            </div>
          )}
        />

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
                  Heading looks the same, but it's an H2! There should only be
                  one h1 per page ;)
                </Subtitle>
              </div>
            )}
          />
          <ExampleContent />
        </Page.Section>
      </Page.Card>

      <Page.Actions
        isSticky={isSticky}
        zIndex={zIndex}
        primary={
          <Button kind="primary" size="lg" onClick={action('Save Changes')}>
            Save Changes
          </Button>
        }
        secondary={
          <Button size="md" onClick={action('Discard Changes')}>
            Discard Changes
          </Button>
        }
        serious={
          <Button
            state="danger"
            size="md"
            onClick={action('Something Serious')}
          >
            Something serious!
          </Button>
        }
      />
    </Page>
  )
})

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
