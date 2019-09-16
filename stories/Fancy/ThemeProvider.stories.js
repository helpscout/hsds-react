import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import { ThemeProvider } from '../../src/components/styled'

const stories = storiesOf('Fancy/ThemeProvider', module)

const Card = styled('div')`
  padding: 20px;
  ${props =>
    props.theme.color &&
    `
    background: ${props.theme.color};
  `};
`

stories.add('default', () => (
  <ThemeProvider theme={{ color: '#eee' }}>
    <Card>Buddy!</Card>
  </ThemeProvider>
))
