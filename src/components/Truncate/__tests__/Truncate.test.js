import * as React from 'react'
import { createSpec, faker } from '@helpscout/helix'
import { mount } from 'enzyme'
import Tooltip from '../../Tooltip'
import { Truncate } from '../Truncate'
import { TRUNCATED_CLASSNAMES } from '../Truncate.utils'

const fixture = createSpec(faker.lorem.paragraph())

describe('default', () => {
  test('Auto truncates by default', () => {
    const words = fixture.generate()
    const wrapper = mount(<Truncate>{words}</Truncate>)

    expect(wrapper.props().type).toBe('auto')
    expect(wrapper.getDOMNode().classList.contains('is-auto')).toBeTruthy()
  })
})

describe('className', () => {
  test('Has default className', () => {
    const words = fixture.generate()
    const wrapper = mount(<Truncate>{words}</Truncate>)

    expect(wrapper.getDOMNode().classList.contains('c-Truncate')).toBeTruthy()
  })

  test('Accepts additional className', () => {
    const words = fixture.generate()
    const wrapper = mount(<Truncate className="mugatu">{words}</Truncate>)

    expect(wrapper.getDOMNode().classList.contains('mugatu')).toBeTruthy()
  })
})

describe('Type', () => {
  test('Does not setState if type (prop) does not change', () => {
    const spy = jest.fn()
    const words = fixture.generate()
    const wrapper = mount(
      <Truncate className="mugatu" type="auto">
        {words}
      </Truncate>
    )
    wrapper.instance().setState = spy

    wrapper.setProps({ type: 'auto' })

    expect(spy).not.toHaveBeenCalled()

    wrapper.setProps({ type: 'start' })

    expect(spy).toHaveBeenCalled()
  })
})

describe('splitter', () => {
  test('Will truncate text with splitter if provided', () => {
    const wrapper = mount(
      <Truncate type="end" limit={10} splitter="@">
        longemailaddress@gmail.com
      </Truncate>
    )

    expect(wrapper.find(`.${TRUNCATED_CLASSNAMES.withSplitter}`)).toBeTruthy()
    expect(wrapper.find(`.${TRUNCATED_CLASSNAMES.firstChunk}`).text()).toBe(
      'longemailaddress'
    )
    expect(wrapper.find(`.${TRUNCATED_CLASSNAMES.splitterChunk}`).text()).toBe(
      '@'
    )
    expect(wrapper.find(`.${TRUNCATED_CLASSNAMES.secondChunk}`).text()).toBe(
      'gmail.com'
    )
  })
})

describe('ellipsis', () => {
  test('Can render custom ellipsis', () => {
    const words = fixture.generate()
    const ellipsis = 'RELAX!! ++ '
    const wrapper = mount(
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

    expect(wrapper.instance().node).toBeTruthy()
  })

  test('Nullifies node on unmount', () => {
    const wrapper = mount(<Truncate />)
    const o = wrapper.instance()
    wrapper.unmount()

    expect(o.node).not.toBeTruthy()
  })
})

describe('Truncate: Check', () => {
  test('isTruncated can calculate truncation', () => {
    const props = { type: 'auto' }
    const wrapper = mount(<Truncate>Words</Truncate>)
    const o = wrapper.instance()

    o.node = {
      offsetWidth: 100,
    }
    o.contentNode = {
      style: {
        display: undefined,
      },
      offsetWidth: 200,
    }
    expect(o.isTruncated(props)).toBe(true)

    o.node = {
      offsetWidth: 1000,
    }
    o.contentNode = {
      style: {
        display: undefined,
      },
      offsetWidth: 200,
    }
    expect(o.isTruncated(props)).toBe(false)
  })

  test('Recalculates on appropriate prop change', () => {
    const wrapper = mount(<Truncate type="auto">Words</Truncate>)

    expect(wrapper.state().isTruncated).toBe(false)

    wrapper.instance().isTruncated = () => true
    wrapper.setProps({ type: 'middle' })

    expect(wrapper.state().isTruncated).toBe(true)
  })

  test('Recalculates on resize, if desired', () => {
    const wrapper = mount(<Truncate showTooltipOnTruncate>Words</Truncate>)
    wrapper.setState({ isTruncated: false })
    // Stub
    wrapper.instance().isTruncated = () => true

    wrapper.instance().handleOnResize()

    expect(wrapper.state().isTruncated).toBe(true)
  })

  test('Resize: Does not setState if truncate check is the same as current state', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Truncate showTooltipOnTruncate={true}>Words</Truncate>
    )
    wrapper.setState({ isTruncated: true })
    // Stub
    wrapper.instance().isTruncated = () => true
    wrapper.instance().setState = spy
    wrapper.instance().handleOnResize()

    expect(spy).not.toHaveBeenCalled()
  })

  test('Resize: Does not setState if tooltip is disabled', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Truncate showTooltipOnTruncate={false}>Words</Truncate>
    )
    wrapper.instance().setState = spy
    wrapper.instance().handleOnResize()

    expect(spy).not.toHaveBeenCalled()
  })

  test('Check returns false, if node is somehow not defined', () => {
    const wrapper = mount(<Truncate showTooltipOnTruncate>Words</Truncate>)
    wrapper.instance().node = null

    expect(wrapper.state().isTruncated).toBe(false)
  })

  test('Check returns false, if content does not change', () => {
    const wrapper = mount(<Truncate type="middle">Words</Truncate>)

    expect(wrapper.instance().isTruncated()).toBe(false)
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
