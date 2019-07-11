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
    const show = boolean('show', true)
    const buttonText = text('buttonText', 'Action')
    const actionProp = boolean('Has Action?', true)
      ? () => (
          <GreeterCard.Button onClick={action('Clicked!')}>
            {buttonText}
          </GreeterCard.Button>
        )
      : null

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

    const theme = { brandColor: makeBrandColors(brandColor) }

    const props = {
      in: show,
      isWithBoxShadow: boolean('isWithBoxShadow', true),
      action: actionProp,
      animationDuration: number('animationDuration', 300),
      animationEasing: text('animationEasing', 'ease-in-out'),
      animationSequence: text('animationSequence', 'fade up'),
      align: select('Align', { Right: 'right', Left: 'left' }, 'right'),
      body: text(
        'Body',
        'The J&G Support Team are always happy to answer your questions and lend a hand with the app. Let’s talk...'
      ),
      subtitle: text('Subtitle', 'The J&G Team is here'),
      title: text('Title', 'Need help?'),
    }

    return (
      <ThemeProvider theme={theme}>
        <div>
          <GreeterCard {...props} />
        </div>
      </ThemeProvider>
    )
  }
}

stories.add('Default', () => <Story />)
