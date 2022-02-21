import React from 'react'
import { mount } from 'enzyme'
import Timestamp from './Timestamp'
import { calculateTimeoutPeriod } from './Timestamp.utils'

import { Icon, Text } from '..'

const cx = 'c-Timestamp'

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = mount(<Timestamp />)
    const o = wrapper.find(`.${cx}`)

    expect(o.length).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = mount(<Timestamp className="mugatu" />)
    const o = wrapper.find(`.${cx}`).first()

    expect(o.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Content', () => {
  test('Does not render children components', () => {
    const wrapper = mount(<Timestamp>Mugatu</Timestamp>)

    expect(wrapper.html()).not.toContain('Mugatu')
  })

  test('Wraps timestamp in a Text component', () => {
    const wrapper = mount(<Timestamp timestamp="noon" />)
    const o = wrapper.find(Text)
    const t = o.find(Timestamp.Time)

    expect(o.length).toBeTruthy()
    expect(t).toBeTruthy()
    expect(t.html()).toContain('noon')
  })

  describe('Live update', () => {
    test('Timestamp is updated after a period of time', () => {
      jest.useFakeTimers()

      const timestamp = new Date().toISOString()
      const formatter = jest.fn()
      const formattedTimestamp = 'some time ago'
      formatter.mockReturnValue(formattedTimestamp)

      const wrapper = mount(
        <Timestamp timestamp={timestamp} formatter={formatter} live />
      )

      jest.runTimersToTime(1000)

      expect(wrapper.html()).toContain(formattedTimestamp)
      expect(formatter).toHaveBeenCalledTimes(2)
    })

    test('Clears timeout when live prop disabled', () => {
      const timestamp = new Date().toISOString()

      const formatter = jest.fn()
      const formattedTimestamp = 'some time ago'
      formatter.mockReturnValue(formattedTimestamp)

      const wrapper = mount(
        <Timestamp timestamp={timestamp} formatter={formatter} live />
      )

      wrapper.setProps({
        live: false,
      })

      expect(formatter).toHaveBeenCalledTimes(2)
    })

    test('Clears timeout when timestamp prop updated', () => {
      const timestamp = new Date().toISOString()
      let newTimestamp

      const formatter = jest.fn()
      const formattedTimestamp = 'some time ago'
      formatter.mockReturnValue(formattedTimestamp)

      const wrapper = mount(
        <Timestamp timestamp={timestamp} formatter={formatter} live />
      )

      newTimestamp = new Date().toISOString()

      wrapper.setProps({
        timestamp: newTimestamp,
      })

      expect(formatter).toHaveBeenCalledWith(newTimestamp)
    })

    test('Clears timeout when unmounted', () => {
      const timestamp = new Date().toISOString()

      const formatter = jest.fn()
      const formattedTimestamp = 'some time ago'
      formatter.mockReturnValue(formattedTimestamp)

      const wrapper = mount(
        <Timestamp timestamp={timestamp} formatter={formatter} live />
      )

      wrapper.unmount()

      expect(formatter).toHaveBeenCalledTimes(1)
    })
  })

  describe('Static', () => {
    test('Unmount', () => {
      const timestamp = new Date().toISOString()
      const wrapper = mount(
        <Timestamp
          timestamp={timestamp}
          formatter={() => undefined}
          live={false}
        />
      )

      wrapper.unmount()
    })
  })
})

describe('Icon', () => {
  test('Does not show read icon by default', () => {
    const wrapper = mount(<Timestamp timestamp="noon" />)
    const o = wrapper.find(Icon)

    expect(o.length).not.toBeTruthy()
  })

  test('Does shows read icon if read', () => {
    const wrapper = mount(<Timestamp timestamp="noon" read />)
    const o = wrapper.find(Icon)

    expect(o.length).toBeTruthy()
    expect(o.props().name).toContain('tick')
  })
})

describe('Styles', () => {
  test('Has muted styles', () => {
    const wrapper = mount(<Timestamp muted />)

    expect(wrapper.getDOMNode().classList.contains('is-muted')).toBeTruthy()
  })
})

describe('calculateTimeoutPeriod', () => {
  test('returns 0 when difference is more than a day', () => {
    const timestamp = new Date()
    timestamp.setTime(Date.now() - 60 * 60 * 24 * 3 * 1000)

    expect(calculateTimeoutPeriod(timestamp)).toEqual(0)
  })

  test('returns an hour (in ms) when the difference is more than an hour', () => {
    const timestamp = new Date()
    timestamp.setTime(Date.now() - 60 * 60 * 3 * 1000)

    expect(calculateTimeoutPeriod(timestamp)).toEqual(60 * 60 * 1000)
  })

  test('returns 15 seconds (in ms) when the difference is more than an minute', () => {
    const timestamp = new Date()
    timestamp.setTime(Date.now() - 60 * 3 * 1000)

    expect(calculateTimeoutPeriod(timestamp)).toEqual(15 * 1000)
  })

  test('returns a second (in ms) when the difference is less than an minute', () => {
    const timestamp = new Date()
    timestamp.setTime(Date.now() - 45 * 1000)

    expect(calculateTimeoutPeriod(timestamp)).toEqual(1000)
  })
})
