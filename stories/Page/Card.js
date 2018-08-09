import React from 'react'
import { storiesOf } from '@storybook/react'
import { FormGroup, Input, Page, Select } from '../../src/index.js'
import { App } from './decorators'

const stories = storiesOf('Page/Card', module).addDecorator(App)

stories.add('default', () => (
  <Page>
    <Page.Card>
      <Page.Header
        title="Customize your Bacon"
        subTitle="Step 1 of 2"
        withBorder
      />
      <FormGroup>
        <Input label="Bacon name" hintText="Thing" />
      </FormGroup>
      <FormGroup>
        <Select label="Bacon name" hintText="Thing" />
      </FormGroup>
    </Page.Card>
  </Page>
))
