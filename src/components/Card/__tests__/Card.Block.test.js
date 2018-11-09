import React from 'react'
import { mount } from 'enzyme'
import CardBlock from '../Block'
import Scrollable from '../../Scrollable'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<CardBlock />)
    const el = wrapper.find('div.c-Card__block')

    expect(el.hasClass('c-Card__block')).toBeTruthy()
  })

  test('Accepts custom className', () => {
    const wrapper = mount(<CardBlock className="not-metro-man" />)
    const el = wrapper.find('div.c-Card__block')

    expect(el.hasClass('not-metro-man')).toBeTruthy()
  })
})

describe('Content', () => {
  test('Renders child content', () => {
    const wrapper = mount(<CardBlock>Megamind</CardBlock>)

    expect(wrapper.text()).toBe('Megamind')
  })

  test('Render child components', () => {
    const wrapper = mount(
      <CardBlock className="mega">
        <CardBlock className="mind">Megamind</CardBlock>
      </CardBlock>
    )
    const o = wrapper.find('.mind')

    expect(o.length).toBeTruthy()
  })
})

describe('Click', () => {
  test('Can trigger onClick callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<CardBlock onClick={spy} />)

    wrapper.simulate('click')

    expect(spy).toHaveBeenCalled()
  })
})

describe('Scrollable', () => {
  test('Does not render Scrollable by default', () => {
    const wrapper = mount(<CardBlock />)
    const o = wrapper.find(Scrollable)

    expect(o.length).toBe(0)
  })

  test('Renders Scrollable if specified', () => {
    const wrapper = mount(<CardBlock scrollable />)
    const o = wrapper.find(Scrollable)

    expect(o.length).toBe(1)
    expect(o.hasClass('c-Card__block')).toBeTruthy()
  })

  test('Renders Scrollable with flex if specified', () => {
    const wrapper = mount(<CardBlock scrollable flex />)
    const el = wrapper.find('div.c-Card__block.is-flex')
    const o = wrapper.find(Scrollable)

    expect(o.length).toBe(1)
    expect(el.length).toBeTruthy()
  })

  test('Can fire onScroll callback, if specified', () => {
    const spy = jest.fn()
    const wrapper = mount(<CardBlock scrollable onScroll={spy} />)
    const o = wrapper.find(Scrollable)

    o.instance().props.onScroll()

    expect(spy).toHaveBeenCalled()
  })

  test('Can retreive scrollableRef', () => {
    const spy = jest.fn()
    mount(<CardBlock scrollable scrollableRef={spy} />)

    expect(spy).toHaveBeenCalled()
  })
})

describe('Styles', () => {
  test('Does not have a size modifier style by default', () => {
    const wrapper = mount(<CardBlock />)
    const el = wrapper.find('div.c-Card__block')

    expect(el.hasClass('is-sm')).toBe(false)
    expect(el.hasClass('is-md')).toBe(false)
    expect(el.hasClass('is-lg')).toBe(false)
  })

  test('Renders size styles, if specified', () => {
    const wrapper = mount(<CardBlock size="sm" />)
    const el = wrapper.find('div.c-Card__block')

    expect(el.hasClass('is-sm')).toBe(true)
  })

  test('Renders bgMuted styles, if specified', () => {
    const wrapper = mount(<CardBlock bgMuted />)
    const el = wrapper.find('div.c-Card__block')

    expect(el.hasClass('is-bg-muted')).toBeTruthy()
  })

  test('Renders flex styles, if specified', () => {
    const wrapper = mount(<CardBlock flex />)
    const el = wrapper.find('div.c-Card__block')

    expect(el.hasClass('is-flex')).toBeTruthy()
  })
})
