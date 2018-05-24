import React from 'react'
import { shallow } from 'enzyme'
import Content from '../Content'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Content />)

    expect(wrapper.hasClass('c-ModalContent')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<Content className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = shallow(
      <Content>
        <div className="child">Hello</div>
      </Content>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })

  test('Can handle null content', () => {
    const wrapper = shallow(<Content>{[null]}</Content>)

    expect(wrapper).toBeTruthy()
  })
})
