import React from 'react'
import { Toolbar } from '../index'

export default {
  component: Toolbar,
  title: 'Components/Conversation/Toolbar',
}

export const Default = () => (
  <Toolbar>
    <Toolbar.Item>Left Content</Toolbar.Item>
    <Toolbar.Item>Right Content</Toolbar.Item>
  </Toolbar>
)

Default.story = {
  name: 'default',
}

export const Placement = () => (
  <div>
    <Toolbar placement="top">
      <Toolbar.Item>Left Content</Toolbar.Item>
      <Toolbar.Item>Right Content</Toolbar.Item>
    </Toolbar>
    <br />
    <Toolbar placement="bottom">
      <Toolbar.Item>Left Content</Toolbar.Item>
      <Toolbar.Item>Right Content</Toolbar.Item>
    </Toolbar>
  </div>
)

Placement.story = {
  name: 'placement',
}

export const Shadow = () => (
  <div>
    <Toolbar placement="top" shadow>
      <Toolbar.Item>Left Content</Toolbar.Item>
      <Toolbar.Item>Right Content</Toolbar.Item>
    </Toolbar>
    <br />
    <br />
    <br />
    <Toolbar placement="bottom" shadow>
      <Toolbar.Item>Left Content</Toolbar.Item>
      <Toolbar.Item>Right Content</Toolbar.Item>
    </Toolbar>
  </div>
)

Shadow.story = {
  name: 'shadow',
}

export const Themes = () => (
  <div>
    <Toolbar placement="top" shadow theme="default">
      <Toolbar.Item>Left Content</Toolbar.Item>
      <Toolbar.Item>Right Content</Toolbar.Item>
    </Toolbar>
    <br />
    <br />
    <br />
    <Toolbar placement="bottom" shadow theme="note">
      <Toolbar.Item>Left Content</Toolbar.Item>
      <Toolbar.Item>Right Content</Toolbar.Item>
    </Toolbar>
  </div>
)

Themes.story = {
  name: 'themes',
}
