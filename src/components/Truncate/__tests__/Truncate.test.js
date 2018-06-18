import React from 'react'
import { createSpec, faker } from '@helpscout/helix'
import { mount, shallow } from 'enzyme'
import Tooltip from '../../Tooltip'
import Truncate from '../index'

const fixture = createSpec(faker.lorem.paragraph())

describe('default', () => {
  test('Auto truncates by default', () => {
    const words = fixture.generate()
    const wrapper = mount(<Truncate>{words}</Truncate>)

    expect(wrapper.props().type).toBe('auto')
    expect(wrapper.hasClass('is-auto')).toBeTruthy()
  })
})

describe('className', () => {
  test('Has default className', () => {
    const words = fixture.generate()
    const wrapper = shallow(<Truncate>{words}</Truncate>)

    expect(wrapper.hasClass('c-Truncate')).toBeTruthy()
  })

  test('Accepts additional className', () => {
    const words = fixture.generate()
    const wrapper = shallow(<Truncate className="mugatu">{words}</Truncate>)

    expect(wrapper.hasClass('mugatu')).toBeTruthy()
  })
})

describe('ellipsis', () => {
  test('Can render custom ellipsis', () => {
    const words = fixture.generate()
    const ellipsis = 'RELAX!! ++ '
    const wrapper = shallow(
      <Truncate ellipsis={ellipsis} type="start" limit={20}>
        {words}
      </Truncate>
    )

    expect(wrapper.text()).toContain(ellipsis)
  })

  test('Can render custom ellipsis at start', () => {
    const words = fixture.generate()
    const ellipsis = 'RELAX!! ++ '
    const wrapper = mount(
      <Truncate ellipsis={ellipsis} type="start" limit={20}>
        {words}
      </Truncate>
    )
    const renderedText = wrapper.text()

    expect(renderedText.indexOf('RELAX')).toBe(0)
  })

  test('Can render custom ellipsis in the middle', () => {
    const words = fixture.generate()
    const ellipsis = '!RELAX!'
    const wrapper = mount(
      <Truncate ellipsis={ellipsis} type="middle" limit={10}>
        {words}
      </Truncate>
    )
    const renderedText = wrapper.text()
    const splitText = renderedText.split(ellipsis)

    expect(splitText[0].length).toBe(splitText[1].length)
  })

  test('Can render custom ellipsis in the end', () => {
    const words = fixture.generate()
    const ellipsis = '!RELAX!'
    const limit = 10
    const wrapper = mount(
      <Truncate ellipsis={ellipsis} type="end" limit={limit}>
        {words}
      </Truncate>
    )
    const renderedText = wrapper.text()

    expect(renderedText.indexOf(ellipsis)).toBe(limit)
  })
})

describe('node', () => {
  test('References node on mount', () => {
    const wrapper = mount(<Truncate />)

    expect(wrapper.getNode().node).toBeTruthy()
  })

  test('Nullifies node on unmount', () => {
    const wrapper = mount(<Truncate />)
    wrapper.unmount()

    expect(wrapper.getNode().node).not.toBeTruthy()
  })
})

describe('Truncate: Check', () => {
  test('isTruncated can calculate truncation', () => {
    const props = { type: 'auto' }
    const wrapper = mount(<Truncate>Words</Truncate>)

    wrapper.getNode().node = {
      offsetWidth: 100,
      scrollWidth: 1000,
    }
    expect(wrapper.getNode().isTruncated(props)).toBe(true)

    wrapper.getNode().node = {
      offsetWidth: 1000,
      scrollWidth: 100,
    }
    expect(wrapper.getNode().isTruncated(props)).toBe(false)
  })

  test('Recalculates on appropriate prop change', () => {
    const wrapper = mount(<Truncate>Words</Truncate>)

    expect(wrapper.state().isTruncated).toBe(false)

    wrapper.setProps({ type: 'middle' })

    expect(wrapper.state().isTruncated).toBe(true)
  })

  test('Recalculates on resize, if desired', () => {
    const wrapper = mount(<Truncate showTooltipOnTruncate>Words</Truncate>)
    wrapper.setState({ isTruncated: false })
    // Stub
    wrapper.getNode().isTruncated = () => true

    wrapper.getNode().handleOnResize()

    expect(wrapper.state().isTruncated).toBe(true)
  })

  test('Resize: Does not setState if truncate check is the same as current state', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Truncate showTooltipOnTruncate={true}>Words</Truncate>
    )
    wrapper.setState({ isTruncated: true })
    // Stub
    wrapper.getNode().isTruncated = () => true
    wrapper.getNode().setState = spy
    wrapper.getNode().handleOnResize()

    expect(spy).not.toHaveBeenCalled()
  })

  test('Resize: Does not setState if tooltip is disabled', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Truncate showTooltipOnTruncate={false}>Words</Truncate>
    )
    wrapper.getNode().setState = spy
    wrapper.getNode().handleOnResize()

    expect(spy).not.toHaveBeenCalled()
  })

  test('Check returns false, if node is somehow not defined', () => {
    const wrapper = mount(<Truncate showTooltipOnTruncate>Words</Truncate>)
    wrapper.getNode().node = null

    expect(wrapper.state().isTruncated).toBe(false)
  })
})

describe('Tooltip', () => {
  test('Renders tooltip if truncated', () => {
    const wrapper = mount(<Truncate showTooltipOnTruncate>Words</Truncate>)
    wrapper.setState({ isTruncated: false })
    expect(wrapper.find(Tooltip).length).toBe(0)

    wrapper.setState({ isTruncated: true })
    expect(wrapper.find(Tooltip).length).toBe(1)
  })

  test('Does not renders tooltip, if specified', () => {
    const wrapper = mount(
      <Truncate showTooltipOnTruncate={false}>Words</Truncate>
    )
    wrapper.setState({ isTruncated: false })
    expect(wrapper.find(Tooltip).length).toBe(0)

    wrapper.setState({ isTruncated: true })
    expect(wrapper.find(Tooltip).length).toBe(0)
  })

  test('Renders children as Tooltip content', () => {
    const wrapper = mount(<Truncate showTooltipOnTruncate>Words</Truncate>)
    wrapper.setState({ isTruncated: true })
    const el = wrapper.find(Tooltip)

    expect(el.props().title).toBe('Words')
  })

  test('Renders title as Tooltip content, over children', () => {
    const wrapper = mount(
      <Truncate showTooltipOnTruncate title="Ok">
        Words
      </Truncate>
    )
    wrapper.setState({ isTruncated: true })
    const el = wrapper.find(Tooltip)

    expect(el.props().title).toBe('Ok')
  })
})
