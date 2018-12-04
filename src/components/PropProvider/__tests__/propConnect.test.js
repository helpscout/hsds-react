import React from 'react'
import { mount } from 'enzyme'
import propConnect from '../propConnect'
import Provider from '../PropProvider'

describe('propConnect', () => {
  test('Can render without a Provider', () => {
    const Buddy = () => <div />
    const ConnectedBuddy = propConnect('Buddy')(Buddy)

    const wrapper = mount(<ConnectedBuddy />)
    const el = wrapper.find('Buddy')

    expect(el.length).toBe(1)
  })

  test('Can render without an invalid namespace', () => {
    const Buddy = () => <div />
    const ConnectedBuddy = propConnect('BUDDYYYY')(Buddy)

    const wrapper = mount(<ConnectedBuddy />)
    const el = wrapper.find('Buddy')

    expect(el.length).toBe(1)
  })

  test('Can render without an empty namespace', () => {
    const Buddy = () => <div />
    const ConnectedBuddy = propConnect()(Buddy)

    const wrapper = mount(<ConnectedBuddy />)
    const el = wrapper.find('Buddy')

    expect(el.length).toBe(1)
  })

  test('Passes props to connected component', () => {
    const Buddy = props => <div {...props} />
    const ConnectedBuddy = propConnect('Buddy')(Buddy)

    const wrapper = mount(<ConnectedBuddy className="elf" />)
    const el = wrapper.find('Buddy')

    expect(el.props().className).toBe('elf')
  })

  test('Can override defaultProps with specified props', () => {
    const Buddy = props => <div {...props} />
    Buddy.defaultProps = {
      title: 'Elf',
    }

    const ConnectedBuddy = propConnect('Buddy')(Buddy)

    const wrapper = mount(<ConnectedBuddy title="Buddy to elf" />)
    const el = wrapper.find('Buddy')

    expect(el.props().title).toBe('Buddy to elf')
  })

  test('Can override defaultProps with config props', () => {
    const Buddy = props => <div {...props} />
    Buddy.defaultProps = {
      title: 'Elf',
    }

    const ConnectedBuddy = propConnect('Buddy')(Buddy)
    const config = {
      Buddy: {
        title: 'Buddy to elf',
      },
    }

    const wrapper = mount(
      <Provider value={config}>
        <ConnectedBuddy />
      </Provider>
    )
    const el = wrapper.find('Buddy')

    expect(el.props().title).toBe(config.Buddy.title)
  })

  test('Can override config props with specified props', () => {
    const Buddy = props => <div {...props} />
    Buddy.defaultProps = {
      title: 'Elf',
    }

    const ConnectedBuddy = propConnect('Buddy')(Buddy)
    const config = {
      Buddy: {
        title: 'Buddy to elf',
      },
    }

    const wrapper = mount(
      <Provider value={config}>
        <ConnectedBuddy title="BUDDY!" />
      </Provider>
    )
    const el = wrapper.find('Buddy')

    expect(el.props().title).toBe('BUDDY!')
  })

  test('Can work with custom props', () => {
    const Buddy = props => <div>{props.noms}</div>
    Buddy.defaultProps = {
      noms: 'sugar',
    }

    const ConnectedBuddy = propConnect('Buddy')(Buddy)
    const config = {
      Buddy: {
        noms: 'ALL THINGS SUGAR',
      },
    }

    const wrapper = mount(
      <Provider value={config}>
        <ConnectedBuddy />
      </Provider>
    )
    const el = wrapper.find('Buddy')

    expect(el.html()).toContain(config.Buddy.noms)
  })

  test('Attempts to use the React component name, if no namespace is defined', () => {
    const Buddy = props => <div>{props.noms}</div>
    Buddy.defaultProps = {
      noms: 'sugar',
    }

    const ConnectedBuddy = propConnect()(Buddy)
    const config = {
      Buddy: {
        noms: 'ALL THINGS SUGAR',
      },
    }

    const wrapper = mount(
      <Provider value={config}>
        <ConnectedBuddy />
      </Provider>
    )
    const el = wrapper.find('Buddy')

    expect(el.html()).toContain(config.Buddy.noms)
  })

  test('Can work with nested props', () => {
    const Buddy = props => <div>{props.noms.only}</div>
    Buddy.defaultProps = {
      noms: {
        only: 'sugar',
      },
    }

    const ConnectedBuddy = propConnect('Buddy')(Buddy)
    const config = {
      Buddy: {
        noms: {
          only: 'ALL THINGS SUGAR',
        },
      },
    }

    const wrapper = mount(
      <Provider value={config}>
        <ConnectedBuddy />
      </Provider>
    )
    const el = wrapper.find('Buddy')

    expect(el.html()).toContain(config.Buddy.noms.only)
  })

  test('Sets wrappedInstance ref for non-stateless components', () => {
    class Buddy extends React.Component {
      render() {
        return <div>{this.props.noms}</div>
      }
    }

    const ConnectedBuddy = propConnect()(Buddy)

    const wrapper = mount(<ConnectedBuddy />)

    expect(wrapper.instance().wrappedInstance).toBeTruthy()
  })

  test('Does not set wrappedInstance ref for stateless components', () => {
    const Buddy = props => <div>{props.noms}</div>

    const ConnectedBuddy = propConnect()(Buddy)
    const wrapper = mount(<ConnectedBuddy />)

    expect(wrapper.instance().wrappedInstance).toBeFalsy()
  })

  test('Creates a React.PureComponent instance, by default', () => {
    const Buddy = props => <div>{props.noms}</div>

    const ConnectedBuddy = propConnect()(Buddy)
    const wrapper = mount(<ConnectedBuddy />)

    expect(wrapper.instance() instanceof React.PureComponent).toBe(true)
  })

  test('Can create a React.Component instance, if specified', () => {
    const Buddy = props => <div>{props.noms}</div>

    const ConnectedBuddy = propConnect(null, { pure: false })(Buddy)
    const wrapper = mount(<ConnectedBuddy />)

    expect(wrapper.instance() instanceof React.Component).toBe(true)
  })

  test('Can create a React.PureComponent instance, if specified', () => {
    const Buddy = props => <div>{props.noms}</div>

    const ConnectedBuddy = propConnect(null, { pure: true })(Buddy)
    const wrapper = mount(<ConnectedBuddy />)

    expect(wrapper.instance() instanceof React.PureComponent).toBe(true)
  })
})
