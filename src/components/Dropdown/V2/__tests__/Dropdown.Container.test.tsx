import * as React from 'react'
import { mount } from 'enzyme'
import DropdownContainer from '../Dropdown.Container'
import '../Dropdown'

jest.mock('../Dropdown', () => {
  const Dropdown = () => <div />
  return {
    default: Dropdown,
  }
})

describe('Prop changes', () => {
  test('Update store on item change', () => {
    const initialItems = [{ value: 'Ron' }, { value: 'Champ' }]
    const wrapper = mount(<DropdownContainer items={initialItems} />)

    wrapper.setProps({ items: [] })
    // @ts-ignore
    const store = wrapper.instance().store

    expect(store.getState().items).toEqual([])
  })

  test('Update store on isOpen change', () => {
    const wrapper = mount(<DropdownContainer isOpen={false} />)

    wrapper.setProps({ isOpen: true })
    // @ts-ignore
    const store = wrapper.instance().store

    expect(store.getState().isOpen).toEqual(true)
  })

  test('Update store on index change', () => {
    const wrapper = mount(<DropdownContainer index="5" />)

    wrapper.setProps({ index: '3' })
    // @ts-ignore
    const store = wrapper.instance().store

    expect(store.getState().index).toEqual('3')
  })

  test('Update store on inputValue change', () => {
    const wrapper = mount(<DropdownContainer inputValue="Ro" />)

    wrapper.setProps({ inputValue: 'Ron' })
    // @ts-ignore
    const store = wrapper.instance().store

    expect(store.getState().inputValue).toEqual('Ron')
  })

  test('Update store on dropUp change', () => {
    const wrapper = mount(<DropdownContainer dropUp={false} />)

    wrapper.setProps({ dropUp: true })
    // @ts-ignore
    const store = wrapper.instance().store

    expect(store.getState().dropUp).toEqual(true)
  })

  test('Update store relevant storeProp change', () => {
    const initialItems = [{ value: 'Ron' }, { value: 'Champ' }]
    const wrapper = mount(<DropdownContainer items={initialItems} />)

    wrapper.setProps({ maxHeight: 10000 })
    // @ts-ignore
    const store = wrapper.instance().store

    expect(store.getState().maxHeight).toBe(10000)
  })
})
