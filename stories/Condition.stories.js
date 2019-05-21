import React from 'react'
import { storiesOf } from '@storybook/react'
import Condition from '../src/components/Condition'
import ConditionField from '../src/components/ConditionField'
import Flexy from '../src/components/Flexy'
import Input from '../src/components/Input'
import Text from '../src/components/Text'
import ConditionReadme from '../src/components/Condition/README.md'
import Page from '../src/components/Page'

import {
  withKnobs,
  boolean,
  number,
  text,
  select,
} from '@storybook/addon-knobs'
import { jsxDecorator } from 'storybook-addon-jsx'

const stories = storiesOf('Condition', module)

stories.addDecorator(jsxDecorator)

stories.addParameters({
  readme: { sidebar: ConditionReadme },
  a11y: { element: 'c-Condition' },
})

stories.add('Default', () => {
  const props = {
    isMultiCondition: true,
    options: [
      {
        label: 'Time on page',
        value: 'time-on-page',
      },
    ],
  }
  return (
    <Page isResponsive={false}>
      <Page.Card>
        <Condition {...props}>
          <ConditionField>
            <Flexy align="top" gap="md">
              <Flexy.Item>
                <Input
                  autocomplete="off"
                  value={5}
                  inputType="number"
                  width={50}
                />
              </Flexy.Item>
              <Flexy.Block>
                <ConditionField.Static>
                  Page views on your site by the visitor
                </ConditionField.Static>
              </Flexy.Block>
            </Flexy>
          </ConditionField>
          <Condition.Operator type="or" />
          <ConditionField>
            <Flexy align="top" gap="md">
              <Flexy.Item>
                <ConditionField.Static>Show after</ConditionField.Static>
              </Flexy.Item>
              <Flexy.Block>
                <Input
                  autocomplete="off"
                  value={5}
                  inputType="number"
                  width={50}
                />
              </Flexy.Block>
            </Flexy>
          </ConditionField>
          <Condition.Operator type="or" />
          <ConditionField>
            <Input autocomplete="off" />
          </ConditionField>
          <Condition.Operator type="or" />
          <ConditionField>
            <Input autocomplete="off" />
          </ConditionField>
        </Condition>
      </Page.Card>
    </Page>
  )
})
