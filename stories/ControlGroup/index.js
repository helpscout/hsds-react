import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button, ControlGroup, Input, Select } from '../../src/index.js'

const stories = storiesOf('ControlGroup', module)

stories.add('default', () => (
  <ControlGroup>
    <ControlGroup.Item>
      <Input.AddOn>Prefix</Input.AddOn>
    </ControlGroup.Item>
    <ControlGroup.Block>
      <Input value="HELLO" />
    </ControlGroup.Block>
    <ControlGroup.Item>
      <Input.AddOn>Suffix</Input.AddOn>
    </ControlGroup.Item>
  </ControlGroup>
))

stories.add('input + button', () => (
  <ControlGroup>
    <ControlGroup.Item>
      <Input.AddOn>Prefix</Input.AddOn>
    </ControlGroup.Item>
    <ControlGroup.Block>
      <Input value="HELLO" />
    </ControlGroup.Block>
    <ControlGroup.Item>
      <Button version={2} primary>
        Button
      </Button>
    </ControlGroup.Item>
  </ControlGroup>
))

stories.add('input + select', () => (
  <ControlGroup>
    <ControlGroup.Item>
      <Input.AddOn>Prefix</Input.AddOn>
    </ControlGroup.Item>
    <ControlGroup.Block>
      <Input value="HELLO" />
    </ControlGroup.Block>
    <ControlGroup.Block>
      <Select>
        <option>Hallo</option>
      </Select>
    </ControlGroup.Block>
  </ControlGroup>
))
