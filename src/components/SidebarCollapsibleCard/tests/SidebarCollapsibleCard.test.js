import React from 'react'
import { mount, shallow } from 'enzyme'
import SidebarCollapsibleCard from '..'
import { baseComponentTest } from '../../../tests/helpers/components'

const baseComponentOptions = {
  className: 'c-SidebarCollapsibleCard',
  skipChildrenTest: true
}

baseComponentTest(SidebarCollapsibleCard, baseComponentOptions)

describe('Accessibility', () => {
  test('Has correct accessibility roles/props', () => {
    const wrapper = shallow(<SidebarCollapsibleCard />)
    const id = wrapper.props().id
    const header = wrapper.find('.c-SidebarCollapsibleCard__header')
    const body = wrapper.find('.c-SidebarCollapsibleCard__body')

    expect(id).toContain('SidebarCollapsibleCard')
    expect(wrapper.props().role).toBe('presentation')
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
    const wrapper = shallow(<SidebarCollapsibleCard isOpen />)

    expect(wrapper.hasClass('is-open')).toBeTruthy()
  })

  test('Should not be open by default', () => {
    const wrapper = shallow(<SidebarCollapsibleCard />)

    expect(wrapper.hasClass('is-open')).not.toBeTruthy()
  })

  test('Can change state by updating isOpen prop', () => {
    const wrapper = shallow(<SidebarCollapsibleCard />)
    wrapper.setProps({ isOpen: true })

    expect(wrapper.hasClass('is-open')).toBeTruthy()
    expect(wrapper.state().isOpen).toBeTruthy()

    wrapper.setProps({ isOpen: false })

    expect(wrapper.hasClass('is-open')).not.toBeTruthy()
    expect(wrapper.state().isOpen).not.toBeTruthy()
  })
})

describe('Header/Title', () => {
  test('Should not render a heading by default', () => {
    const wrapper = shallow(<SidebarCollapsibleCard />)
    const o = wrapper.find('.c-SidebarCollapsibleCard__title')

    expect(o.length).toBe(0)
  })

  test('Should render a Heading if title is defined', () => {
    const wrapper = shallow(<SidebarCollapsibleCard title='Ron' />)
    const o = wrapper.find('.c-SidebarCollapsibleCard__title')

    expect(o.length).toBe(1)
    expect(o.html()).toContain('Ron')
  })

  test('Can render a custom header (component)', () => {
    const Header = (
      <div className='milk'>Bad Choice</div>
    )
    const wrapper = shallow(<SidebarCollapsibleCard header={Header} />)
    const o = wrapper.find('.c-SidebarCollapsibleCard__title')
    const n = wrapper.find('.milk')

    expect(o.length).toBe(0)
    expect(n.length).toBe(1)
    expect(n.html()).toContain('Bad Choice')
  })

  test('Custom header (component) is prioritized over title', () => {
    const Header = (
      <div className='milk'>Bad Choice</div>
    )
    const wrapper = shallow(<SidebarCollapsibleCard header={Header} title='Ron' />)
    const o = wrapper.find('.c-SidebarCollapsibleCard__title')
    const n = wrapper.find('.milk')

    expect(o.length).toBe(0)
    expect(n.length).toBe(1)
    expect(n.html()).toContain('Bad Choice')
  })

  test('Clicking the header expands/collapses the card', () => {
    const wrapper = mount(<SidebarCollapsibleCard title='Ron' />)
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
    const wrapper = shallow(<SidebarCollapsibleCard />)
    const o = wrapper.find('Icon')

    expect(o.props().name).toContain('down')
  })

  test('Should have a position of up, on open', () => {
    const wrapper = shallow(<SidebarCollapsibleCard isOpen />)
    const o = wrapper.find('Icon')

    expect(o.props().name).toContain('up')
  })

  test('Should transition from down to up on isOpen change', () => {
    const wrapper = mount(<SidebarCollapsibleCard />)
    const o = wrapper.find('Icon')

    expect(o.props().name).toContain('down')

    wrapper.setState({ isOpen: true })
    expect(o.props().name).toContain('up')

    wrapper.setState({ isOpen: false })
    expect(o.props().name).toContain('down')

    wrapper.unmount()
  })
})

describe('Collapsible', () => {
  test('Passes props to Collapsible', () => {
    const fn = jest.fn()
    const wrapper = shallow(
      <SidebarCollapsibleCard
        isOpen
        onOpen={fn}
        onClose={fn}
        duration={1000}
      />
    )
    const o = wrapper.find('Collapsible')
    const p = o.props()

    expect(o.length).toBe(1)
    expect(p.duration).toBe(1000)
    expect(p.isOpen).toBe(true)
    expect(p.onOpen).toBe(fn)
    expect(p.onClose).toBe(fn)
  })
})

describe('Sortable', () => {
  test('Not sortable by default', () => {
    const wrapper = shallow(
      <SidebarCollapsibleCard />
    )
    const o = wrapper.find('.c-SidebarCollapsibleCard__drag-handle')

    expect(o.length).toBe(0)
  })

  test('Adds Sortable.DragHandle if sortable', () => {
    const wrapper = shallow(
      <SidebarCollapsibleCard sortable />
    )
    const o = wrapper.find('.c-SidebarCollapsibleCard__drag-handle')

    expect(o.length).toBe(1)
  })
})
