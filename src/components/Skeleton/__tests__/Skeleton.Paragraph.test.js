import React from 'react'
import { mount } from 'enzyme'
import Paragraph from '../Skeleton.Paragraph'
import Text from '../Skeleton.Text'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = mount(<Paragraph />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SkeletonParagraph')
    ).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = mount(<Paragraph className="ron" />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SkeletonParagraph')
    ).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('ron')).toBeTruthy()
  })
})

describe('content', () => {
  test('Contains Skeleton.Text elements', () => {
    const wrapper = mount(<Paragraph />)
    const text = wrapper.find(Text)

    expect(text.length > 1).toBeTruthy()
  })
})

describe('Animations', () => {
  test('Can disable animations for child Text components', () => {
    const wrapper = mount(<Paragraph withAnimations={false} />)
    const text = wrapper.find(Text).first()

    expect(text.getDOMNode().classList.contains('is-withAnimations')).toBe(
      false
    )
  })
})
