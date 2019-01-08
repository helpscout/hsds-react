import React from 'react'
import { storiesOf } from '@storybook/react'
import { Page } from '../../src/index.js'
import { App } from './decorators'

const stories = storiesOf('Page/Section', module).addDecorator(App)

stories.add('default', () => (
  <Page>
    <Page.Card>
      <Page.Section>
        <h1>Section 1</h1>
        <p>A Page.Section is where content should live.</p>
        <p>Sections are wrappers too, not pretty, but smart</p>
        <p>They handle responsiveness if enabled on the Page</p>
      </Page.Section>
      <Page.Section>
        <h2>Section 2</h2>
        <p>When to use?</p>
        <p>
          If the content inside a Card has multiple Headings, it's a sure signal
          that it has multiple sections
        </p>
      </Page.Section>
    </Page.Card>
  </Page>
))
