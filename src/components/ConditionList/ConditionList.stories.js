import React from 'react'
import { storiesOf } from '@storybook/react'
import Condition from '../Condition'
import ConditionList from '.'

import { boolean } from '@storybook/addon-knobs'

const stories = storiesOf('ConditionList', module)

stories.add('Default', () => {
  const props = {
    isAddEnabled: boolean('isAddEnabled', true),
    isWithOffset: boolean('isWithOffset', false),
  }

  return (
    <ConditionList {...props}>
      <Condition />
      <Condition />
    </ConditionList>
  )
})
