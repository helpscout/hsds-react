import React from 'react'
import { storiesOf } from '@storybook/react'
import GreeterCard, { Button } from '../src/components/GreeterCard'
import {
  withKnobs,
  boolean,
  number,
  text,
  select,
} from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { withArtboard } from '@helpscout/artboard'

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
      ? () => <Button onClick={action('Clicked!')}>Primary Button</Button>
      : null
    const align = select('Align', { Right: 'right', Left: 'left' }, 'right')
    const body = text(
      'Body',
      'The J&G Support Team are always happy to answer your questions and lend a hand with the app. Let’s talk...'
    )
    const subtitle = text('Subtitle', 'The J&G Team is here')
    const title = text('Title', 'Need help?')

    return (
      <div>
        <GreeterCard
          action={actionProp}
          align={align}
          body={body}
          subtitle={subtitle}
          title={title}
        />
      </div>
    )
  }
}

stories.add('Default', () => <Story />)
