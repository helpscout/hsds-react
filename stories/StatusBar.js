import React, { PureComponent as Component } from 'react'
import { storiesOf } from '@storybook/react'
import { StatusBar } from '../src/index.js'

const stories = storiesOf('StatusBar', module)

stories.add('default', () => (
  <StatusBar isOpen>Status: Click me to close.</StatusBar>
))

stories.add('styles', () => (
  <div>
    Light
    <div>
      <StatusBar isOpen closeOnClick={false} status="info" theme="light">
        Info (light). <StatusBar.Button>Button</StatusBar.Button>
      </StatusBar>
      <StatusBar isOpen closeOnClick={false} status="error" theme="light">
        Error (light). <StatusBar.Button>Button</StatusBar.Button>
      </StatusBar>
      <StatusBar isOpen closeOnClick={false} status="success" theme="light">
        Success (light). <StatusBar.Button>Button</StatusBar.Button>
      </StatusBar>
      <StatusBar isOpen closeOnClick={false} status="warning" theme="light">
        Warning (light). <StatusBar.Button>Button</StatusBar.Button>
      </StatusBar>
    </div>
    <br />
    Bold
    <div>
      <StatusBar isOpen closeOnClick={false} status="info" theme="bold">
        Info (bold). <StatusBar.Button>Button</StatusBar.Button>
      </StatusBar>
      <StatusBar isOpen closeOnClick={false} status="error" theme="bold">
        Error (bold). <StatusBar.Button>Button</StatusBar.Button>
      </StatusBar>
      <StatusBar isOpen closeOnClick={false} status="success" theme="bold">
        Success (bold). <StatusBar.Button>Button</StatusBar.Button>
      </StatusBar>
      <StatusBar isOpen closeOnClick={false} status="warning" theme="bold">
        Warning (bold). <StatusBar.Button>Button</StatusBar.Button>
      </StatusBar>
    </div>
    <br />
  </div>
))

stories.add('closeOnClick: Disabled', () => (
  <StatusBar isOpen closeOnClick={false}>
    Status: Can't close me on click. Nice try.
  </StatusBar>
))

stories.add('custom click to close', () => {
  class TestComponent extends Component {
    constructor() {
      super()
      this.state = {
        showStatusBar: true,
      }
      this.toggleShow = this.toggleShow.bind(this)
    }

    toggleShow() {
      this.setState({
        showStatusBar: !this.state.showStatusBar,
      })
    }

    render() {
      const { showStatusBar } = this.state
      const toggleShow = this.toggleShow
      return (
        <StatusBar isOpen={showStatusBar} closeOnClick={false}>
          Status message.{' '}
          <StatusBar.Button onClick={toggleShow} icon="tick">
            Accept
          </StatusBar.Button>
        </StatusBar>
      )
    }
  }

  return <TestComponent />
})
