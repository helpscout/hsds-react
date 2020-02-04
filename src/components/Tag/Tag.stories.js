import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs'
import { withArtboard } from '@helpscout/artboard'
import { Tag } from '../index'

const stories = storiesOf('Components/Tag', module)
stories.addDecorator(withArtboard({ id: 'Tag' }))
stories.addDecorator(withKnobs)

stories.add('Default', () => {
  const props = {
    color: select(
      'color',
      {
        red: 'red',
        grey: 'grey',
        green: 'green',
        blue: 'blue',
        lightBlue: 'lightBlue',
        orange: 'orange',
        purple: 'purple',
        yellow: 'yellow',
      },
      'grey'
    ),
    size: select(
      'size',
      {
        sm: 'md',
        md: 'md',
      },
      'sm'
    ),
    children: text('children', 'Ron'),
    filled: boolean('filled', false),
    pulsing: boolean('pulsing', false),
    isRemovable: boolean('isRemovable', false),
    isRemoving: boolean('isRemoving', false),
  }
  return <Tag {...props} />
})

stories.add('filled', () => (
  <div>
    <Tag color="red" filled>
      Ron
    </Tag>
    <Tag color="grey" filled>
      Ron
    </Tag>
    <Tag color="green" filled>
      Ron
    </Tag>
    <Tag color="blue" filled>
      Ron
    </Tag>
    <Tag color="orange" filled>
      Ron
    </Tag>
    <Tag color="purple" filled>
      Ron
    </Tag>
    <Tag color="yellow" filled>
      Ron
    </Tag>
    <Tag color="lightBlue" filled>
      Ron
    </Tag>
  </div>
))

stories.add('pulsing', () => (
  <div>
    <Tag color="red" pulsing>
      Ron
    </Tag>
    <Tag color="grey" pulsing>
      Ron
    </Tag>
    <Tag color="green" pulsing>
      Ron
    </Tag>
    <Tag color="blue" pulsing>
      Ron
    </Tag>
    <Tag color="orange" pulsing>
      Ron
    </Tag>
    <Tag color="purple" pulsing>
      Ron
    </Tag>
    <Tag color="yellow" pulsing>
      Ron
    </Tag>
    <Tag color="lightBlue" pulsing>
      Ron
    </Tag>
  </div>
))
