import React from 'react'
import { storiesOf } from '@storybook/react'
import { ArticleCard, Card, CardList } from '../src/index'
import { createSpec, faker } from '@helpscout/helix'
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs'

const stories = storiesOf('CardList', module)
stories.addDecorator(withKnobs)

const CardSpec = createSpec({
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraph(),
  id: faker.random.uuid(),
  key: faker.random.uuid(),
})

stories.add('Default', () => {
  class Example extends React.Component {
    state = {
      cards: [],
    }

    render() {
      return (
        <div style={{ margin: 'auto', maxWidth: 420 }}>
          <CardList {...this.props}>
            {this.props.cards.map(card => {
              return <ArticleCard {...card} />
            })}
          </CardList>
        </div>
      )
    }
  }

  const cards = number('cards', 3) || 0
  const props = {
    cards: CardSpec.generate(cards),
    animationDelay: number('animationDelay', 0),
    animationEasing: text('animationEasing', 'ease'),
    animationSequence: text('animationSequence', 'fade up'),
    animationStagger: number('animationStagger', 60),
    stagger: boolean('stagger', true),
  }

  return <Example {...props} />
})
