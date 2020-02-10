import React from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import Text from '../Skeleton.Text'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = mount(<Text />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SkeletonText')
    ).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = mount(<Text className="ron" />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SkeletonText')
    ).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('ron')).toBeTruthy()
  })
})

describe('Heading', () => {
  test('Does not have heading styles by default', () => {
    const wrapper = mount(<Text />)

    expect(
      wrapper.getDOMNode().classList.contains('is-heading')
    ).not.toBeTruthy()
  })

  test('Can render heading styles', () => {
    const wrapper = mount(<Text heading />)

    expect(wrapper.getDOMNode().classList.contains('is-heading')).toBeTruthy()
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
    const o = wrapper.find('.c-SkeletonText').first()

    expect(o.props().style.width).toBe('85rem')
  })
})

describe('Size', () => {
  test('Has no size by default', () => {
    const wrapper = mount(<Text />)
    expect(wrapper.props().size).toBeUndefined()
  })

  test('Can set a size', () => {
    const wrapper = mount(<Text size="sm" />)
    expect(wrapper.props().size).toEqual('sm')
    expect(wrapper.getDOMNode().classList.contains('is-sm')).toBeTruthy()
  })
})
