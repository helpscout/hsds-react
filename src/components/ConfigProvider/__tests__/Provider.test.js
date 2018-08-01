import React from 'react'
import { mount } from 'enzyme'
import configConnect from '../configConnect'
import Provider from '../Provider'

describe('Provider', () => {
  test('Is properly scoped', () => {
    const Buddy = props => <div>{props.noms}</div>
    Buddy.defaultProps = {
      noms: 'sugar',
    }

    const ConnectedBuddy = configConnect('Buddy')(Buddy)
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
})
