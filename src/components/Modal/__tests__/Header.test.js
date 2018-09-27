import React from 'react'
import { shallow } from 'enzyme'
import Header from '../Header'
import { Toolbar } from '../../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Header />)

    expect(wrapper.hasClass('c-ModalHeader')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<Header className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = shallow(
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
    const wrapper = shallow(<Header />)
    const o = wrapper.find(Toolbar)

    expect(o.hasClass('c-ModalHeader')).toBe(true)
  })

  test('Has correct Toolbar placement', () => {
    const wrapper = shallow(<Header />)
    const o = wrapper.find(Toolbar)

    expect(o.prop('placement')).toBe('top')
  })

  test('Can pass props to Toolbar', () => {
    const wrapper = shallow(<Header shadow seamless />)
    const o = wrapper.find(Toolbar)

    expect(o.prop('seamless')).toBe(true)
    expect(o.prop('shadow')).toBe(true)
  })
})
