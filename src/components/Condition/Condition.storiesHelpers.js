import React from 'react'
import { withMotion } from '@helpscout/motion'
import { faker } from '@hsds/helix'
import Condition from '.'
import ConditionList from '../ConditionList'
import ConditionField from '../ConditionField'
import Flexy from '../Flexy'
import Input from '../Input'

import { boolean } from '@storybook/addon-knobs'
import DropList from '../DropList/DropList'
import { SelectTag } from '../DropList/DropList.togglers'

export default {
  component: Condition,
  title: 'Components/Forms/Condition',
}

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
    label: 'Specific URL',
    value: 'specific-url',
  },
  {
    label: 'Last Page Viewed',
    value: 'last-page',
  },
]

let ANIMATION_DURATION = 0
const fadeInAnimation = ({ animate, node }) => {
  if (!ANIMATION_DURATION) return Promise.resolve()

  node.style.opacity = '0'

  return animate({
    keyframes: [
      {
        height: [0, node.clientHeight],
      },
      {
        opacity: [0, 1],
      },
    ],
    duration: ANIMATION_DURATION,
    easing: 'linear',
  }).finished.then(() => {
    node.style.height = 'auto'
  })
}

const fadeOutAnimation = ({ animate, node }) => {
  if (!ANIMATION_DURATION) return Promise.resolve()

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
    duration: ANIMATION_DURATION,
    easing: 'linear',
  }).finished
}

const TimeOnPageCondition = ({ error, onRemove, value, time, ...rest }) => {
  const items = [
    {
      label: 'Seconds',
      value: 'seconds',
    },
    {
      label: 'Minutes',
      value: 'minutes',
    },
  ]
  return (
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
                maxLength={3}
                autoComplete="off"
                width={error ? 75 : 60}
                value={value || ''}
                state={error ? 'error' : ''}
              />
            </Flexy.Item>
            <Flexy.Block>
              <DropList
                items={items}
                width={160}
                value={items.find(item => item.value === time)}
                toggler={<SelectTag />}
              />
            </Flexy.Block>
          </Flexy>
        </ConditionField.Block>
      </ConditionField>
    </Condition>
  )
}

const PageViewCondition = ({ error, onRemove, value, ...rest }) => (
  <Condition options={options} value="page-views" {...rest}>
    <ConditionField onRemove={onRemove}>
      <ConditionField.Item>
        <Input
          inputType="number"
          maxLength={3}
          autoComplete="off"
          width={error ? 75 : 60}
          value={value || ''}
          state={error ? 'error' : ''}
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
          maxLength={3}
          autoComplete="off"
          width={error ? 75 : 60}
          value={value || ''}
          state={error ? 'error' : ''}
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

const URLConditionField = ({
  onRemove,
  removeTitle,
  onChange,
  url,
  ...rest
}) => {
  return (
    <ConditionField onRemove={onRemove} removeTitle={removeTitle} {...rest}>
      <ConditionField.Block>
        <Input
          autoComplete="off"
          onChange={onChange}
          placeholder="https://example.com/"
          value={url}
        />
      </ConditionField.Block>
    </ConditionField>
  )
}

const AnimatedURLConditionField = withMotion({
  componentDidMount: fadeInAnimation,
  componentWillUnmount: fadeOutAnimation,
})(URLConditionField)

const createUrlField = value => ({
  id: faker.datatype.uuid()(),
  value,
})
class SpecificUrlCondition extends React.Component {
  state = {
    urls: [createUrlField('')],
  }

  handleOnAdd = () => {
    this.setState({
      urls: [...this.state.urls, createUrlField('')],
    })
  }

  handleOnChange = (value, id) => {
    const urls = this.state.urls.map(url => {
      if (url.id !== id) return url

      return {
        ...url,
        value,
      }
    })

    this.setState({
      urls,
    })
  }

  handleOnRemove = id => {
    let urls = this.state.urls.filter(url => url.id !== id)
    if (urls.length === 0) {
      urls = [createUrlField('')]
    }

    this.setState({
      urls,
    })
  }

  render() {
    const isAddEnabled = this.state.urls.length <= 2
    const removeTitle = this.state.urls.length === 1 ? 'Remove' : 'Remove URL'
    const { singleOption } = this.props
    const urlOptions = singleOption
      ? [
          {
            label: 'Specific URL',
            value: 'specific-url',
          },
        ]
      : options
    return (
      <Condition options={urlOptions} {...this.props} value="specific-url">
        <ConditionField.Group
          onAdd={this.handleOnAdd}
          isAddEnabled={isAddEnabled}
        >
          {this.state.urls.map((url, index) => (
            <AnimatedURLConditionField
              key={url.id}
              onRemove={() => this.handleOnRemove(url.id)}
              onChange={value => this.handleOnChange(value, url.id)}
              removeTitle={removeTitle}
              url={url.value}
            />
          ))}
        </ConditionField.Group>
      </Condition>
    )
  }
}

class LastPageCondition extends React.Component {
  state = {
    urls: [createUrlField('')],
    conjunction: 'or',
  }

  handleOnAdd = () => {
    this.setState({
      urls: [...this.state.urls, createUrlField('')],
    })
  }

  handleOnChange = (value, id) => {
    const urls = this.state.urls.map(url => {
      if (url.id !== id) return url

      return {
        ...url,
        value,
      }
    })

    this.setState({
      urls,
    })
  }

  handleConjunctionChange = conjunction => {
    this.setState({
      conjunction,
    })
  }

  handleOnRemove = id => {
    let urls = this.state.urls.filter(url => url.id !== id)
    if (urls.length === 0) {
      urls = [createUrlField('')]
    }

    this.setState({
      urls,
    })
  }

  render() {
    const isAddEnabled = this.state.urls.length <= 2
    const removeTitle = this.state.urls.length === 1 ? 'Remove' : 'Remove URL'

    return (
      <Condition options={options} {...this.props} value="last-page">
        <ConditionField.Group
          onAdd={this.handleOnAdd}
          isAddEnabled={isAddEnabled}
          canChangeConjunction
          conjunction={this.state.conjunction}
          onConjunctionChange={this.handleConjunctionChange}
        >
          {this.state.urls.map((url, index) => (
            <AnimatedURLConditionField
              key={url.id}
              onRemove={() => this.handleOnRemove(url.id)}
              onChange={value => this.handleOnChange(value, url.id)}
              removeTitle={removeTitle}
              url={url.value}
            />
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
  'specific-url': SpecificUrlCondition,
  'last-page': LastPageCondition,
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
  componentDidMount: fadeInAnimation,
  componentWillUnmount: fadeOutAnimation,
})(ConditionElement)

const createCondition = value => ({
  id: faker.datatype.uuid()(),
  value,
})
class ConditionBuilder extends React.Component {
  state = {
    conditions: [createCondition('time-on-page')],
  }

  componentDidMount() {
    ANIMATION_DURATION = 250
  }

  componentWillUnmount() {
    ANIMATION_DURATION = 0
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
        <SpecificUrlCondition singleOption />
        <LastPageCondition noSelect={true} />
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

export const Builder = () => {
  const error = boolean('error', false)
  const isAddEnabled = boolean('isAddEnabled', true)

  return <ConditionBuilder error={error} isAddEnabled={isAddEnabled} />
}
