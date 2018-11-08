import React from 'react'
import { storiesOf } from '@storybook/react'
import styled, {
  ScopeProvider,
  ThemeProvider,
} from '../../src/components/styled'

const stories = storiesOf('Fancy/ScopeProvider', module)

const Card = styled('div')`
  padding: 20px;
  ${props =>
    props.theme.color &&
    `
    background: ${props.theme.color};
  `};
`

stories.add('default', () => (
  <ScopeProvider scope="#App">
    <ThemeProvider theme={{ color: '#eee' }}>
      <div id="App">
        <Card>Buddy!</Card>
      </div>
    </ThemeProvider>
  </ScopeProvider>
))
