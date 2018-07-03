import React from 'react'
import { storiesOf } from '@storybook/react'
import Frame from 'react-frame-component'
import styled, {
  FrameProvider,
  ScopeProvider,
  ThemeProvider,
} from '../../src/components/styled'

const stories = storiesOf('Fancy/FrameProvider', module)

const Card = styled('div')`
  padding: 20px;
  ${props =>
    props.theme.color &&
    `
    background: ${props.theme.color};
  `};
`

stories.add('default', () => (
  <Frame>
    <FrameProvider>
      <ScopeProvider scope="#App">
        <ThemeProvider theme={{ color: '#eee' }}>
          <div id="App">
            <Card>Buddy!</Card>
          </div>
        </ThemeProvider>
      </ScopeProvider>
    </FrameProvider>
  </Frame>
))
