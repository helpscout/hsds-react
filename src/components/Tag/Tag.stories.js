import React from 'react'
import { boolean, select, text } from '@storybook/addon-knobs'
import { Tag } from '../index'

export default {
  component: Tag,
  title: 'Components/Badges/Tag',
}

export const Default = () => {
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
}

export const Filled = () => (
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
)

Filled.story = {
  name: 'filled',
}

export const Pulsing = () => (
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
)

Pulsing.story = {
  name: 'pulsing',
}
