import React from 'react'
import { ControlGroup, Input, SelectDropdown } from '../index'

export default {
  component: ControlGroup,
  title: 'Components/Forms/ControlGroup',
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

export const InputSelect = () => (
  <ControlGroup>
    <ControlGroup.Item>
      <Input.AddOn>Prefix</Input.AddOn>
    </ControlGroup.Item>
    <ControlGroup.Block>
      <Input value="HELLO" />
    </ControlGroup.Block>
    <ControlGroup.Block>
      <SelectDropdown>
        <option>Hallo</option>
      </SelectDropdown>
    </ControlGroup.Block>
  </ControlGroup>
)

InputSelect.story = {
  name: 'Input with select',
}
