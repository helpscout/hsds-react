import * as React from 'react'
import { mount } from 'enzyme'
import { Spinner } from '../Spinner'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Spinner />)

    expect(wrapper.hasClass('c-Spinner')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Spinner className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Accessibility', () => {
  test('Contains aria-role', () => {
    const wrapper = mount(<Spinner />)

    expect(wrapper.props()['aria-busy']).toBeTruthy()
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
