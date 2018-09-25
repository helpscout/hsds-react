import React from 'react'
import { mount } from 'enzyme'
import propConnect from '../propConnect'
import Provider from '../PropProvider'

describe('PropProvider', () => {
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
      <Provider value={oldConfig}>
        <Provider value={config}>
          <ConnectedBuddy />
        </Provider>
      </Provider>
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
      <Provider value={oldConfig}>
        <Provider value={config}>
          <ConnectedBuddy />
          <Provider value={{}}>
            <ConnectedElf />
          </Provider>
        </Provider>
      </Provider>
    )
    const b = wrapper.find('Buddy')
    const e = wrapper.find('Elf')

    expect(b.html()).toContain(config.Buddy.noms)
    expect(b.html()).not.toContain(oldConfig.Buddy.noms)
    expect(e.html()).toContain(config.Elf.feeling)
    expect(e.html()).not.toContain(oldConfig.Elf.feeling)
  })
})
