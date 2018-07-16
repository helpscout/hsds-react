import React from 'react'
import { mount } from 'enzyme'
import Image from '../index'

describe('Dimensions', () => {
  test('Render width/height props', () => {
    const wrapper = mount(<Image width="200" height="100" src="mugatu.jpg" />)

    expect(wrapper.prop('width')).toBe('200')
    expect(wrapper.prop('height')).toBe('100')
  })

  test('<img> should not render width/height props if not defined', () => {
    const wrapper = mount(<Image src="mugatu.jpg" />)

    expect(wrapper.prop('width')).toBeFalsy()
    expect(wrapper.prop('height')).toBeFalsy()
  })
})

describe('Titles', () => {
  test('Render alt prop', () => {
    const o = 'Mugatu'
    const wrapper = mount(<Image alt={o} src="mugatu.jpg" />)

    expect(wrapper.prop('alt')).toBe(o)
  })

  test('Render title prop', () => {
    const o = 'Mugatu'
    const wrapper = mount(<Image title={o} src="mugatu.jpg" />)

    expect(wrapper.prop('title')).toBe(o)
  })
})

describe('ClassNames', () => {
  test('Accept classNames', () => {
    const wrapper = mount(
      <Image src="mugatu.jpg" className="so hot right now" />
    )

    const classNames = wrapper.prop('className')

    expect(wrapper.hasClass('c-Image')).toBe(true)
    expect(wrapper.hasClass('so')).toBe(true)
    expect(wrapper.hasClass('hot')).toBe(true)
  })
})

describe('Styles', () => {
  test('Applies block styles, if applied', () => {
    const wrapper = mount(
      <Image src="mugatu.jpg" className="so hot right now" block />
    )
    expect(wrapper.hasClass('is-block')).toBeTruthy()
  })

  test('Applies shape styles, if applied', () => {
    const wrapper = mount(
      <Image src="mugatu.jpg" className="so hot right now" shape="rounded" />
    )
    expect(wrapper.hasClass('is-rounded')).toBeTruthy()
  })
})

describe('Width/Height', () => {
  test('Does not render with any width/height by default', () => {
    const wrapper = mount(<Image src="mugatu.jpg" />)
    const o = wrapper.find('img')

    expect(wrapper.prop('height')).toBe(undefined)
    expect(wrapper.prop('width')).toBe(undefined)
    expect(o.prop('style').width).toBe(undefined)
    expect(o.prop('style').height).toBe(undefined)
  })

  test('Renders with a width/height, if specified', () => {
    const wrapper = mount(<Image src="mugatu.jpg" width={20} height={100} />)
    const o = wrapper.find('img')

    expect(wrapper.prop('height')).toBe(100)
    expect(wrapper.prop('width')).toBe(20)
    expect(o.prop('style').width).toBe(undefined)
    expect(o.prop('style').height).toBe(undefined)
  })

  test('Renders with a width/height, with style overrides, if specified', () => {
    const wrapper = mount(
      <Image
        src="mugatu.jpg"
        width={20}
        height={100}
        style={{ width: 21, height: 101 }}
      />
    )
    const o = wrapper.find('img')

    expect(wrapper.prop('height')).toBe(100)
    expect(wrapper.prop('width')).toBe(20)
    expect(o.prop('style').width).toBe(21)
    expect(o.prop('style').height).toBe(101)
  })

  test('Renders with an aspect fit width/height, if specified', () => {
    const wrapper = mount(
      <Image
        src="mugatu.jpg"
        width={300}
        height={150}
        maxWidth={100}
        maxHeight={100}
      />
    )
    const o = wrapper.find('img')

    expect(wrapper.prop('width')).toBe(300)
    expect(wrapper.prop('height')).toBe(150)
    expect(o.prop('style').width).toBe(100)
    expect(o.prop('style').height).toBe(50)
  })
})
