import React from 'react'
import { mount } from 'enzyme'
import Code from '../Code'
import { baseComponentTest } from '../../../tests/helpers/components'

const baseComponentOptions = {
  className: 'c-Code',
}

baseComponentTest(Code, baseComponentOptions)

test('Renders a code selector', () => {
  const wrapper = mount(<Code />)
  const o = wrapper.find('code')

  expect(o.length).toBeTruthy()
})
