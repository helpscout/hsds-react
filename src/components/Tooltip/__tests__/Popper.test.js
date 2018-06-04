import React from 'react'
import Popper from '../Popper'
import { mount, shallow } from 'enzyme'

describe('classNames', () => {
  test('Can accept custom className', () => {
    const wrapper = shallow(<Popper className="derek" />)

    expect(wrapper.hasClass('derek')).toBe(true)
  })

  test('Has unique styled className', () => {
    const wrapper = mount(<Popper />)
    const styles = wrapper.instance().styles

    expect(wrapper.hasClass(styles.TooltipPopper)).toBe(true)
  })
})

describe('Children', () => {
  test('Can render children', () => {
    const wrapper = shallow(
      <Popper>
        <div className="ron" />
      </Popper>
    )
    const el = wrapper.find('.ron')

    expect(el.length).toBeTruthy()
  })
})
