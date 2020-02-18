import React from 'react'
import { mount } from 'enzyme'
import Dropdown from '../../Dropdown'
import createStore, { initialState } from '../Dropdown.store'

jest.mock('../Dropdown.MenuPortal', () => {
  const Portal = props => <div>{props.children}</div>
  return props => <Portal {...props} />
})

const createMockStore = props => createStore({ ...initialState, ...props })

describe('Store/Render', () => {
  // Initial test to render with the default store
  test('Renders a Dropdown', () => {
    const wrapper = mount(<Dropdown isOpen={true} />)
    const store = wrapper.instance()['store']

    expect(wrapper).toBeTruthy()

    expect(store.getState().id).toBeTruthy()
    expect(store.getState().menuId).toBeTruthy()
    expect(store.getState().triggerId).toBeTruthy()
    expect(store.getState().triggerNode).toBeTruthy()
    expect(store.getState().menuNode).toBeTruthy()

    const menu = wrapper.find('DropdownMenu')
    const items = wrapper.find('DropdownItem')

    expect(menu.length).toBeTruthy()
    expect(items.length).not.toBeTruthy()
  })

  test('Dropdowns do not share the same store', () => {
    const wrapper = mount(
      <div>
        <Dropdown />
        <Dropdown />
      </div>
    )

    const dropdowns = wrapper.find('DropdownContainer')

    expect(dropdowns.at(0).instance().store).not.toBe(
      dropdowns.at(1).instance().store
    )
  })

  // Moving forward, let's use our mockStore for more control + easier testing
  test('Renders a Dropdown with items', () => {
    const props = {
      items: [
        {
          value: 'ron',
          label: 'Ron',
        },
        {
          value: 'champ',
          label: 'Champ',
        },
        {
          value: 'brick',
          label: 'Brick',
        },
      ],
    }
    const store = createMockStore({ ...props, isOpen: true })

    const wrapper = mount(<Dropdown __store={store} />)

    expect(wrapper).toBeTruthy()

    expect(store.getState().id).toBeTruthy()
    expect(store.getState().menuId).toBeTruthy()
    expect(store.getState().triggerId).toBeTruthy()
    expect(store.getState().triggerNode).toBeTruthy()
    expect(store.getState().menuNode).toBeTruthy()

    const menu = wrapper.find('DropdownMenu')
    const items = wrapper.find('DropdownItem')

    expect(menu.length).toBeTruthy()
    expect(items.length).toBeTruthy()

    expect(items.at(0).text()).toContain('Ron')
    expect(items.at(1).text()).toContain('Champ')
    expect(items.at(2).text()).toContain('Brick')
  })

  test('Can subscribe to store changes', () => {
    const store = createMockStore({})
    const spy = jest.fn()
    mount(<Dropdown __store={store} subscribe={spy} />)

    store.setState({ isOpen: true })

    expect(spy).toHaveBeenCalled()
  })

  test('Unsubscribes when Dropdown unmounts', () => {
    const store = createMockStore({})
    const spy = jest.fn()
    const wrapper = mount(<Dropdown __store={store} subscribe={spy} />)

    // Dropdown uses setState during initialization
    expect(spy).toHaveBeenCalledTimes(3)

    store.setState({ index: '123' })

    expect(spy).toHaveBeenCalledTimes(4)

    wrapper.unmount()

    store.setState({ index: '456' })
    store.setState({ isOpen: true })
    store.setState({ isOpen: false })
    store.setState({ isOpen: true })

    expect(spy).toHaveBeenCalledTimes(4)
  })
})
