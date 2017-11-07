import React from 'react'
import { shallow } from 'enzyme'
import Timestamp from '..'
import { Icon, Text } from '../../'

const cx = 'c-Timestamp'

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Timestamp />)
    const o = wrapper.find(`.${cx}`)

    expect(o.length).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = shallow(<Timestamp className='mugatu' />)
    const o = wrapper.find(`.${cx}`)

    expect(o.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Content', () => {
  test('Does not render children components', () => {
    const wrapper = shallow(
      <Timestamp>Mugatu</Timestamp>
    )

    expect(wrapper.html()).not.toContain('Mugatu')
  })

  test('Wraps timestamp in a Text component', () => {
    const wrapper = shallow(
      <Timestamp timestamp='noon' />
    )
    const o = wrapper.find(Text)
    const t = o.find('time')

    expect(o.length).toBeTruthy()
    expect(t).toBeTruthy()
    expect(t.html()).toContain('noon')
  })
})

describe('Icon', () => {
  test('Does not show read icon by default', () => {
    const wrapper = shallow(
      <Timestamp timestamp='noon' />
    )
    const o = wrapper.find(Icon)

    expect(o.length).not.toBeTruthy()
  })

  test('Does shows read icon if read', () => {
    const wrapper = shallow(
      <Timestamp timestamp='noon' read />
    )
    const o = wrapper.find(Icon)

    expect(o.length).toBeTruthy()
    expect(o.props().name).toContain('tick')
  })
})
