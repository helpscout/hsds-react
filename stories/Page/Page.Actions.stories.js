import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button, Input, Page } from '../../src/index'
import { PageDecorator } from '../../src/utilities/storybook'

const stories = storiesOf('Page/Actions', module).addDecorator(PageDecorator)

stories.add('default', () => (
  <Page>
    <Page.Card>
      <Input />
    </Page.Card>
    <Page.Actions
      primary={<Button kind="primary">Thing</Button>}
      secondary={<Button kind="secondary">Thing</Button>}
      serious={<Button kind="link">Thing</Button>}
    />
  </Page>
))

stories.add('directions', () => (
  <Page>
    <Page.Actions
      direction="left"
      primary={
        <Button kind="primary" size="lg">
          Left
        </Button>
      }
      secondary={
        <Button kind="secondary" size="lg">
          Thing
        </Button>
      }
      serious={
        <Button state="danger" size="lg">
          Thing
        </Button>
      }
    />
    <Page.Actions
      direction="right"
      primary={
        <Button kind="primary" size="lg">
          Left
        </Button>
      }
      secondary={
        <Button kind="secondary" size="lg">
          Thing
        </Button>
      }
      serious={
        <Button state="danger" size="lg">
          Thing
        </Button>
      }
    />
  </Page>
))
