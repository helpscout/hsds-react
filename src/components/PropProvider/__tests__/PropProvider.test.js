import React from 'react'
import { mount } from 'enzyme'
import propConnect from '../propConnect'
import PropProvider from '../PropProvider'
import Button from '../../Button'
import { channel } from '../utils'

describe('PropProvider', () => {
  describe('Render', () => {
    test('Renders no children, if non are passed', () => {
      const wrapper = mount(<PropProvider />)

      expect(wrapper.html()).toBeFalsy()
    })
  })

  describe('Nesting/Scope', () => {
    test('Is properly scoped', () => {
      const Buddy = props => <div>{props.noms}</div>
      Buddy.defaultProps = {
        noms: 'sugar',
      }

      const ConnectedBuddy = propConnect('Buddy')(Buddy)
      const oldConfig = {
        Buddy: {
          noms: 'Fun things',
        },
      }
      const config = {
        Buddy: {
          noms: 'ALL THINGS SUGAR',
        },
      }

      const wrapper = mount(
        <PropProvider value={oldConfig}>
          <PropProvider value={config}>
            <ConnectedBuddy />
          </PropProvider>
        </PropProvider>
      )
      const el = wrapper.find('Buddy')

      expect(el.html()).toContain(config.Buddy.noms)
      expect(el.html()).not.toContain(oldConfig.Buddy.noms)
    })

    test('Nesting does not override prop values', () => {
      const Buddy = props => <div>{props.noms}</div>
      Buddy.defaultProps = {
        noms: 'sugar',
      }

      const Elf = props => <div>{props.feeling}</div>
      Buddy.defaultProps = {
        feeling: 'happy',
      }

      const ConnectedBuddy = propConnect('Buddy')(Buddy)
      const ConnectedElf = propConnect('Elf')(Elf)

      const oldConfig = {
        Buddy: {
          noms: 'Fun things',
        },
        Elf: {
          feeling: 'ok',
        },
      }
      const config = {
        Buddy: {
          noms: 'OMG FUN THINGS',
        },
        Elf: {
          feeling: 'HAPPY',
        },
      }

      const wrapper = mount(
        <PropProvider value={oldConfig}>
          <PropProvider value={config}>
            <ConnectedBuddy />
            <PropProvider value={{}}>
              <ConnectedElf />
            </PropProvider>
          </PropProvider>
        </PropProvider>
      )
      const b = wrapper.find('Buddy')
      const e = wrapper.find('Elf')

      expect(b.html()).toContain(config.Buddy.noms)
      expect(b.html()).not.toContain(oldConfig.Buddy.noms)
      expect(e.html()).toContain(config.Elf.feeling)
      expect(e.html()).not.toContain(oldConfig.Elf.feeling)
    })
  })

  describe('Sub/Unsub', () => {
    test('Subscribes to parent context, if available', () => {
      const spy = jest.fn()
      const value = { a: 1 }

      mount(<PropProvider value={value} />, {
        context: {
          [channel]: {
            subscribe: spy,
          },
        },
      })

      expect(spy).toHaveBeenCalled()
    })

    test('Unsubscribes to parent context, if available', () => {
      const spy = jest.fn()
      const value = { a: 1 }

      const wrapper = mount(<PropProvider value={value} />, {
        context: {
          [channel]: {
            subscribe: () => 123,
            unsubscribe: spy,
          },
        },
      })

      wrapper.unmount()

      expect(spy).toHaveBeenCalled()
    })
  })

  describe('Connected component', () => {
    test('Component props merge with (nested) Provider props', () => {
      const config = {
        Button: {
          block: true,
          version: 2,
        },
      }
      const wrapper = mount(
        <PropProvider value={config}>
          <div>
            <PropProvider value={{ Button: { isActive: true } }}>
              <Button className="custom" submit kind="primary" />
            </PropProvider>
          </div>
        </PropProvider>
      )

      const o = wrapper.find('Button').first()
      const el = wrapper.find('button')

      expect(el.hasClass('custom')).toBe(true)
      expect(el.prop('type')).toBe('submit')

      expect(o.prop('isActive')).toBe(true)
      expect(o.prop('className')).toBe('custom')
      expect(o.prop('kind')).toBe('primary')
      expect(o.prop('submit')).toBe(true)
    })
  })
})
