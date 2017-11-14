import React from 'react'
import { shallow } from 'enzyme'
import Paragraph from '../Paragraph'
import Text from '../Text'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = shallow(
      <Paragraph />
    )

    expect(wrapper.hasClass('c-SkeletonParagraph')).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = shallow(
      <Paragraph className='ron' />
    )

    expect(wrapper.hasClass('c-SkeletonParagraph')).toBeTruthy()
    expect(wrapper.hasClass('ron')).toBeTruthy()
  })
})

describe('content', () => {
  test('Contains Skeleton.Text elements', () => {
    const wrapper = shallow(
      <Paragraph />
    )
    const text = wrapper.find(Text)

    expect(text.length > 1).toBeTruthy()
  })
})
