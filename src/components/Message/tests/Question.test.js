import React from 'react'
import { shallow } from 'enzyme'
import Question from '../Question'
import Chat from '../Chat'

test('Returns a Chat component', () => {
  const wrapper = shallow(<Question />)
  const o = wrapper.find(Chat)

  expect(o.length).toBeTruthy()
})

test('Returns a Chat component with customized props', () => {
  const wrapper = shallow(<Question />)
  const o = wrapper.find(Chat)
  const p = o.props()

  expect(p.primary).toBeTruthy()
  expect(p.title).toContain('Question:')
})
