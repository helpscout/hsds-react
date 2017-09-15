import React from 'react'
import { mount, shallow } from 'enzyme'
import Sortable from '..'
import SortableItem from '../Item'
import SidebarCollapsibleCard from '../../SidebarCollapsibleCard'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Sortable />)

    expect(wrapper.hasClass('c-Sortable')).toBeTruthy()
    wrapper.unmount()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Sortable className={customClass} />)

    expect(wrapper.hasClass(customClass)).toBeTruthy()
    wrapper.unmount()
  })
})

describe('Children', () => {
  test('Can render without children', () => {
    const wrapper = shallow(<Sortable />)

    expect(wrapper.state().items.length).toBe(0)
  })

  test('Remaps children to state as SortableItem components', () => {
    const wrapper = mount(
      <Sortable>
        <div>Ron</div>
        <div>Champ</div>
        <div>Brick</div>
      </Sortable>
    )
    const o = wrapper.state().items[0]

    expect(wrapper.state().items.length).toBe(3)

    expect(o.type.displayName).toBe('sortableElement')
    expect(o.key).toBeTruthy()

    wrapper.unmount()
  })
})

describe('DragHandles', () => {
  test('Adds DragHandles if useDragHandle is true', () => {
    const wrapper = mount(
      <Sortable useDragHandle>
        <div>Ron</div>
        <div>Champ</div>
        <div>Brick</div>
      </Sortable>
    )
    const o = wrapper.find('.c-SortableDragHandle')

    expect(o.length).toBe(3)
    wrapper.unmount()
  })

  test('Does not show DragHandle by default', () => {
    const wrapper = mount(
      <Sortable>
        <div>Ron</div>
        <div>Champ</div>
        <div>Brick</div>
      </Sortable>
    )
    const o = wrapper.find('.c-SortableDragHandle')

    expect(o.length).toBe(0)

    wrapper.unmount()
  })

  test('Hides DragHandles if specified', () => {
    const wrapper = mount(
      <Sortable useDragHandle hideDragHandles>
        <div>Ron</div>
        <div>Champ</div>
        <div>Brick</div>
      </Sortable>
    )
    const o = wrapper.find('.c-SortableDragHandle')

    expect(o.length).toBe(0)

    wrapper.unmount()
  })
})

describe('Item', () => {
  test('Can render SortableItem components', () => {
    const wrapper = mount(
      <Sortable>
        <SortableItem>Ron</SortableItem>
        <SortableItem>Champ</SortableItem>
        <SortableItem>Brick</SortableItem>
      </Sortable>
    )
    const o = wrapper.state().items

    expect(o.length).toBe(3)

    wrapper.unmount()
  })

  test('Can render SortableItem components + regular compnents', () => {
    const wrapper = mount(
      <Sortable>
        <SortableItem>Ron</SortableItem>
        <SortableItem>Champ</SortableItem>
        <div>Brian</div>
        <SortableItem>Brick</SortableItem>
      </Sortable>
    )
    const o = wrapper.state().items

    expect(o.length).toBe(4)

    wrapper.unmount()
  })

  test('Passes a sortable prop to child components if they support it', () => {
    const wrapper = mount(
      <Sortable>
        <SidebarCollapsibleCard>Ron</SidebarCollapsibleCard>
        <SortableItem>Champ</SortableItem>
        <SortableItem>Brick</SortableItem>
      </Sortable>
    )
    const o = wrapper.find(SidebarCollapsibleCard)

    expect(o.props().sortable).toBeTruthy()

    wrapper.unmount()
  })
})
