import React from 'react'
import { ThemeProvider } from '../styled'
import { OptionTile } from '../index'

export default {
  component: OptionTile,
  title: 'Components/OptionTile',
}

export const Default = () => <OptionTile />

export const _Container = () => (
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
)

export const Themed = () => {
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
}
