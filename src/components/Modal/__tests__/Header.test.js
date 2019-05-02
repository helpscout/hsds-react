import * as React from 'react'
import { mount } from 'enzyme'
import Header from '../Modal.Header'
import { Toolbar } from '../../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Header />)
    const o = wrapper.find('.c-ModalHeader').first()

    expect(o.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Header className={customClass} />)
    const o = wrapper.find('.c-ModalHeader').first()

    expect(o.hasClass(customClass)).toBe(true)
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <Header>
        <div className="child">Hello</div>
      </Header>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

describe('Toolbar', () => {
  test('Is composed of Toolbar', () => {
    const wrapper = mount(<Header />)
    const o = wrapper.find(Toolbar)

    expect(o.length).toBe(1)
  })

  test('Has correct Toolbar placement', () => {
    const wrapper = mount(<Header />)
    const o = wrapper.find(Toolbar)

    expect(o.props().placement).toBe('top')
  })

  test('Can pass props to Toolbar', () => {
    const wrapper = mount(<Header shadow seamless />)
    const o = wrapper.find(Toolbar)

    expect(o.props().seamless).toBe(true)
    expect(o.props().shadow).toBe(true)
  })
})
