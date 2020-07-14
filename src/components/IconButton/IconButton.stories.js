import React from 'react'
import { boolean, number, text, select } from '@storybook/addon-knobs'
import IconButton from '.'

export default {
  component: IconButton,
  title: 'Components/Buttons/IconButton',
}

export const Default = () => {
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
        tertiary: 'tertiary',
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
}
