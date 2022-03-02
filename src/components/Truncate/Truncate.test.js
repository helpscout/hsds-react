import React from 'react'
import { createSpec, faker } from '@helpscout/helix'
import { mount } from 'enzyme'
import Tooltip from '../Tooltip'
import { Truncate } from './Truncate'
import { TRUNCATED_CLASSNAMES, truncateMiddle } from './Truncate.utils'

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
    expect(wrapper.find(`.${TRUNCATED_CLASSNAMES.secondChunk}`).text()).toBe(
      '@gmail.com'
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
  test('isTruncated can calculate truncation for text without splitter', () => {
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
      scrollWidth: 200,
    }
    expect(o.isTruncated(props)).toBe(true)

    o.node = {
      offsetWidth: 1000,
    }
    o.contentNode = {
      style: {
        display: undefined,
      },
      scrollWidth: 200,
    }
    expect(o.isTruncated(props)).toBe(false)
  })

  test('isTruncated can calculate truncation for text with splitter', () => {
    const props = { type: 'auto', splitter: '@' }
    const wrapper = mount(<Truncate>Words</Truncate>)
    const o = wrapper.instance()

    o.node = {
      querySelector: () => ({ scrollWidth: 100 }),
    }
    o.contentNode = {
      offsetWidth: 500,
    }

    expect(o.isTruncated(props)).toBe(false)

    o.node = {
      querySelector: () => ({ scrollWidth: 100 }),
    }
    o.contentNode = {
      offsetWidth: 100,
    }

    expect(o.isTruncated(props)).toBe(true)
  })

  test('Recalculates on appropriate prop change', done => {
    const wrapper = mount(<Truncate type="auto">Words</Truncate>)

    setTimeout(() => {
      expect(wrapper.state().isTruncated).toBe(false)

      wrapper.instance().isTruncated = () => true
      wrapper.setProps({ type: 'middle' })

      setTimeout(() => {
        expect(wrapper.state().isTruncated).toBe(true)
        done()
      }, 0)
    }, 0)
  })

  test('Recalculates on resize, if desired', done => {
    const wrapper = mount(<Truncate showTooltipOnTruncate>Words</Truncate>)
    wrapper.setState({ isTruncated: false })
    // Stub
    wrapper.instance().isTruncated = () => true
    wrapper.instance().handleOnResize()

    setTimeout(() => {
      expect(wrapper.state().isTruncated).toBe(true)
      done()
    })
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

  test('Check returns false, if node is somehow not defined', done => {
    const wrapper = mount(<Truncate showTooltipOnTruncate>Words</Truncate>)
    wrapper.instance().node = null

    setTimeout(() => {
      expect(wrapper.state().isTruncated).toBe(false)
      done()
    }, 0)
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

  test('Renders tooltip if truncated using splitter prop', () => {
    const wrapper = mount(
      <Truncate showTooltipOnTruncate splitter="@">
        averylongemailaddress@gmail.com
      </Truncate>
    )
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

describe('truncateMiddle', () => {
  test('should perform a basic test', () => {
    expect(truncateMiddle('the quick brown', 5, 5, '...')).toBe('the q...brown')
  })

  it('should perform auto fill in ellipses', () => {
    expect(truncateMiddle('the quick brown', 5, 5)).toBe('the q…brown')
  })

  it('should have return empty string when null', () => {
    expect(truncateMiddle(null)).toBe('')
  })

  it('should have return empty string when empty', () => {
    expect(truncateMiddle('')).toBe('')
  })

  it('should have handle no backLength', () => {
    expect(truncateMiddle('the quick brown', 5, 0)).toBe('the q…')
  })

  it('should have handle 0 backLength, 0 frontLength', () => {
    expect(truncateMiddle('the quick brown', 0, 0)).toBe('the quick brown')
  })
})
