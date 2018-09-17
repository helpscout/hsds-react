import React from 'react'
import { storiesOf } from '@storybook/react'
import { OptionTile } from '../../src/index.js'
import styled, { ThemeProvider } from '../../src/components/styled'

const stories = storiesOf('OptionTile', module)

stories.add('Default', () => <OptionTile />)

stories.add('Container', () => (
  <div style={{ background: '#eee', padding: 20, width: 350 }}>
    <OptionTile.Container>
      <OptionTile
        href="#"
        icon="search"
        title="Keep searching"
        subtitle="Browse our help docs for an answer to your question"
      />
      <OptionTile
        href="#"
        icon="chat"
        title="Talk to us"
        subtitle="Talk with a friendly member of our support team"
      />
    </OptionTile.Container>
  </div>
))

stories.add('Themed', () => {
  const theme = {
    brandColor: {
      brandColor: 'red',
      textColor: 'black',
    },
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ background: '#eee', padding: 20, width: 350 }}>
        <OptionTile.Container>
          <OptionTile
            href="#"
            icon="search"
            title="Keep searching"
            subtitle="Browse our help docs for an answer to your question"
          />
          <OptionTile
            href="#"
            icon="chat"
            title="Talk to us"
            subtitle="Talk with a friendly member of our support team"
          />
        </OptionTile.Container>
      </div>
    </ThemeProvider>
  )
})
