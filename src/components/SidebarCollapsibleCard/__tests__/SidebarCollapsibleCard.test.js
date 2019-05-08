import * as React from 'react'
import { mount } from 'enzyme'
import SidebarCollapsibleCard from '..'

const simulateEvent = eventName => {
  window.dispatchEvent(new Event(eventName))
}

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<SidebarCollapsibleCard />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SidebarCollapsibleCard')
    ).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<SidebarCollapsibleCard className={customClass} />)

    expect(wrapper.getDOMNode().classList.contains(customClass)).toBe(true)
  })
})

describe('Accessibility', () => {
  test('Has correct accessibility roles/props', () => {
    const wrapper = mount(<SidebarCollapsibleCard />)
    const el = wrapper.find('div').first()
    const id = el.props().id
    const header = wrapper.find('.c-SidebarCollapsibleCard__header')
    const body = wrapper.find('.c-SidebarCollapsibleCard__body')

    expect(id).toContain('SidebarCollapsibleCard')
    expect(el.props().role).toBe('presentation')
    expect(header.props().role).toBe('heading')
    expect(header.props()['aria-expanded']).toBeFalsy()
    expect(header.props()['aria-controls']).toContain(id)
    expect(header.props()['aria-controls']).toContain('region')
    expect(body.props().role).toBe('region')
    expect(body.props().id).toContain(id)
    expect(body.props().id).toContain('region')
  })
})

describe('Open', () => {
  test('Should apply open styles, if specified', () => {
    const wrapper = mount(<SidebarCollapsibleCard isOpen />)

    expect(wrapper.getDOMNode().classList.contains('is-open')).toBeTruthy()
  })

  test('Should not be open by default', () => {
    const wrapper = mount(<SidebarCollapsibleCard />)

    expect(wrapper.getDOMNode().classList.contains('is-open')).not.toBeTruthy()
  })

  test('Can change state by updating isOpen prop', () => {
    const wrapper = mount(<SidebarCollapsibleCard />)
    wrapper.setProps({ isOpen: true })

    expect(wrapper.getDOMNode().classList.contains('is-open')).toBeTruthy()
    expect(wrapper.state().isOpen).toBeTruthy()

    wrapper.setProps({ isOpen: false })

    expect(wrapper.getDOMNode().classList.contains('is-open')).not.toBeTruthy()
    expect(wrapper.state().isOpen).not.toBeTruthy()
  })
})

describe('Header/Title', () => {
  test('Should not render a heading by default', () => {
    const wrapper = mount(<SidebarCollapsibleCard />)
    const o = wrapper.find('.c-SidebarCollapsibleCard__title')

    expect(o.length).toBe(0)
  })

  test('Should render a Heading if title is defined', () => {
    const wrapper = mount(<SidebarCollapsibleCard title="Ron" />)
    const o = wrapper.find('.c-SidebarCollapsibleCard__title').first()

    expect(o.length).toBeTruthy()
    expect(o.html()).toContain('Ron')
  })

  test('Can render a custom header (component)', () => {
    const Header = <div className="milk">Bad Choice</div>
    const wrapper = mount(<SidebarCollapsibleCard header={Header} />)
    const o = wrapper.find('.c-SidebarCollapsibleCard__title')
    const n = wrapper.find('.milk')

    expect(o.length).toBe(0)
    expect(n.length).toBeTruthy()
    expect(n.html()).toContain('Bad Choice')
  })

  test('Custom header (component) is prioritized over title', () => {
    const Header = <div className="milk">Bad Choice</div>
    const wrapper = mount(
      <SidebarCollapsibleCard header={Header} title="Ron" />
    )
    const o = wrapper.find('.c-SidebarCollapsibleCard__title')
    const n = wrapper.find('.milk')

    expect(o.length).toBe(0)
    expect(n.length).toBeTruthy()
    expect(n.html()).toContain('Bad Choice')
  })

  test('Clicking the header expands/collapses the card', () => {
    const wrapper = mount(<SidebarCollapsibleCard title="Ron" />)
    const o = wrapper.find('.c-SidebarCollapsibleCard__header')

    expect(wrapper.state().isOpen).not.toBeTruthy()

    o.simulate('click')
    expect(wrapper.state().isOpen).toBeTruthy()

    o.simulate('click')
    expect(wrapper.state().isOpen).not.toBeTruthy()

    wrapper.unmount()
  })
})

describe('Caret', () => {
  test('Should have a default position of down, on close', () => {
    const wrapper = mount(<SidebarCollapsibleCard />)
    const o = wrapper.find('Icon')

    expect(o.props().name).toContain('down')
  })

  test('Should have a position of up, on open', () => {
    const wrapper = mount(<SidebarCollapsibleCard isOpen />)
    const o = wrapper.find('Icon')

    expect(o.props().name).toContain('up')
  })

  test('Should transition from down to up on isOpen change', () => {
    const wrapper = mount(<SidebarCollapsibleCard />)
    let o = wrapper.find('Icon')

    expect(o.props().name).toContain('down')

    wrapper.setState({ isOpen: true })
    o = wrapper.find('Icon')
    expect(o.props().name).toContain('up')

    wrapper.setState({ isOpen: false })
    o = wrapper.find('Icon')
    expect(o.props().name).toContain('down')

    wrapper.unmount()
  })
})

describe('Collapsible', () => {
  test('Passes props to Collapsible', () => {
    const fn = jest.fn()
    const wrapper = mount(
      <SidebarCollapsibleCard
        isOpen
        onOpen={fn}
        onClose={fn}
        duration={1000}
        durationOpen={300}
        durationClose={500}
      />
    )
    const o = wrapper.find('Collapsible')
    const p = o.props()

    expect(o.length).toBeTruthy()
    expect(p.duration).toBe(1000)
    expect(p.durationOpen).toBe(300)
    expect(p.durationClose).toBe(500)
    expect(p.isOpen).toBe(true)
    expect(p.onOpen).toBe(fn)
    expect(p.onClose).toBe(fn)
  })
})

describe('Sortable', () => {
  test('Not sortable by default', () => {
    const wrapper = mount(<SidebarCollapsibleCard />)
    const o = wrapper.find('.c-SidebarCollapsibleCard__drag-handle')

    expect(o.length).toBe(0)
  })

  test('Adds Sortable.DragHandle if sortable', () => {
    const wrapper = mount(<SidebarCollapsibleCard sortable />)
    const o = wrapper.find('.c-SidebarCollapsibleCard__drag-handle')

    expect(o.length).toBeTruthy()
  })

  test('onSortStart callback can fire when sort begins', () => {
    const spy = jest.fn()
    const wrapper = mount(<SidebarCollapsibleCard sortable onSortStart={spy} />)
    const h = wrapper.find('.c-SidebarCollapsibleCard__drag-handle').first()
    h.simulate('mousedown')

    expect(spy).toHaveBeenCalled()
  })

  test('Should collapse onSortStart and cache prev openState', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <SidebarCollapsibleCard sortable onSortStart={spy} isOpen />
    )
    const o = wrapper.instance()
    const h = wrapper.find('.c-SidebarCollapsibleCard__drag-handle').first()
    h.simulate('mousedown')

    expect(o._prevIsOpen).toBeTruthy()
    expect(o.isSorting).toBeTruthy()
    expect(o.state.isOpen).toBeFalsy()
  })

  test('onSortEnd callback can fire when sort ends', () => {
    const spy = jest.fn()
    const wrapper = mount(<SidebarCollapsibleCard sortable onSortEnd={spy} />)
    const h = wrapper.find('.c-SidebarCollapsibleCard__drag-handle').first()
    h.simulate('mousedown')
    simulateEvent('mouseup')

    expect(spy).toHaveBeenCalled()
  })

  test('onSortEnd callback can only fire when isSorting', () => {
    const spy = jest.fn()
    const wrapper = mount(<SidebarCollapsibleCard sortable onSortEnd={spy} />)
    const h = wrapper.find('.c-SidebarCollapsibleCard__drag-handle').first()
    simulateEvent('mouseup')
    simulateEvent('mouseup')
    simulateEvent('mouseup')
    simulateEvent('mouseup')
    simulateEvent('mouseup')
    h.simulate('mousedown')
    simulateEvent('mouseup')

    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('Should expand onSortEnd, if previously opened', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <SidebarCollapsibleCard sortable onSortStart={spy} isOpen />
    )
    const o = wrapper.instance()
    const h = wrapper.find('.c-SidebarCollapsibleCard__drag-handle').first()
    h.simulate('mousedown')

    expect(o.state.isOpen).toBeFalsy()

    simulateEvent('mouseup')

    expect(o.isSorting).not.toBeTruthy()
    expect(o.state.isOpen).toBeTruthy()
  })
})
