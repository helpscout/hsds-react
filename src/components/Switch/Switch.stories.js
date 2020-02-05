import React from 'react'
import { Flexy, Hr, Switch, Text } from '../index'

export default {
  component: Switch,
  title: 'Components/Switch',
}

export const Default = () => (
  <form style={{ width: 300 }}>
    <Hr size="sm" />
    <Flexy>
      <Flexy.Item>
        <Text>Relax</Text>
        <br />
        <Text faint size="13">
          When you want to go to it
        </Text>
      </Flexy.Item>
      <Flexy.Item>
        <Switch />
      </Flexy.Item>
    </Flexy>
    <Hr size="sm" />
    <Flexy>
      <Flexy.Item>
        <Text>Relax (Active)</Text>
        <br />
        <Text faint size="13">
          When you want to go to it
        </Text>
      </Flexy.Item>
      <Flexy.Item>
        <Switch active />
      </Flexy.Item>
    </Flexy>
  </form>
)

Default.story = {
  name: 'default',
}

export const State = () => (
  <form style={{ width: 300 }}>
    <Hr size="sm" />
    <Flexy>
      <Flexy.Item>
        <Text>Relax (Regular)</Text>
        <br />
        <Text faint size="13">
          When you want to go to it
        </Text>
      </Flexy.Item>
      <Flexy.Item>
        <Switch size="sm" />
      </Flexy.Item>
    </Flexy>
    <Hr size="sm" />
    <Flexy>
      <Flexy.Item>
        <Text>Relax (Error)</Text>
        <br />
        <Text faint size="13">
          When you want to go to it
        </Text>
      </Flexy.Item>
      <Flexy.Item>
        <Switch size="sm" state="error" />
      </Flexy.Item>
    </Flexy>
  </form>
)

State.story = {
  name: 'state',
}

export const Disabled = () => (
  <form style={{ width: 300 }}>
    <Hr size="sm" />
    <Flexy>
      <Flexy.Item>
        <Text>Disabled (checked)</Text>
      </Flexy.Item>
      <Flexy.Item>
        <Switch checked disabled size="sm" />
      </Flexy.Item>
    </Flexy>
    <Hr size="sm" />
    <Flexy>
      <Flexy.Item>
        <Text>Disabled</Text>
      </Flexy.Item>
      <Flexy.Item>
        <Switch disabled size="sm" />
      </Flexy.Item>
    </Flexy>
    <Hr size="sm" />
    <Flexy>
      <Flexy.Item>
        <Text>Enabled (checked)</Text>
      </Flexy.Item>
      <Flexy.Item>
        <Switch checked disabled={false} size="sm" />
      </Flexy.Item>
    </Flexy>
    <Hr size="sm" />
    <Flexy>
      <Flexy.Item>
        <Text>Enabled</Text>
      </Flexy.Item>
      <Flexy.Item>
        <Switch disabled={false} size="sm" />
      </Flexy.Item>
    </Flexy>
  </form>
)

Disabled.story = {
  name: 'disabled',
}

export const Loading = () => (
  <form style={{ width: 300 }}>
    <Hr size="sm" />
    <Flexy>
      <Flexy.Item>
        <Text>Relax (Regular)</Text>
        <br />
        <Text faint size="13">
          When you want to go to it
        </Text>
      </Flexy.Item>
      <Flexy.Item>
        <LoadingSwitch />
      </Flexy.Item>
    </Flexy>
  </form>
)

Loading.story = {
  name: 'loading',
}

export const Sizes = () => (
  <form style={{ width: 300 }}>
    <Hr size="sm" />
    <Flexy>
      <Flexy.Item>
        <Text>Relax (Large)</Text>
        <br />
        <Text faint size="13">
          When you want to go to it
        </Text>
      </Flexy.Item>
      <Flexy.Item>
        <Switch size="lg" />
      </Flexy.Item>
    </Flexy>
    <Hr size="sm" />
    <Flexy>
      <Flexy.Item>
        <Text>Relax (Medium)</Text>
        <br />
        <Text faint size="13">
          When you want to go to it
        </Text>
      </Flexy.Item>
      <Flexy.Item>
        <Switch size="md" />
      </Flexy.Item>
    </Flexy>
    <Hr size="sm" />
    <Flexy>
      <Flexy.Item>
        <Text>Relax (Small)</Text>
        <br />
        <Text faint size="13">
          When you want to go to it
        </Text>
      </Flexy.Item>
      <Flexy.Item>
        <Switch size="sm" />
      </Flexy.Item>
    </Flexy>
    <Hr size="sm" />
  </form>
)

Sizes.story = {
  name: 'sizes',
}

class LoadingSwitch extends React.Component {
  state = {
    on: false,
    isLoading: false,
  }

  handleOnClick = () => {
    console.log('click')
    const nextValue = !this.state.on

    this.setState({
      isLoading: true,
    })

    setTimeout(() => {
      this.setState({
        on: nextValue,
        isLoading: false,
      })
    }, 1000)
  }

  handleOnChange = value => {
    console.log('toggle', value, this.state.on)
  }

  render() {
    return (
      <Switch
        value="on"
        checked={this.state.on}
        isLoading={this.state.isLoading}
        onChange={this.handleOnChange}
        onClick={this.handleOnClick}
      />
    )
  }
}

class App extends React.Component {
  state = {
    on: false,
  }

  handleOnChange = value => {
    this.setState({
      on: value,
    })
  }

  render() {
    return (
      <Switch
        value="on"
        checked={this.state.on}
        onChange={this.handleOnChange}
        id="Switch"
      />
    )
  }
}

export const Stateful = () => {
  return <App />
}

Stateful.story = {
  name: 'stateful',
}
