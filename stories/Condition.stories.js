import React from 'react'
import { storiesOf } from '@storybook/react'
import { withMotion } from '@helpscout/motion'
import { faker } from '@helpscout/helix'
import Button from '../src/components/Button'
import ConditionList from '../src/components/ConditionList'
import Condition from '../src/components/Condition'
import ConditionField from '../src/components/ConditionField'
import Flexy from '../src/components/Flexy'
import Input from '../src/components/Input'
import Select from '../src/components/Select'
import ReadMe from '../src/components/Condition/README.md'
import Page from '../src/components/Page'

import { boolean } from '@storybook/addon-knobs'
import { jsxDecorator } from 'storybook-addon-jsx'

const stories = storiesOf('Condition', module)

stories.addDecorator(jsxDecorator)

stories.addParameters({
  readme: { sidebar: ReadMe },
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

const TimeOnPageCondition = ({ error, onRemove, value, time, ...rest }) => (
  <Condition options={options} value="time-on-page" {...rest}>
    <ConditionField onRemove={onRemove}>
      <ConditionField.Item>
        <ConditionField.Static>Show after</ConditionField.Static>
      </ConditionField.Item>
      <ConditionField.Block>
        <Flexy gap="xs">
          <Flexy.Item>
            <Input
              inputType="number"
              autoComplete="off"
              width={error ? 75 : 55}
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

const PageViewCondition = ({ error, onRemove, value, ...rest }) => (
  <Condition options={options} value="page-views" {...rest}>
    <ConditionField onRemove={onRemove}>
      <ConditionField.Item>
        <Input
          inputType="number"
          autoComplete="off"
          width={error ? 75 : 55}
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

const RepeatPageViewCondition = ({ error, onRemove, value, ...rest }) => (
  <Condition options={options} value="repeat-page-views" {...rest}>
    <ConditionField onRemove={onRemove}>
      <ConditionField.Item>
        <Input
          inputType="number"
          autoComplete="off"
          width={error ? 75 : 55}
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

const PageScrollCondition = ({ onRemove, ...rest }) => (
  <Condition options={options} value="page-scroll" {...rest}>
    <ConditionField onRemove={onRemove}>
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

const ComponentMap = {
  'time-on-page': TimeOnPageCondition,
  'repeat-page-views': RepeatPageViewCondition,
  'page-views': PageViewCondition,
  'page-scroll': PageScrollCondition,
}

const ConditionElement = ({ type, ...rest }) => {
  const Component = ComponentMap[type] || ComponentMap['time-on-page']

  return (
    <div>
      <Component {...rest} />
    </div>
  )
}

const AnimatedComponent = withMotion({
  componentDidMount: ({ animate, node }) => {
    return animate({
      keyframes: [
        {
          height: [0, node.clientHeight],
          opacity: [0, 1],
        },
      ],
      duration: 350,
      easing: 'linear',
    }).finished.then(() => {
      node.style.height = 'auto'
    })
  },
  componentWillUnmount: ({ animate, node }) => {
    node.style.height = `${node.clientHeight}px`

    return animate({
      keyframes: [
        {
          opacity: [1, 0],
        },
        {
          height: 0,
        },
      ],
      duration: 350,
      easing: 'linear',
    }).finished
  },
})(ConditionElement)

const createCondition = value => ({
  id: faker.random.uuid()(),
  value,
})
class ConditionBuilder extends React.Component {
  state = {
    conditions: [createCondition('time-on-page')],
  }

  handleOnAdd = () => {
    this.setState({
      conditions: [...this.state.conditions, createCondition('time-on-page')],
    })
  }

  handleOnChange = (id, value) => {
    const conditions = this.state.conditions.map(item => {
      if (item.id !== id) return item

      return {
        ...item,
        value,
      }
    })
    this.setState({
      conditions,
    })
  }

  handleOnRemove = id => {
    const conditions = this.state.conditions.filter(item => item.id !== id)
    this.setState({
      conditions,
    })
  }

  render() {
    const { error, isAddEnabled } = this.props
    return (
      <ConditionList isAddEnabled={isAddEnabled} onAdd={this.handleOnAdd}>
        <TimeOnPageCondition error={error} value={5} />
        <PageViewCondition error={error} value={5} />
        <RepeatPageViewCondition error={error} value={2} />
        <PageScrollCondition />
        <SpecificUrlCondition />
        {this.state.conditions.map((condition, index) => {
          return (
            <AnimatedComponent
              type={condition.value}
              error={error}
              onChange={value => this.handleOnChange(condition.id, value)}
              value={5}
              key={condition.id}
              onRemove={() => this.handleOnRemove(condition.id)}
            />
          )
        })}
      </ConditionList>
    )
  }
}

stories.add('Default', () => {
  const error = boolean('error', false)
  const isWithAnd = boolean('isWithAnd', false)

  return <TimeOnPageCondition error={error} value={5} isWithAnd={isWithAnd} />
})

stories.add('Builder', () => {
  const error = boolean('error', false)
  const isAddEnabled = boolean('isAddEnabled', true)

  return (
    <Page isResponsive={false}>
      <Page.Card>
        <Page.Section>
          <ConditionBuilder error={error} isAddEnabled={isAddEnabled} />
        </Page.Section>
      </Page.Card>
      <Page.Actions
        primary={
          <Button kind="primary" version={2}>
            Save Changes
          </Button>
        }
      />
    </Page>
  )
})
