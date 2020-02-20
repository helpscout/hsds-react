import React from 'react'
import { mount } from 'enzyme'
import Footer from '../Modal.Footer'
import { Toolbar } from '../../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Footer />)
    const o = wrapper.find('.c-ModalFooter').first()

    expect(o.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Footer className={customClass} />)
    const o = wrapper.find('.c-ModalFooter').first()

    expect(o.hasClass(customClass)).toBe(true)
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <Footer>
        <div className="child">Hello</div>
      </Footer>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

describe('Toolbar', () => {
  test('Is composed of Toolbar', () => {
    const wrapper = mount(<Footer />)
    const o = wrapper.find(Toolbar).first()

    expect(o.length).toBe(1)
  })

  test('Has correct Toolbar placement', () => {
    const wrapper = mount(<Footer />)
    const o = wrapper.find(Toolbar).first()

    expect(o.props().placement).toBe('bottom')
  })

  test('Can pass props to Toolbar', () => {
    const wrapper = mount(<Footer shadow seamless />)
    const o = wrapper.find(Toolbar).first()

    expect(o.props().seamless).toBe(true)
    expect(o.props().shadow).toBe(true)
  })
})
