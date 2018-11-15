import * as React from 'react'
import { mount } from 'enzyme'
import Dropdown from '../../DropdownV2'
import createStore, { initialState } from '../Dropdown.store'
// @ts-ignore
import Portal from '../../../Portal'

jest.mock('../../../Portal', () => {
  return {
    default: 'Portal',
  }
})

const createMockStore = props => createStore({ ...initialState, ...props })

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
