import React from 'react'
import { shallow } from 'enzyme'
import { TransitionGroup } from 'react-transition-group'
import AnimateGroup from '..'

test('Is a wrapper for TransitionGroup', () => {
  const wrapper = shallow(<AnimateGroup />)

  expect(wrapper.unrendered.type).toBe(TransitionGroup)
})
