import React from 'react'
import { mount, shallow } from 'enzyme'
import Timestamp from '..'
import { Icon, Text } from '../../'

const cx = 'c-Timestamp'

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Timestamp />)
    const o = wrapper.find(`.${cx}`)

    expect(o.length).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = shallow(<Timestamp className="mugatu" />)
    const o = wrapper.find(`.${cx}`)

    expect(o.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Content', () => {
  test('Does not render children components', () => {
    const wrapper = shallow(<Timestamp>Mugatu</Timestamp>)

    expect(wrapper.html()).not.toContain('Mugatu')
  })

  test('Wraps timestamp in a Text component', () => {
    const wrapper = shallow(<Timestamp timestamp="noon" />)
    const o = wrapper.find(Text)
    const t = o.find('time')

    expect(o.length).toBeTruthy()
    expect(t).toBeTruthy()
    expect(t.html()).toContain('noon')
  })

  describe('Live update', () => {
    let originalTimeout
    beforeEach(function() {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 4000
    })

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
    })

    test('Timestamp is updated after a period of time', done => {
      const timestamp = new Date().toISOString()

      const formatter = jest.fn()
      const formattedTimestamp = 'some time ago'
      formatter.mockReturnValue(formattedTimestamp)

      const wrapper = mount(
        <Timestamp timestamp={timestamp} formatter={formatter} live />
      )

      setTimeout(() => {
        expect(wrapper.html()).toContain(formattedTimestamp)
        expect(formatter).toHaveBeenCalledTimes(2)
        done()
      }, 1100)
    })

    test('Clears timeout when live prop disabled', done => {
      const timestamp = new Date().toISOString()

      const formatter = jest.fn()
      const formattedTimestamp = 'some time ago'
      formatter.mockReturnValue(formattedTimestamp)

      const wrapper = mount(
        <Timestamp timestamp={timestamp} formatter={formatter} live />
      )

      setTimeout(() => {
        wrapper.setProps({
          live: false,
        })
      }, 500)

      setTimeout(() => {
        expect(formatter).toHaveBeenCalledTimes(2)
        done()
      }, 1100)
    })

    test('Clears timeout when timestamp prop updated', done => {
      const timestamp = new Date().toISOString()
      let newTimestamp

      const formatter = jest.fn()
      const formattedTimestamp = 'some time ago'
      formatter.mockReturnValue(formattedTimestamp)

      const wrapper = mount(
        <Timestamp timestamp={timestamp} formatter={formatter} live />
      )

      setTimeout(() => {
        newTimestamp = new Date().toISOString()

        wrapper.setProps({
          timestamp: newTimestamp,
        })
      }, 500)

      setTimeout(() => {
        expect(formatter).toHaveBeenCalledWith(newTimestamp)
        done()
      }, 1100)
    })

    test('Clears timeout when unmounted', done => {
      const timestamp = new Date().toISOString()

      const formatter = jest.fn()
      const formattedTimestamp = 'some time ago'
      formatter.mockReturnValue(formattedTimestamp)

      const wrapper = mount(
        <Timestamp timestamp={timestamp} formatter={formatter} live />
      )

      setTimeout(() => {
        wrapper.unmount()
      }, 500)

      setTimeout(() => {
        expect(formatter).toHaveBeenCalledTimes(1)
        done()
      }, 1100)
    })
  })

  describe('Static', () => {
    test('Unmount', done => {
      const timestamp = new Date().toISOString()
      const wrapper = mount(
        <Timestamp
          timestamp={timestamp}
          formatter={() => undefined}
          live={false}
        />
      )

      setTimeout(() => {
        wrapper.unmount()
        done()
      }, 500)
    })
  })
})

describe('Icon', () => {
  test('Does not show read icon by default', () => {
    const wrapper = shallow(<Timestamp timestamp="noon" />)
    const o = wrapper.find(Icon)

    expect(o.length).not.toBeTruthy()
  })

  test('Does shows read icon if read', () => {
    const wrapper = shallow(<Timestamp timestamp="noon" read />)
    const o = wrapper.find(Icon)

    expect(o.length).toBeTruthy()
    expect(o.props().name).toContain('tick')
  })
})

describe('Styles', () => {
  test('Has muted styles', () => {
    const wrapper = shallow(<Timestamp muted />)

    expect(wrapper.hasClass('is-muted')).toBeTruthy()
  })
})
