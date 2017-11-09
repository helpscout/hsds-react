import React from 'react'
import { createSpec, faker } from '@helpscout/helix'
import { mount, shallow } from 'enzyme'
import Truncate from '..'

const fixture = createSpec(faker.lorem.paragraph())

describe('default', () => {
  test('Auto truncates by default', () => {
    const words = fixture.generate()
    const wrapper = mount(
      <Truncate>{words}</Truncate>
    )

    expect(wrapper.props().type).toBe('auto')
    expect(wrapper.hasClass('is-auto')).toBeTruthy()
  })
})

describe('className', () => {
  test('Has default className', () => {
    const words = fixture.generate()
    const wrapper = shallow(
      <Truncate>{words}</Truncate>
    )

    expect(wrapper.hasClass('c-Truncate')).toBeTruthy()
  })

  test('Accepts additional className', () => {
    const words = fixture.generate()
    const wrapper = shallow(
      <Truncate className='mugatu'>{words}</Truncate>
    )

    expect(wrapper.hasClass('mugatu')).toBeTruthy()
  })
})

describe('ellipsis', () => {
  test('Can render custom ellipsis', () => {
    const words = fixture.generate()
    const ellipsis = 'RELAX!! ++ '
    const wrapper = shallow(
      <Truncate ellipsis={ellipsis} type='start' limit={20}>
        {words}
      </Truncate>
    )

    expect(wrapper.text()).toContain(ellipsis)
  })

  test('Can render custom ellipsis at start', () => {
    const words = fixture.generate()
    const ellipsis = 'RELAX!! ++ '
    const wrapper = shallow(
      <Truncate ellipsis={ellipsis} type='start' limit={20}>
        {words}
      </Truncate>
    )
    const renderedText = wrapper.text()

    expect(renderedText.indexOf('RELAX')).toBe(0)
  })

  test('Can render custom ellipsis in the middle', () => {
    const words = fixture.generate()
    const ellipsis = '!RELAX!'
    const wrapper = shallow(
      <Truncate ellipsis={ellipsis} type='middle' limit={10}>
        {words}
      </Truncate>
    )
    const renderedText = wrapper.text()
    const splitText = renderedText.split(ellipsis)

    expect(splitText[0].length).toBe(splitText[1].length)
  })

  test('Can render custom ellipsis in the end', () => {
    const words = fixture.generate()
    const ellipsis = '!RELAX!'
    const limit = 10
    const wrapper = shallow(
      <Truncate ellipsis={ellipsis} type='end' limit={limit}>
        {words}
      </Truncate>
    )
    const renderedText = wrapper.text()

    expect(renderedText.indexOf(ellipsis)).toBe(limit)
  })
})
