import React from 'react'
import { withKnobs, text, select } from '@storybook/addon-knobs'
import { faker } from '@helpscout/helix'
import { PromoCard } from '../index'

export default {
  component: PromoCard,
  title: 'Components/PromoCard',
}

const initialContent = faker.lorem.paragraph()()

export const Default = () => {
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
}
