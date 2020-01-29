import React from 'react'
import { storiesOf } from '@storybook/react'
import { Page } from '../../src/index'
import { PageDecorator } from '../../src/utilities/storybook'

const stories = storiesOf('Page/Card', module).addDecorator(PageDecorator)

stories.add('default', () => (
  <Page>
    <Page.Card>
      <p>Cards are just presentational wrappers, nothing special.</p>
    </Page.Card>
    <Page.Card>
      <p>There can be more than 1 per Page.</p>
    </Page.Card>
    <Page.Card>
      <p>Sorry Cards, I didn't mean that. You are so pretty.</p>
    </Page.Card>
  </Page>
))
