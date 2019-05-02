import * as React from 'react'
import { mount, shallow } from 'enzyme'
import Sortable from '..'
import List from '../Sortable.List'
import SortableItem from '../Sortable.Item'
import SidebarCollapsibleCard from '../../SidebarCollapsibleCard'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Sortable />)

    expect(wrapper.hasClass('c-Sortable')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<Sortable className={customClass} />)

    expect(wrapper.hasClass(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Can render without children', () => {
    const wrapper = shallow(<Sortable />)

    expect(wrapper.state().items.length).toBe(0)
  })

  test('Remaps children to state as SortableItem components', () => {
    const wrapper = shallow(
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
  })

  test('Provides children with unique keys, if id prop is not defined', () => {
    const wrapper = shallow(
      <Sortable>
        <div>Ron</div>
        <div>Champ</div>
        <div>Brick</div>
      </Sortable>
    )
    const o = wrapper.state().items[0]
    const p = wrapper.state().items[1]

    expect(o.key).not.toBe(p.key)
  })

  test('Use ID from child as key, if defined', () => {
    const wrapper = shallow(
      <Sortable>
        <div id="ron">Ron</div>
        <div id="champ">Champ</div>
        <div>Brick</div>
      </Sortable>
    )
    const o = wrapper.state().items[0]
    const p = wrapper.state().items[1]

    expect(o.key).toContain('ron')
    expect(p.key).toContain('champ')
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
    const wrapper = shallow(
      <Sortable>
        <SortableItem>Ron</SortableItem>
        <SortableItem>Champ</SortableItem>
        <SortableItem>Brick</SortableItem>
      </Sortable>
    )
    const o = wrapper.state().items

    expect(o.length).toBe(3)
  })

  test('Can render SortableItem components + regular compnents', () => {
    const wrapper = shallow(
      <Sortable>
        <SortableItem>Ron</SortableItem>
        <SortableItem>Champ</SortableItem>
        <div>Brian</div>
        <SortableItem>Brick</SortableItem>
      </Sortable>
    )
    const o = wrapper.state().items

    expect(o.length).toBe(4)
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

describe('Stateful parent component', () => {
  class ParentComponent extends React.Component {
    constructor(props) {
      super()
      this.state = {
        items: props.items ? props.items : [],
      }
      this.handleOnSort = this.handleOnSort.bind(this)
    }

    handleOnSort() {
      this.setState({ items: this.state.items.concat('Brian') })
    }

    render() {
      const items = this.state.items.map(i => <div key={i}>{i}</div>)

      return <Sortable onSortEnd={this.handleOnSort}>{items}</Sortable>
    }
  }

  class ParentComponentTwo extends React.Component {
    constructor(props) {
      super()
      this.state = {
        value: 0,
        items: props.items ? props.items : [],
      }
      this.handleOnSort = this.handleOnSort.bind(this)
    }

    handleOnSort() {
      this.setState({
        value: this.state.value + 1,
      })
    }

    render() {
      const { className } = this.props
      const items = this.state.items.map(i => <div key={i}>{i}</div>)

      return (
        <Sortable onSortEnd={this.handleOnSort} className={className}>
          {items}
        </Sortable>
      )
    }
  }

  test('Should re-render items stateful change via onSortEnd', () => {
    const items = ['Ron', 'Brick', 'Champ']
    const wrapper = mount(<ParentComponent items={items} />)
    const o = wrapper.find(Sortable)
    const oldState = o.instance().state

    expect(wrapper.find('.c-SortableItem').length).toBe(3)
    o.props().onSortEnd()

    expect(oldState.items).not.toEqual(
      wrapper.find(Sortable).instance().state.items
    )

    wrapper.unmount()
  })

  test('Should only re-render Sortable if children prop is updated', () => {
    const items = ['Ron', 'Brick', 'Champ']
    const wrapper = mount(<ParentComponentTwo items={items} />)
    const o = wrapper.find(Sortable)
    const oldWrapperState = wrapper.state()
    const oldState = o.instance().state

    expect(wrapper.find('.c-SortableItem').length).toBe(3)
    o.props().onSortEnd()

    wrapper.setProps({ className: 'news-team' })

    expect(oldWrapperState).not.toEqual(wrapper.state())
    expect(oldState.items).toEqual(o.instance().state.items)

    wrapper.unmount()
  })
})

describe('onSortEnd', () => {
  it('Should be attached to the Sortable object', () => {
    const spy = jest.fn()
    const wrapper = shallow(<Sortable onSortEnd={spy} />)
    const o = wrapper.instance()

    o.onSortEnd({ oldIndex: 1, newIndex: 2 })

    expect(spy).toHaveBeenCalled()
  })

  it('onSortEnd prop should not directly be passed to List component', () => {
    const spy = jest.fn()
    const wrapper = shallow(<Sortable onSortEnd={spy} />)
    const o = wrapper.find(List)

    expect(o.props().onSortEnd).not.toBe(spy)
  })
})
