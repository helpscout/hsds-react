import React from 'react'
import { StatusBar } from '../index'

export default {
  component: StatusBar,
  title: 'Components/Text/StatusBar',
}

export const Default = () => (
  <StatusBar isOpen>Status: Click me to close.</StatusBar>
)

Default.story = {
  name: 'default',
}

export const Status = () => (
  <div>
    <StatusBar isOpen closeOnClick={false} status="info" theme="light">
      Info <StatusBar.Button>Button</StatusBar.Button>
    </StatusBar>
    <br />
    <StatusBar isOpen closeOnClick={false} status="error" theme="light">
      Error <StatusBar.Button>Button</StatusBar.Button>
    </StatusBar>
    <br />
    <StatusBar isOpen closeOnClick={false} status="success" theme="light">
      Success <StatusBar.Button>Button</StatusBar.Button>
    </StatusBar>
    <br />
    <StatusBar isOpen closeOnClick={false} status="warning" theme="light">
      Warning <StatusBar.Button>Button</StatusBar.Button>
    </StatusBar>
  </div>
)

Status.story = {
  name: 'Status',
}
