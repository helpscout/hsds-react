import React from 'react'
import Tooltip from '../index'
import Pop from '../../Pop'
import { mount } from 'enzyme'

jest.mock('../Tooltip.Popper', () => {
  const Popper = ({ className, children }) => (
    <div className={className}>{children}</div>
  )
  return Popper
})

describe('classNames', () => {
  test('Can accept custom className', () => {
    const wrapper = mount(
      <Tooltip className="derek">
        <div />
      </Tooltip>
    )

    expect(wrapper.hasClass('derek')).toBe(true)
  })
})

describe('Children', () => {
  test('Can render children', () => {
    const wrapper = mount(
      <Tooltip title="Pop">
        <div className="ron" />
      </Tooltip>
    )
    const el = wrapper.find('.ron')

    expect(el.length).toBeTruthy()
  })

  test('Can render children, without title', () => {
    const wrapper = mount(
      <Tooltip>
        <div className="ron" />
      </Tooltip>
    )
    const el = wrapper.find('.ron')

    expect(el.length).toBeTruthy()
  })
})

describe('Pop', () => {
  test('Does not render a Pop component, without title', () => {
    const wrapper = mount(<Tooltip />)
    const pop = wrapper.find(Pop)

    expect(pop.length).not.toBeTruthy()
  })

  test('Renders a Pop component', () => {
    const wrapper = mount(<Tooltip title="Pop" />)
    const pop = wrapper.find(Pop)

    expect(pop.length).toBeTruthy()
  })

  test('Renders a Pop component via renderContent', () => {
    const wrapper = mount(<Tooltip renderContent={() => <div />} />)
    const pop = wrapper.find(Pop)

    expect(pop.length).toBeTruthy()
  })

  test('Does not render Pop if title + renderContent are undefined', () => {
    const wrapper = mount(
      <Tooltip>
        <div />
      </Tooltip>
    )
    const pop = wrapper.find(Pop)

    expect(pop.length).toBeFalsy()
  })

  test('Passes props to internal Pop component', () => {
    const props = {
      animationDelay: 1000,
      animationDuration: 2000,
      animationSequence: 'fade',
      placement: 'bottom',
      triggerOn: 'click',
      title: 'Pop',
    }
    const wrapper = mount(<Tooltip {...props} />)
    const pop = wrapper.find(Pop).props()

    expect(pop.animationDelay).toBe(props.animationDelay)
    expect(pop.animationDuration).toBe(props.animationDuration)
    expect(pop.animationSequence).toBe(props.animationSequence)
    expect(pop.placement).toBe(props.placement)
    expect(pop.triggerOn).toBe(props.triggerOn)
  })

  test('Renders children (string) into Pop.Reference', () => {
    const wrapper = mount(<Tooltip title="Pop">Ron</Tooltip>)
    const pop = wrapper.find(Pop.Reference)

    expect(pop.props().children).toContain('Ron')
  })

  test('Renders children (HTML Element) into Pop.Reference', () => {
    const wrapper = mount(
      <Tooltip title="Pop">
        <div className="ron">Ron</div>
      </Tooltip>
    )
    const pop = wrapper.find(Pop.Reference)

    expect(pop.find('.ron').length).toBeTruthy()
  })
})
