import React from 'react'
import { shallow } from 'enzyme'
import Image from '..'

describe('Dimensions', () => {
  test('Render width/height props', () => {
    const wrapper = shallow(<Image width="200" height="100" src="mugatu.jpg" />)

    expect(wrapper.prop('width')).toBe('200')
    expect(wrapper.prop('height')).toBe('100')
  })

  test('<img> should not render width/height props if not defined', () => {
    const wrapper = shallow(<Image src="mugatu.jpg" />)

    expect(wrapper.prop('width')).toBeFalsy()
    expect(wrapper.prop('height')).toBeFalsy()
  })
})

describe('Titles', () => {
  test('Render alt prop', () => {
    const o = 'Mugatu'
    const wrapper = shallow(<Image alt={o} src="mugatu.jpg" />)

    expect(wrapper.prop('alt')).toBe(o)
  })

  test('Render title prop', () => {
    const o = 'Mugatu'
    const wrapper = shallow(<Image title={o} src="mugatu.jpg" />)

    expect(wrapper.prop('title')).toBe(o)
  })
})

describe('ClassNames', () => {
  test('Accept classNames', () => {
    const wrapper = shallow(
      <Image src="mugatu.jpg" className="so hot right now" />
    )

    const classNames = wrapper.prop('className')

    expect(classNames).toContain('c-Image')
    expect(classNames).toContain('so')
    expect(classNames).toContain('hot')
    expect(classNames).toContain('right')
    expect(classNames).toContain('now')
  })
})

describe('Styles', () => {
  test('Applies block styles, if applied', () => {
    const wrapper = shallow(
      <Image src="mugatu.jpg" className="so hot right now" block />
    )
    expect(wrapper.hasClass('is-block')).toBeTruthy()
  })

  test('Applies shape styles, if applied', () => {
    const wrapper = shallow(
      <Image src="mugatu.jpg" className="so hot right now" shape="rounded" />
    )
    expect(wrapper.hasClass('is-rounded')).toBeTruthy()
  })
})
