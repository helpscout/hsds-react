import React from 'react'
import { mount } from 'enzyme'
import Block from '../Block'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = mount(<Block />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SkeletonBlock')
    ).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = mount(<Block className="ron" />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SkeletonBlock')
    ).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('ron')).toBeTruthy()
  })
})

describe('Accessibility', () => {
  test('Has role defined', () => {
    const wrapper = mount(<Block />)
    const o = wrapper.find('[role="presentation"]').first()

    expect(o.length).toBe(1)
  })
})

describe('Styles', () => {
  test('Can render custom styles', () => {
    const wrapper = mount(<Block style={{ background: 'red' }} />)

    expect(wrapper.props().style.background).toBe('red')
  })
})

describe('Animations', () => {
  test('Can disable animations', () => {
    const wrapper = mount(<Block withAnimations={true} />)

    expect(wrapper.getDOMNode().classList.contains('is-withAnimations')).toBe(
      true
    )

    wrapper.setProps({ withAnimations: false })

    expect(wrapper.getDOMNode().classList.contains('is-withAnimations')).toBe(
      false
    )
  })
})
