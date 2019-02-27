import React from 'react'
import { storiesOf } from '@storybook/react'
import GreeterCard from '../src/components/GreeterCard'
import { ThemeProvider } from '../src/components/styled'
import {
  withKnobs,
  boolean,
  number,
  text,
  select,
} from '@storybook/addon-knobs'
import { getColor } from '../src/styles/utilities/color'
import { action } from '@storybook/addon-actions'
import { withArtboard } from '@helpscout/artboard'
import { makeBrandColors } from '../src/styles/utilities/color'

const stories = storiesOf('GreeterCard', module)

stories.addDecorator(
  withArtboard({
    id: 'hsds-GreeterCard',
    width: 600,
    height: 400,
    withCenterGuides: false,
  })
)
stories.addDecorator(
  withKnobs({
    escapeHTML: false,
  })
)

class Story extends React.Component {
  render() {
    const actionProp = boolean('Has Action?', true)
      ? () => (
          <GreeterCard.Button onClick={action('Clicked!')}>
            Primary Button
          </GreeterCard.Button>
        )
      : null
    const align = select('Align', { Right: 'right', Left: 'left' }, 'right')
    const body = text(
      'Body',
      'The J&G Support Team are always happy to answer your questions and lend a hand with the app. Let’s talk...'
    )
    const subtitle = text('Subtitle', 'The J&G Team is here')
    const title = text('Title', 'Need help?')

    const brandColor = select(
      'Brand Color',
      {
        blue: getColor('blue.500'),
        green: getColor('green.500'),
        purple: getColor('purple.500'),
        purple: getColor('purple.500'),
        lightGreen: getColor('green.200'),
      },
      getColor('green.500')
    )

    const theme = { ...makeBrandColors(brandColor) }

    return (
      <ThemeProvider theme={theme}>
        <div>
          <GreeterCard
            action={actionProp}
            align={align}
            body={body}
            subtitle={subtitle}
            title={title}
          />
        </div>
      </ThemeProvider>
    )
  }
}

stories.add('Default', () => <Story />)
