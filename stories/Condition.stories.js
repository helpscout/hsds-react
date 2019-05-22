import React from 'react'
import { storiesOf } from '@storybook/react'
import ConditionList from '../src/components/ConditionList'
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

const TimeOnPageCondition = ({ error, value, time }) => (
  <Condition options={options} value="time-on-page">
    <ConditionField>
      <ConditionField.Item>
        <ConditionField.Static>Show after</ConditionField.Static>
      </ConditionField.Item>
      <ConditionField.Block>
        <Flexy gap="xs">
          <Flexy.Item>
            <Input
              inputType="number"
              width={error ? 75 : 50}
              value={value}
              state={error && 'error'}
            />
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

const PageViewCondition = ({ error, value }) => (
  <Condition options={options} value="page-views">
    <ConditionField>
      <ConditionField.Item>
        <Input
          inputType="number"
          width={error ? 75 : 50}
          value={value}
          state={error && 'error'}
        />
      </ConditionField.Item>
      <ConditionField.Block>
        <ConditionField.Static>
          Page views on your site by the visitor
        </ConditionField.Static>
      </ConditionField.Block>
    </ConditionField>
  </Condition>
)

const RepeatPageViewCondition = ({ error, value }) => (
  <Condition options={options} value="repeat-page-views">
    <ConditionField>
      <ConditionField.Item>
        <Input
          inputType="number"
          width={error ? 75 : 50}
          value={value}
          state={error && 'error'}
        />
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

class SpecificUrlCondition extends React.Component {
  state = {
    urls: [undefined],
  }

  handleOnAdd = () => {
    this.setState({
      urls: [...this.state.urls, undefined],
    })
  }

  handleOnChange = (value, index) => {
    const urls = this.state.urls
    urls[index] = value

    this.setState({
      urls,
    })
  }

  handleOnRemove = index => {
    const urls = this.state.urls.filter((url, i) => i !== index)
    this.setState({
      urls,
    })
  }

  render() {
    const isAddEnabled = this.state.urls.length <= 2
    const removeTitle = this.state.urls.length === 1 ? 'Remove' : 'Remove URL'
    return (
      <Condition options={options} value="specific-url">
        <ConditionField.Group
          onAdd={this.handleOnAdd}
          isAddEnabled={isAddEnabled}
        >
          {this.state.urls.map((url, index) => (
            <ConditionField
              key={index}
              onRemove={() => this.handleOnRemove(index)}
              removeTitle={removeTitle}
            >
              <ConditionField.Block>
                <Input
                  autoComplete="off"
                  onChange={value => this.handleOnChange(value, index)}
                  placeholder="https://example.com/"
                  value={url}
                />
              </ConditionField.Block>
            </ConditionField>
          ))}
        </ConditionField.Group>
      </Condition>
    )
  }
}

stories.add('Default', () => {
  const error = boolean('error', false)
  const isAddEnabled = boolean('isAddEnabled', true)

  return (
    <Page isResponsive={false}>
      <Page.Card>
        <Page.Section>
          <ConditionList isAddEnabled={isAddEnabled}>
            <TimeOnPageCondition error={error} value={5} />
            <PageViewCondition error={error} value={5} />
            <RepeatPageViewCondition error={error} value={2} />
            <PageScrollCondition />
            <SpecificUrlCondition />
          </ConditionList>
        </Page.Section>
      </Page.Card>
    </Page>
  )
})
