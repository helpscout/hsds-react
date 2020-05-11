import React from 'react'
import { action } from '@storybook/addon-actions'
import { CopyInput } from '../index'

export default {
  component: CopyInput,
  title: 'Components/Forms/CopyInput',
}

export const Default = () => (
  <CopyInput autoFocus={true} value="testing" onCopy={action('Copy')} />
)

export const ReadOnly = () => (
  <CopyInput value="secretkey" onCopy={action('Copy')} readOnly />
)

ReadOnly.story = {
  name: 'Read-only',
}
