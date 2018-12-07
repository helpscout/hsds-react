import React from 'react'
import { storiesOf } from '@storybook/react'
import { Portal, PortalWrapper } from '../src/index'

const stories = storiesOf('Portal', module)

stories.add('Default', () => {
  class PortalExample extends React.PureComponent {
    render() {
      return <div>Hallo</div>
    }
  }

  const WrappedPortalExample = PortalWrapper()(PortalExample)

  class Example extends React.PureComponent {
    state = {
      show: false,
    }
    toggle = () => {
      this.setState({
        show: !this.state.show,
      })
    }
    render() {
      return (
        <div>
          <button onClick={this.toggle}>Toggle Portaled Element</button>
          <WrappedPortalExample isOpen={this.state.show} timeout={0} />
        </div>
      )
    }
  }

  return <Example />
})
