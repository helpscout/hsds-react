import React from 'react'
import { shallow } from 'enzyme'
import ChatBlock from '../ChatBlock'
import Timestamp from '../Timestamp'
import { Text } from '../../'

const cx = 'c-MessageTimestamp'

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
