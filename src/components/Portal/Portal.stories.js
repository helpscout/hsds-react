import React from 'react'
import { PortalWrapper } from '../index'

export default {
  component: PortalWrapper,
  title: 'Utilities/PortalWrapper',
}

export const Default = () => {
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
}
