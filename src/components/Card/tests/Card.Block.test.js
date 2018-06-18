import React from 'react'
import { mount, shallow } from 'enzyme'
import CardBlock from '../Block'
import Scrollable from '../../Scrollable'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<CardBlock />)

    expect(wrapper.hasClass('c-Card__block')).toBeTruthy()
  })

  test('Accepts custom className', () => {
    const wrapper = shallow(<CardBlock className="not-metro-man" />)

    expect(wrapper.hasClass('not-metro-man')).toBeTruthy()
  })
})

describe('Content', () => {
  test('Renders child content', () => {
    const wrapper = shallow(<CardBlock>Megamind</CardBlock>)

    expect(wrapper.text()).toBe('Megamind')
  })

  test('Render child components', () => {
    const wrapper = shallow(
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
    const wrapper = shallow(<CardBlock onClick={spy} />)

    wrapper.simulate('click')

    expect(spy).toHaveBeenCalled()
  })
})

describe('Scrollable', () => {
  test('Does not render Scrollable by default', () => {
    const wrapper = shallow(<CardBlock />)
    const o = wrapper.find(Scrollable)

    expect(o.length).toBe(0)
  })

  test('Renders Scrollable if specified', () => {
    const wrapper = shallow(<CardBlock scrollable />)
    const o = wrapper.find(Scrollable)

    expect(o.length).toBe(1)
    expect(o.hasClass('c-Card__block')).toBeTruthy()
    expect(o.hasClass('is-scrollable')).toBeTruthy()
  })

  test('Renders Scrollable with flex if specified', () => {
    const wrapper = shallow(<CardBlock scrollable flex />)
    const o = wrapper.find(Scrollable)

    expect(o.length).toBe(1)
    expect(o.hasClass('is-scrollable')).toBeTruthy()
    expect(o.hasClass('is-flex')).toBeTruthy()
  })

  test('Can fire onScroll callback, if specified', () => {
    const spy = jest.fn()
    const wrapper = shallow(<CardBlock scrollable onScroll={spy} />)
    const o = wrapper.find(Scrollable)

    o.getNode().props.onScroll()

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
    const wrapper = shallow(<CardBlock />)
    const classNames = wrapper.prop('className')

    expect(classNames).not.toContain('c-Card__block--sm')
    expect(classNames).not.toContain('c-Card__block--md')
    expect(classNames).not.toContain('c-Card__block--lg')
  })

  test('Renders size styles, if specified', () => {
    const wrapper = shallow(<CardBlock size="sm" />)

    expect(wrapper.prop('className')).toContain('c-Card__block--sm')
  })

  test('Renders bgMuted styles, if specified', () => {
    const wrapper = shallow(<CardBlock bgMuted />)

    expect(wrapper.hasClass('is-bg-muted')).toBeTruthy()
  })

  test('Renders flex styles, if specified', () => {
    const wrapper = shallow(<CardBlock flex />)

    expect(wrapper.hasClass('is-flex')).toBeTruthy()
  })
})
