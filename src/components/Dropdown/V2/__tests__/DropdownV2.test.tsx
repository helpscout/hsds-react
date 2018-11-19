import * as React from 'react'
import { mount } from 'enzyme'
import Dropdown from '../../DropdownV2'
import createStore, { initialState } from '../Dropdown.store'
// Mocking the components below
// @ts-ignore
import Portal from '../../../Portal'

jest.mock('../../../Portal', () => {
  return {
    default: 'Portal',
  }
})

const createMockStore = props => createStore({ ...initialState, ...props })

describe('Store/Render', () => {
  // Initial test to render with the default store
  test('Renders a Dropdown', () => {
    const wrapper = mount(<Dropdown isOpen={true} />)
    const store: any = wrapper.instance()['store']

    expect(wrapper).toBeTruthy()

    expect(store.getState().id).toBeTruthy()
    expect(store.getState().menuId).toBeTruthy()
    expect(store.getState().triggerId).toBeTruthy()
    expect(store.getState().triggerNode).toBeTruthy()
    expect(store.getState().menuNode).toBeTruthy()

    const menu = wrapper.find('Menu')
    const items = wrapper.find('Item')

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

    expect(dropdowns.length).toBe(2)
    // @ts-ignore
    expect(dropdowns.at(0).node.store).not.toBe(dropdowns.at(1).node.store)
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

    const menu = wrapper.find('Menu')
    const items = wrapper.find('Item')

    expect(menu.length).toBeTruthy()
    expect(items.length).toBeTruthy()

    expect(items.at(0).text()).toContain('Ron')
    expect(items.at(1).text()).toContain('Champ')
    expect(items.at(2).text()).toContain('Brick')
  })

  test('Rehydrate store when items change', () => {
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
    const store = createMockStore(props)
    const spy = jest.fn()
    const wrapper = mount(<Dropdown __store={store} subscribe={spy} />)

    // Dropdown uses setState during initialization
    expect(spy).toHaveBeenCalledTimes(1)

    wrapper.setProps({ activeId: '123' })

    expect(spy).toHaveBeenCalledTimes(1)

    wrapper.setProps({ items: [] })

    expect(spy).toHaveBeenCalledTimes(2)
    expect(store.getState().items).toEqual([])
  })

  test('Rehydrate store when isOpen change', () => {
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
    const store = createMockStore(props)
    const spy = jest.fn()
    const wrapper = mount(<Dropdown __store={store} subscribe={spy} />)

    // Dropdown uses setState during initialization
    expect(spy).toHaveBeenCalledTimes(1)

    wrapper.setProps({ activeId: '123' })

    expect(spy).toHaveBeenCalledTimes(1)

    wrapper.setProps({ isOpen: true })

    // Flipping isOpen triggers 2 updates
    expect(spy).toHaveBeenCalledTimes(3)
    expect(store.getState().isOpen).toBe(true)

    wrapper.setProps({ isOpen: false })

    // Flipping isOpen triggers 2 updates
    expect(spy).toHaveBeenCalledTimes(5)
    expect(store.getState().isOpen).toBe(false)
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
    expect(spy).toHaveBeenCalledTimes(1)

    store.setState({ activeId: '123' })

    expect(spy).toHaveBeenCalledTimes(2)

    wrapper.unmount()

    store.setState({ activeId: '456' })
    store.setState({ isOpen: true })
    store.setState({ isOpen: false })
    store.setState({ isOpen: true })

    expect(spy).toHaveBeenCalledTimes(2)
  })
})
