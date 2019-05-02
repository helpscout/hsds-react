import React from 'react'
import { storiesOf } from '@storybook/react'
import IconButton from '../src/components/IconButton'
import { boolean, number, text, select } from '@storybook/addon-knobs'

const stories = storiesOf('IconButton', module)

stories.add('Default', () => {
  const props = {
    icon: text('icon', 'search'),
    iconSize: number('iconSize', 24),
    shape: select(
      'shape',
      {
        circle: 'circle',
        default: 'default',
      },
      'circle'
    ),
    kind: select(
      'kind',
      {
        primary: 'primary',
        primaryAlt: 'primaryAlt',
        secondary: 'secondary',
        secondaryAlt: 'secondaryAlt',
        default: 'default',
        link: 'link',
      },
      'secondary'
    ),
    size: select(
      'size',
      {
        xl: 'xl',
        lgxl: 'lgxl',
        lg: 'lg',
        md: 'md',
        sm: 'sm',
        xs: 'xs',
      },
      'lg'
    ),
    isBorderless: boolean('isBorderless', true),
    withCaret: boolean('withCaret', false),
  }
  return <IconButton {...props} />
})
