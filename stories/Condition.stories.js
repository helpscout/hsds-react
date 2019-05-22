import React from 'react'
import { storiesOf } from '@storybook/react'
import Condition from '../src/components/Condition'
import ConditionField from '../src/components/ConditionField'
import Flexy from '../src/components/Flexy'
import Input from '../src/components/Input'
import Select from '../src/components/Select'
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

const options = [
  {
    label: 'Time on page',
    value: 'time-on-page',
  },
  {
    label: 'Page views',
    value: 'page-views',
  },
  {
    label: 'Repeat page views',
    value: 'repeat-page-views',
  },
  {
    label: 'Page scroll',
    value: 'page-scroll',
  },
  {
    label: 'Specific URL',
    value: 'specific-url',
  },
  {
    label: 'Identify attribute',
    value: 'identify-attribute',
  },
  {
    label: 'Last page viewed',
    value: 'last-page-viewed',
  },
]

const TimeOnPageCondition = ({ value, time }) => (
  <Condition options={options} value="time-on-page">
    <ConditionField>
      <ConditionField.Item>
        <ConditionField.Static>Show after</ConditionField.Static>
      </ConditionField.Item>
      <ConditionField.Block>
        <Flexy gap="xs">
          <Flexy.Item>
            <Input inputType="number" width={50} value={value} />
          </Flexy.Item>
          <Flexy.Block>
            <Select
              options={[
                {
                  label: 'Seconds',
                  value: 'seconds',
                },
                {
                  label: 'Minutes',
                  value: 'minutes',
                },
              ]}
              width={160}
              value={time}
            />
          </Flexy.Block>
        </Flexy>
      </ConditionField.Block>
    </ConditionField>
  </Condition>
)

const PageViewCondition = ({ value }) => (
  <Condition options={options} value="page-views">
    <ConditionField>
      <ConditionField.Item>
        <Input inputType="number" width={50} value={value} />
      </ConditionField.Item>
      <ConditionField.Block>
        <ConditionField.Static>
          Page views on your site by the visitor
        </ConditionField.Static>
      </ConditionField.Block>
    </ConditionField>
  </Condition>
)

const RepeatPageViewCondition = ({ value }) => (
  <Condition options={options} value="repeat-page-views">
    <ConditionField>
      <ConditionField.Item>
        <Input inputType="number" width={50} value={value} />
      </ConditionField.Item>
      <ConditionField.Block>
        <ConditionField.Static>
          Repeat views of the same page
        </ConditionField.Static>
      </ConditionField.Block>
    </ConditionField>
  </Condition>
)

const PageScrollCondition = props => (
  <Condition options={options} value="page-scroll">
    <ConditionField>
      <ConditionField.Block>
        <ConditionField.Static>
          Triggers when the scrollbar is used
        </ConditionField.Static>
      </ConditionField.Block>
    </ConditionField>
  </Condition>
)

stories.add('Default', () => {
  return (
    <Page isResponsive={false}>
      <Page.Card>
        <Page.Section>
          <TimeOnPageCondition value={5} />
          <Condition.Operator type="and" />
          <PageViewCondition value={5} />
          <Condition.Operator type="and" />
          <RepeatPageViewCondition value={2} />
          <Condition.Operator type="and" />
          <PageScrollCondition />
          <Condition.AddButton type="and" />
          <Condition.AddButton type="or" />
        </Page.Section>
      </Page.Card>
    </Page>
  )
})
