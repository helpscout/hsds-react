import React from 'react'
import { createSpec, faker } from '@helpscout/helix'
import Flexy from '../Flexy'
import Button from '../Button'
import SplitButton from '.'
import Modal from '../Modal'

export default {
  component: SplitButton,
  title: 'Components/Buttons/SplitButton',
}

const ItemSpec = createSpec({
  label: faker.lorem.words(),
  value: faker.lorem.words(),
  onClick: () => event => console.log('Item Clicked!', event),
})

const dropdownProps = {
  items: ItemSpec.generate(20),
  onSelect: value => console.log(value),
}

export const Default = () => {
  return (
    <SplitButton
      dropdownProps={dropdownProps}
      kind="primary"
      onClick={() => alert('Button Clicked!')}
      size="lg"
    >
      Submit
    </SplitButton>
  )
}

export const Sizes = () => {
  return (
    <div>
      <SplitButton dropdownProps={dropdownProps} kind="tertiary" size="sm">
        Small
      </SplitButton>
      <br />
      <SplitButton dropdownProps={dropdownProps} kind="tertiary" size="md">
        Medium
      </SplitButton>
      <br />
      <SplitButton dropdownProps={dropdownProps} kind="primary" size="lg">
        Large
      </SplitButton>
    </div>
  )
}

Sizes.story = {
  name: 'Sizes',
}

export const Kind = () => {
  return (
    <div>
      <SplitButton kind="primary">Primary</SplitButton>
      <br />
      <SplitButton kind="tertiary">Tertiary</SplitButton>
    </div>
  )
}

Kind.story = {
  name: 'Kind',
}

export const State = () => {
  return (
    <div>
      <SplitButton state="success">Success</SplitButton>
      <br />
      <SplitButton state="danger">Danger</SplitButton>
    </div>
  )
}

State.story = {
  name: 'State',
}

export const Disabled = () => {
  return (
    <div>
      <SplitButton disabled kind="primary" state="success">
        Click Me
      </SplitButton>
      <br />
      <SplitButton disabled kind="tertiary" state="danger">
        Click Me
      </SplitButton>
    </div>
  )
}

Disabled.story = {
  name: 'Disabled',
}
