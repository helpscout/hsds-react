import React from 'react'
import { mount, shallow } from 'enzyme'
import Text from '../Text'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Text />)

    expect(wrapper.hasClass('c-SkeletonText')).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = shallow(<Text className="ron" />)

    expect(wrapper.hasClass('c-SkeletonText')).toBeTruthy()
    expect(wrapper.hasClass('ron')).toBeTruthy()
  })
})

describe('Heading', () => {
  test('Does not have heading styles by default', () => {
    const wrapper = mount(<Text />)

    expect(wrapper.hasClass('is-heading')).not.toBeTruthy()
  })

  test('Can render heading styles', () => {
    const wrapper = mount(<Text heading />)

    expect(wrapper.hasClass('is-heading')).toBeTruthy()
  })
})

describe('Width', () => {
  test('Has a default width', () => {
    const wrapper = mount(<Text />)

    expect(wrapper.props().width).toBeTruthy()
  })

  test('Can set a (number) width', () => {
    const wrapper = mount(<Text width={50} />)

    expect(wrapper.props().width).toBe(50)
  })

  test('Can set a (string) width', () => {
    const wrapper = mount(<Text width="85rem" />)

    expect(wrapper.props().width).toBe('85rem')
  })

  test('Width prop is used in styles', () => {
    const wrapper = mount(<Text width="85rem" />)
    const o = wrapper.find('.c-SkeletonText')

    expect(o.props().style.width).toBe('85rem')
  })
})
