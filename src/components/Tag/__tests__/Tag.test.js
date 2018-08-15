import React from 'react'
import { mount } from 'enzyme'
import Tag from '../Tag'
import { Animate, Icon, Text } from '../../index'

jest.useFakeTimers()

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = mount(<Tag />)
    const o = wrapper.find('.c-Tag')

    expect(o.length).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = mount(<Tag className="mugatu" />)
    const o = wrapper.find('.c-Tag')

    expect(o.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Animate', () => {
  test('Renders an Animate component', () => {
    const wrapper = mount(<Tag />)
    const o = wrapper.find(Animate)

    expect(o.length).toBe(1)
  })

  test('Animation duration can be defined', () => {
    const wrapper = mount(<Tag animationDuration={1000} />)
    const o = wrapper.find(Animate)

    expect(o.props().duration).toBe(1000)
  })

  test('Passes "in" state, to Animate', () => {
    const wrapper = mount(<Tag />)

    wrapper.setState({ in: true })
    expect(wrapper.find(Animate).props().in).toBe(true)

    wrapper.setState({ in: false })
    expect(wrapper.find(Animate).props().in).toBe(false)
  })
})

describe('Content', () => {
  test('Wraps children components in <Text> ', () => {
    const wrapper = mount(<Tag>Mugatu</Tag>)
    const o = wrapper.find(Text)

    expect(o.html()).toContain('Mugatu')
    expect(o.props().size).toBe('12')
  })
})

describe('Remove', () => {
  test('Is not removable by default', () => {
    const wrapper = mount(<Tag />)

    const icon = wrapper.find(Icon)
    expect(icon.length).toBe(0)
  })

  test('Renders remove Icon if isRemovable', () => {
    const wrapper = mount(<Tag isRemovable />)

    const icon = wrapper.find(Icon)
    expect(icon.length).toBe(1)
  })

  test('Does not fire callback on unmount', () => {
    const spy = jest.fn()
    const wrapper = mount(<Tag onRemove={spy} />)

    wrapper.unmount()
    expect(spy).not.toHaveBeenCalled()
  })

  test('Fires callback on remove click', () => {
    const spy = jest.fn()
    const wrapper = mount(<Tag isRemovable onRemove={spy} id={1} value="Ron" />)

    const icon = wrapper.find(Icon)
    icon.simulate('click')

    jest.runOnlyPendingTimers()

    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][0].id).toBe(1)
    expect(spy.mock.calls[0][0].value).toBe('Ron')
  })
})

describe('Styles', () => {
  test('Has allCaps styles', () => {
    const wrapper = mount(<Tag allCaps />)
    const o = wrapper.find(Text)

    expect(o.props().allCaps).toBeTruthy()
    expect(o.props().size).not.toBe('12')
  })

  test('Has color styles', () => {
    const wrapper = mount(<Tag color="red" />)
    const o = wrapper.find('.c-Tag')

    expect(o.hasClass('is-red')).toBeTruthy()
  })

  test('Has display styles', () => {
    const wrapper = mount(<Tag display="inlineBlock" />)
    const o = wrapper.find('.c-TagWrapper')

    expect(o.hasClass('is-display-inlineBlock')).toBeTruthy()
  })

  test('Has filled styles', () => {
    const wrapper = mount(<Tag filled />)
    const o = wrapper.find('.c-Tag')

    expect(o.hasClass('is-filled')).toBeTruthy()
  })

  test('Has pulsing styles', () => {
    const wrapper = mount(<Tag pulsing />)
    const o = wrapper.find('.c-Tag')

    expect(o.hasClass('is-pulsing')).toBeTruthy()
  })
})

describe('Value', () => {
  test('Renders value as text', () => {
    const wrapper = mount(<Tag value="Ron" />)
    const o = wrapper.find(Text)

    expect(o.html()).toContain('Ron')
  })

  test('Renders value instead of children, if defined', () => {
    const wrapper = mount(<Tag value="Ron">Champ</Tag>)
    const o = wrapper.find(Text)

    expect(o.html()).toContain('Ron')
    expect(o.html()).not.toContain('Mike')
  })
})
