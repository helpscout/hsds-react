import React from 'react'
import { boolean, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { CloseButton } from '../index'

export default {
  component: CloseButton,
  title: 'To Delete/CloseButton',
}

export const Default = () => {
  const options = {
    onClick: action('click'),
    seamless: boolean('seamless', true),
    size: select(
      'size',
      {
        lg: 'md',
        md: 'sm',
        sm: 'xs',
      },
      'md'
    ),
  }
  return <CloseButton {...options} />
}
