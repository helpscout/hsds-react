import React from 'react'
import { shallow } from 'enzyme'
import { default as Spinner, iconSizes } from '../index'
import { Icon, VisuallyHidden } from '../../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Spinner />)

    expect(wrapper.hasClass('c-Spinner')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<Spinner className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Accessibility', () => {
  test('Contains aria-role', () => {
    const wrapper = shallow(<Spinner />)

    expect(wrapper.props()['aria-busy']).toBeTruthy()
  })

  test('Contains hidden loading text', () => {
    const wrapper = shallow(<Spinner />)
    const o = wrapper.find(VisuallyHidden)

    expect(o.length).toBeGreaterThan(0)
  })
})

describe('Children', () => {
  test('Does not render children', () => {
    const wrapper = shallow(
      <Spinner>
        <div className="child">Hello</div>
      </Spinner>
    )
    const el = wrapper.find('div.child')

    expect(el.length).toBe(0)
  })
})

describe('Icon', () => {
  test('Renders a spinner Icon', () => {
    const wrapper = shallow(<Spinner />)
    const o = wrapper.find(Icon)

    expect(o.length).toBe(1)
    expect(o.prop('name')).toBe('spinner')
  })

  test('Can render a different size', () => {
    const wrapper = shallow(<Spinner size="xs" />)
    const o = wrapper.find(Icon)

    expect(o.length).toBe(1)
    expect(o.prop('size')).toBe(iconSizes['xs'])
  })
})
