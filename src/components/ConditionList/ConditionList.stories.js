import React from 'react'
import { storiesOf } from '@storybook/react'
import Condition from '../Condition'
import ConditionList from '.'

import { boolean } from '@storybook/addon-knobs'
import { jsxDecorator } from 'storybook-addon-jsx'

const stories = storiesOf('ConditionList', module)

stories.addDecorator(jsxDecorator)

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
