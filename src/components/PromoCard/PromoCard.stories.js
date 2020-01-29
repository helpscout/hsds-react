import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, select } from '@storybook/addon-knobs'
import { withArtboard } from '@helpscout/artboard'
import { faker } from '@helpscout/helix'
import { PromoCard } from '../index'

const stories = storiesOf('PromoCard', module)
stories.addDecorator(withKnobs)
stories.addDecorator(
  withArtboard({
    id: 'hsds-PromoCard-story',
    width: 400,
    height: 200,
    withCenterGuides: false,
  })
)

const initialContent = faker.lorem.paragraph()()

stories.add('Default', () => {
  const props = {
    promoColor: select(
      'promoColor',
      {
        blue: 'blue',
        charcoal: 'charcoal',
        green: 'green',
        orange: 'orange',
        purple: 'purple',
        red: 'red',
      },
      'blue'
    ),
    children: text('content', initialContent),
  }

  return (
    <div style={{ padding: 20 }}>
      <PromoCard {...props} />
    </div>
  )
})
