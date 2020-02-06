import React from 'react'
import { storiesOf } from '@storybook/react'
import TypingDots from '../src/components/TypingDots'

export default {
  component: TypingDots,
  title: 'Components/Elements/TypingDots',
}

export const Default = () => <TypingDots />

Default.story = {
  name: 'default',
}
