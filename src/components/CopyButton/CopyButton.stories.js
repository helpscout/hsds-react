import React from 'react'
import { action } from '@storybook/addon-actions'
import { CopyButton } from '../index'

export default {
  component: CopyButton,
  title: 'Components/Buttons/CopyButton',
}

export const Default = () => (
  <CopyButton onClick={action('Click')} onReset={action('Reset')} />
)
