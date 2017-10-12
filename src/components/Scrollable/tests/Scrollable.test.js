import React from 'react'
import { mount, shallow } from 'enzyme'
import Scrollable from '..'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Scrollable />)

    expect(wrapper.prop('className')).toContain('c-Scrollable')
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = shallow(<Scrollable className={className} />)

    expect(wrapper.prop('className')).toContain(className)
  })
})

describe('Content', () => {
  test('Renders child content', () => {
    const wrapper = mount(<Scrollable><div className='brick'>BRICK</div></Scrollable>)
    const brick = wrapper.find('div.brick')

    expect(brick.exists()).toBeTruthy()
    expect(brick.text()).toBe('BRICK')
  })
})

describe('Fade', () => {
  test('Renders fade when specified', () => {
    const wrapper = shallow(<Scrollable fade />)
    const fade = wrapper.find('.c-Scrollable__fade')

    expect(wrapper.prop('className')).toContain('has-fade')
    expect(fade.exists()).toBeTruthy()
  })
})

describe('Styles', () => {
  test('Applies rounded styles when specified', () => {
    const wrapper = shallow(<Scrollable fade rounded />)

    expect(wrapper.prop('className')).toContain('is-rounded')
  })
})

describe('Events', () => {
  test('Fires onScroll callback when scrolled', () => {
    const spy = jest.fn()
    const wrapper = mount(<Scrollable onScroll={spy} />)
    const o = wrapper.instance()

    o.handleOnScroll()

    expect(spy).toHaveBeenCalled()
  })
})
