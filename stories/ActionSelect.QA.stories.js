import React from 'react'
import { storiesOf } from '@storybook/react'
import { Example } from './ActionSelect.stories'
import Button from '../src/components/Button'
import Page from '../src/components/Page'

const stories = storiesOf('ActionSelect/QA', module)

stories.add('Scrolling', () => {
  return (
    <div>
      <Page>
        <div style={{ height: '80vh' }}>
          <h1>Scroll down. ActionSelect located below</h1>
        </div>
        <Example />
        <div style={{ height: 40 }} />
        <Page.Actions
          primary={
            <Button kind="primary" version={2}>
              Save Changes
            </Button>
          }
        />
      </Page>
    </div>
  )
})
