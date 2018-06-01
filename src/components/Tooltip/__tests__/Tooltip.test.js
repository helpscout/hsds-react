import React from 'react'
import Tooltip from '../index'
import Popper from '../Popper'
import Pop from '../../Pop'
import { mount, shallow } from 'enzyme'

describe('classNames', () => {
  test('Can accept custom className', () => {
    const wrapper = shallow(<Tooltip className="derek" />)

    expect(wrapper.hasClass('derek')).toBe(true)
  })

  test('Has unique styled className', () => {
    const wrapper = mount(<Tooltip />)
    const styles = wrapper.instance().styles

    expect(wrapper.hasClass(styles['c-Tooltip'])).toBe(true)
  })
})

describe('Children', () => {
  test('Can render children', () => {
    const wrapper = shallow(
      <Tooltip>
        <div className="ron" />
      </Tooltip>
    )
    const el = wrapper.find('.ron')

    expect(el.length).toBeTruthy()
  })
})

describe('Pop', () => {
  test('Renders a Pop component', () => {
    const wrapper = mount(<Tooltip />)
    const pop = wrapper.find(Pop)

    expect(pop.length).toBeTruthy()
  })

  test('Passes props to internal Pop component', () => {
    const props = {
      animationDelay: 1000,
      animationDuration: 2000,
      animationSequence: 'fade',
      placement: 'bottom',
      triggerOn: 'click',
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
    const wrapper = mount(<Tooltip>Ron</Tooltip>)
    const pop = wrapper.find(Pop.Reference)

    expect(pop.props().children).toContain('Ron')
  })

  test('Renders children (HTML Element) into Pop.Reference', () => {
    const wrapper = mount(
      <Tooltip>
        <div className="ron">Ron</div>
      </Tooltip>
    )
    const pop = wrapper.find(Pop.Reference)

    expect(pop.find('.ron').length).toBeTruthy()
  })
})
