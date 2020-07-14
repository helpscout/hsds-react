import React from 'react'
import styled, { ThemeProvider } from '../styled'
import { boolean, number, text, select } from '@storybook/addon-knobs'
import { getColor } from '../../styles/utilities/color'
import { action } from '@storybook/addon-actions'
import { makeBrandColors } from '../../styles/utilities/color'
import MessageCard from '.'

export default {
  component: MessageCard,
  title: 'Components/Conversation/MessageCard',
}

const LimitUI = styled.div`
  ${({ height }) => (height ? `height: ${height};` : '')};

  .c-Animate,
  .c-MessageCard {
    height: 100%;
  }
`

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
        '<p>This <i>sentence</i> has five <u>words</u>. has five more <code class="inline-code">words</code></p><ul> <li>Point one</li><li>Somewhat unimaginatively , I&#39;ve <s>compartmentalized</s> my incomprehensibilities. Furthermore, announcements of such long-windedness are likely un-copyrightable!</li><li>Text</li></ul><p>Hol’ up, here comes a blockquote. Thanks,</p><blockquote> <p>This sentence has five words. Here are five more words. Five-word sentences are fine. But several together become monotonous. Listen to what is happening. The writing is getting boring. The sound of it drones. It’s like a stuck record. The ear demands some variety. Now listen. I vary the sentence length, and I create music. Music. The writing sings. It has a pleasant rhythm, a lilt, a harmony. I use short sentences</p></blockquote><p><b>Bold text</b> is charcoal.800 whist links are <a href="https://www.google.com/">blue.600</a></p><ol> <li>Point one</li><li>Point two is made up of two lines, of course list items can extend well beyond this, but still respect the grid</li><li>Text</li></ol><pre><code><p>let settings = HSBeaconSettings(beaconId: "cac8be08-60a3 -46e8-b22e-ed50bfcaa0aa"); HSBeacon.open(settings);</p></code></pre><p>The J&amp;G Support Team are always happy.</p>'
      ),
      subtitle: text('Subtitle', 'The J&G Team is here'),
      title: text('Title', 'Need help?'),
    }

    const limitProps = {
      height: text('limit screen height', '100vh'),
    }

    return (
      <ThemeProvider theme={theme}>
        <LimitUI {...limitProps}>
          <MessageCard {...props} />
        </LimitUI>
      </ThemeProvider>
    )
  }
}

export const Default = () => <Story />

Default.story = {
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
}
