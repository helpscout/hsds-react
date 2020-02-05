import React from 'react'
import { Button, ControlGroup, Icon, Input, Select } from '../index'

export default {
  component: ControlGroup,
  title: 'Components/ControlGroup',
}

export const Default = () => (
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
)

Default.story = {
  name: 'default',
}

export const _Button = () => (
  <ControlGroup>
    <ControlGroup.Item>
      <Button>Button</Button>
    </ControlGroup.Item>
    <ControlGroup.Item>
      <Button>Button</Button>
    </ControlGroup.Item>
    <ControlGroup.Item>
      <Button>Button</Button>
    </ControlGroup.Item>
  </ControlGroup>
)

_Button.story = {
  name: 'button',
}

export const InputButton = () => (
  <ControlGroup>
    <ControlGroup.Item>
      <Input.AddOn>Prefix</Input.AddOn>
    </ControlGroup.Item>
    <ControlGroup.Block>
      <Input value="HELLO" />
    </ControlGroup.Block>
    <ControlGroup.Item>
      <Button kind="secondary" size="lg" isSuffix>
        <Icon name="copy" />
      </Button>
    </ControlGroup.Item>
  </ControlGroup>
)

InputButton.story = {
  name: 'input + button',
}

export const InputSelect = () => (
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
)

InputSelect.story = {
  name: 'input + select',
}
