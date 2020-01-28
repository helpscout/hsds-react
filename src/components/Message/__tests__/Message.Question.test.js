import * as React from 'react'
import { mount } from 'enzyme'
import Question from '../Message.Question'
import Chat from '../Message.Chat'

test('Returns a Chat component', () => {
  const wrapper = mount(<Question />)
  const o = wrapper.find(Chat)

  expect(o.length).toBeTruthy()
})

test('Returns a Chat component with customized props', () => {
  const wrapper = mount(<Question />)
  const o = wrapper.find(Chat)
  const p = o.props()

  expect(p.primary).toBeTruthy()
  expect(p.title).toContain('Question:')
})
