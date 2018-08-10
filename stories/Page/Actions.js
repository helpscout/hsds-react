import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button, Input, Page } from '../../src/index.js'
import { App } from './decorators'

const stories = storiesOf('Page/Actions', module).addDecorator(App)

stories.add('default', () => (
  <Page>
    <Page.Card>
      <Input />
    </Page.Card>
    <Page.Actions
      primary={<Button primary>Thing</Button>}
      secondary={<Button>Thing</Button>}
      serious={<Button plain>Thing</Button>}
    />
  </Page>
))

stories.add('directions', () => (
  <Page>
    <Page.Actions
      direction="left"
      primary={<Button primary>Left</Button>}
      secondary={<Button>Thing</Button>}
      serious={<Button plain>Thing</Button>}
    />
    <Page.Actions
      direction="right"
      primary={<Button primary>Right</Button>}
      secondary={<Button>Thing</Button>}
      serious={<Button plain>Thing</Button>}
    />
  </Page>
))
