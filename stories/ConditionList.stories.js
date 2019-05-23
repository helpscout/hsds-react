import React from 'react'
import { storiesOf } from '@storybook/react'
import Condition from '../src/components/Condition'
import ConditionList from '../src/components/ConditionList'
import ReadMe from '../src/components/ConditionList/README.md'

import { boolean } from '@storybook/addon-knobs'
import { jsxDecorator } from 'storybook-addon-jsx'

const stories = storiesOf('ConditionList', module)

stories.addDecorator(jsxDecorator)

stories.addParameters({
  readme: { sidebar: ReadMe },
})

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
