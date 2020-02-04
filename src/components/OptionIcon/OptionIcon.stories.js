import React from 'react'
import { storiesOf } from '@storybook/react'
import { ThemeProvider } from '../styled'
import { OptionIcon } from '../index'

const stories = storiesOf('PhaseOut/OptionIcon', module)

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
