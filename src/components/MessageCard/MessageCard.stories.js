import React from 'react'
import { ThemeProvider } from '../styled'
import { boolean, number, text, select } from '@storybook/addon-knobs'
import { getColor } from '../../styles/utilities/color'
import { action } from '@storybook/addon-actions'
import { makeBrandColors } from '../../styles/utilities/color'
import MessageCard from '.'

export default {
  component: MessageCard,
  title: 'Components/Conversation/MessageCard',
}

class Story extends React.Component {
  render() {
    const show = boolean('show', true)
    const buttonText = text('buttonText', 'Action')
    const actionProp = boolean('Has Action?', true)
      ? () => (
          <MessageCard.Button onClick={action('Clicked!')}>
            {buttonText}
          </MessageCard.Button>
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
      isMobile: boolean('isMobile', false),
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
          <MessageCard {...props} />
        </div>
      </ThemeProvider>
    )
  }
}

export const Default = () => <Story />
