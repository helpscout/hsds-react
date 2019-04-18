import * as React from 'react'
import { mount } from 'enzyme'
import { Spinner } from '../Spinner'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Spinner />)
    const el = wrapper.find('div.c-Spinner')

    expect(el.hasClass('c-Spinner')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Spinner className={customClass} />)
    const el = wrapper.find('div.c-Spinner')

    expect(el.prop('className')).toContain(customClass)
  })
})

describe('Accessibility', () => {
  test('Contains aria-role', () => {
    const wrapper = mount(<Spinner />)
    const el = wrapper.find('div.c-Spinner')

    expect(el.props()['aria-busy']).toBeTruthy()
  })

  test('Contains hidden loading text', () => {
    const wrapper = mount(<Spinner />)
    const o = wrapper.find('VisuallyHidden')

    expect(o.length).toBeGreaterThan(0)
  })
})

describe('Children', () => {
  test('Does not render children', () => {
    const wrapper = mount(
      <Spinner>
        <div className="child">Hello</div>
      </Spinner>
    )
    const el = wrapper.find('div.child')

    expect(el.length).toBe(0)
  })
})

describe('Size', () => {
  test('Uses legacy size (string -> number) if defined', () => {
    const wrapper = mount(<Spinner size="lg" />)
    const el = wrapper.find('.c-SpinnerSVG').first()

    expect(el.prop('spinnerSize')).toBe(24)
  })

  test('Uses direct number size, if defined', () => {
    const wrapper = mount(<Spinner size={123} />)
    const el = wrapper.find('.c-SpinnerSVG').first()

    expect(el.prop('spinnerSize')).toBe(123)
  })

  test('Falls back to defaultSize if legacy size is invalid', () => {
    const defaultSize = 16
    const wrapper = mount(<Spinner size="omg" />)
    const el = wrapper.find('.c-SpinnerSVG').first()

    expect(el.prop('spinnerSize')).toBe(defaultSize)
  })
})
