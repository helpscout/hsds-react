import * as React from 'react'
import { mount } from 'enzyme'
import contextConnect from '../contextConnect'
import Provider from '../PropProvider'

describe('contextConnect', () => {
  test('Can render without a Provider', () => {
    const Buddy = () => <div />
    const ConnectedBuddy = contextConnect('Buddy')(Buddy)

    const wrapper = mount(<ConnectedBuddy />)
    const el = wrapper.find('Buddy')

    expect(el.length).toBe(1)
  })

  test('Can render without an empty namespace', () => {
    const Buddy = () => <div />
    const ConnectedBuddy = contextConnect()(Buddy)

    const wrapper = mount(<ConnectedBuddy />)
    const el = wrapper.find('Buddy')

    expect(el.length).toBe(1)
  })

  test('Passes props to connected component', () => {
    const Buddy = ({ title }) => <div title={title} />
    const ConnectedBuddy = contextConnect('Buddy')(Buddy)

    const wrapper = mount(<ConnectedBuddy className="elf" />)
    const el = wrapper.find('Buddy')

    expect(el.props().className).toBe('elf')
  })

  test('Can override defaultProps with specified props', () => {
    const Buddy = ({ title }) => <div title={title} />
    Buddy.defaultProps = {
      title: 'Elf',
    }

    const ConnectedBuddy = contextConnect('Buddy')(Buddy)

    const wrapper = mount(<ConnectedBuddy title="Buddy to elf" />)
    const el = wrapper.find('Buddy')

    expect(el.props().title).toBe('Buddy to elf')
  })

  test('Passes context props', () => {
    const Buddy = ({ title }) => <div title={title} />
    Buddy.defaultProps = {
      title: 'Elf',
    }

    const ConnectedBuddy = contextConnect('Buddy')(Buddy)
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

    expect(el.props().propProviderContextApp).toBeTruthy()
    expect(el.props().propProviderContextValue.Buddy).toBe(config.Buddy)
  })

  test('Sets wrappedInstance ref for non-stateless components', () => {
    class Buddy extends React.Component {
      render() {
        return <div>{this.props.noms}</div>
      }
    }

    const ConnectedBuddy = contextConnect()(Buddy)

    const wrapper = mount(<ConnectedBuddy />)

    expect(wrapper.instance().wrappedInstance).toBeTruthy()
  })

  test('Does not set wrappedInstance ref for stateless components', () => {
    const Buddy = props => <div>{props.noms}</div>

    const ConnectedBuddy = contextConnect()(Buddy)
    const wrapper = mount(<ConnectedBuddy />)

    expect(wrapper.instance().wrappedInstance).toBeFalsy()
  })

  test('Creates a React.PureComponent instance, by default', () => {
    const Buddy = props => <div>{props.noms}</div>

    const ConnectedBuddy = contextConnect()(Buddy)
    const wrapper = mount(<ConnectedBuddy />)

    expect(wrapper.instance() instanceof React.PureComponent).toBe(true)
  })

  test('Can create a React.Component instance, if specified', () => {
    const Buddy = props => <div>{props.noms}</div>

    const ConnectedBuddy = contextConnect(null, { pure: false })(Buddy)
    const wrapper = mount(<ConnectedBuddy />)

    expect(wrapper.instance() instanceof React.Component).toBe(true)
  })

  test('Can create a React.PureComponent instance, if specified', () => {
    const Buddy = props => <div>{props.noms}</div>

    const ConnectedBuddy = contextConnect(null, { pure: true })(Buddy)
    const wrapper = mount(<ConnectedBuddy />)

    expect(wrapper.instance() instanceof React.PureComponent).toBe(true)
  })

  test('Can retrieve inner component reference via wrappedRef', () => {
    class Buddy extends React.Component {
      render() {
        return <div>{this.props.noms}</div>
      }
    }

    const spy = jest.fn()

    const ConnectedBuddy = contextConnect(null, { pure: true })(Buddy)
    const wrapper = mount(<ConnectedBuddy wrappedRef={spy} />)

    expect(spy).toHaveBeenCalledWith(wrapper.instance().wrappedInstance)
  })
})
