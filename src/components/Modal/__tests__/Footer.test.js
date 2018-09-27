import React from 'react'
import { shallow } from 'enzyme'
import Footer from '../Footer'
import { Toolbar } from '../../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Footer />)

    expect(wrapper.hasClass('c-ModalFooter')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<Footer className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = shallow(
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
    const wrapper = shallow(<Footer />)
    const o = wrapper.find(Toolbar)

    expect(o.hasClass('c-ModalFooter')).toBe(true)
  })

  test('Has correct Toolbar placement', () => {
    const wrapper = shallow(<Footer />)
    const o = wrapper.find(Toolbar)

    expect(o.prop('placement')).toBe('bottom')
  })

  test('Can pass props to Toolbar', () => {
    const wrapper = shallow(<Footer shadow seamless />)
    const o = wrapper.find(Toolbar)

    expect(o.prop('seamless')).toBe(true)
    expect(o.prop('shadow')).toBe(true)
  })
})
