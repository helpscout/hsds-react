import React from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import PopPortal from '../Pop.Portal'

jest.useFakeTimers()

test('Renders a Portal if isOpen', () => {
  const wrapper = mount(
    <PopPortal isOpen={true}>
      <div />
    </PopPortal>
  )

  jest.runOnlyPendingTimers()

  const el = wrapper.find('Portal')

  expect(el.length).toBe(1)
})

test('Does not render a Portal if isOpen is false', () => {
  const wrapper = mount(
    <PopPortal isOpen={false}>
      <div />
    </PopPortal>
  )

  jest.runOnlyPendingTimers()

  const el = wrapper.find('Portal')

  expect(el.length).toBe(0)
})
