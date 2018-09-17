import React from 'react'
import { storiesOf } from '@storybook/react'
import { OptionIcon } from '../../src/index.js'
import styled, { ThemeProvider } from '../../src/components/styled'

const stories = storiesOf('OptionIcon', module)

stories.add('Default', () => <OptionIcon />)

stories.add('Themed', () => {
  const theme = {
    brandColor: {
      brandColor: 'red',
      textColor: 'blue',
    },
  }

  return (
    <ThemeProvider theme={theme}>
      <OptionIcon />
    </ThemeProvider>
  )
})
