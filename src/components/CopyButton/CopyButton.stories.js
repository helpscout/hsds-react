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

export const Medium = () => (
  <CopyButton onClick={action('Click')} onReset={action('Reset')} size="md" />
)

export const Small = () => (
  <CopyButton onClick={action('Click')} onReset={action('Reset')} size="sm" />
)

export const Icon = () => (
  <CopyButton
    onClick={action('Click')}
    onReset={action('Reset')}
    size="lg"
    icon="copy-small"
    label={false}
  />
)
