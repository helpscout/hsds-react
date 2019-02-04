import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Alert, Button, Page, Input } from '../src/index.js'

const stories = storiesOf('CypressTest', module)

stories.add('Default', () => (
  <Page>
    <Page.Card>
      <Page.Section>
        <Page.Header
          render={({ Title, Subtitle }) => (
            <div>
              <Title level="h1">My page</Title>
              <Subtitle>Very important stuff</Subtitle>
            </div>
          )}
        />
        <Page.Content>
          <Alert data-cy="Alert" />
          <Input data-cy="InputFirstName" />
          <Input data-cy="InputLastName" />
        </Page.Content>
      </Page.Section>
    </Page.Card>
    <Page.Actions
      primary={
        <Button kind="primary" data-cy="SubmitButton">
          Submit
        </Button>
      }
    />
  </Page>
))
