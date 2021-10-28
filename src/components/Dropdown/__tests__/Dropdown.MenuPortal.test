import React from 'react'
import { mount } from 'enzyme'
import DropdownMenuPortal from '../Dropdown.MenuPortal'

jest.useFakeTimers()

test('Renders a Portal if isOpen', () => {
  const wrapper = mount(
    <DropdownMenuPortal isOpen={true}>
      <div />
    </DropdownMenuPortal>
  )

  jest.runAllTimers()

  const el = wrapper.find('Portal')

  expect(el.length).toBeTruthy()
})

test('Does not render a Portal if isOpen is false', () => {
  const wrapper = mount(
    <DropdownMenuPortal isOpen={false}>
      <div />
    </DropdownMenuPortal>
  )

  jest.runAllTimers()

  const el = wrapper.find('Portal')

  expect(el.length).toBe(0)
})
