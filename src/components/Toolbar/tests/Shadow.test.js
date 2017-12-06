import React from 'react'
import { shallow } from 'enzyme'
import Shadow from '../Shadow'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Shadow />)

    expect(wrapper.hasClass('c-ToolbarShadow')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<Shadow className={customClass} />)

    expect(wrapper.hasClass(customClass)).toBe(true)
  })
})

describe('Children', () => {
  test('Does not render children', () => {
    const wrapper = shallow(
      <Shadow>
        <div className='mugatu'>That Hansel!</div>
      </Shadow>
    )
    const o = wrapper.find('.mugatu')

    expect(o.length).toBe(0)
  })
})

describe('Placement', () => {
  test('Has a top placement by default', () => {
    const wrapper = shallow(<Shadow />)

    expect(wrapper.hasClass('is-placement-top')).toBe(true)
    expect(wrapper.hasClass('is-placement-bottom')).not.toBe(true)
  })

  test('Can define a bottom placement', () => {
    const wrapper = shallow(<Shadow placement='bottom' />)

    expect(wrapper.hasClass('is-placement-top')).not.toBe(true)
    expect(wrapper.hasClass('is-placement-bottom')).toBe(true)
  })
})
