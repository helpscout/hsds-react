import * as React from 'react'
import { mount } from 'enzyme'
import Overlay from '../Overlay'

describe('Accessibility', () => {
  test('Has aria-role', () => {
    const wrapper = mount(<Overlay />)
    const o = wrapper.find('.c-Overlay').first()

    expect(o.prop('role')).toBe('dialog')
  })
})

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Overlay />)
    const o = wrapper.find('.c-Overlay').first()

    expect(o.length).toBe(1)
  })

  test('Accepts custom className', () => {
    const wrapper = mount(<Overlay className="not-metro-man" />)

    expect(wrapper.prop('className')).toContain('not-metro-man')
  })
})

describe('Content', () => {
  test('Renders child content', () => {
    const wrapper = mount(<Overlay>Megamind</Overlay>)

    expect(wrapper.text()).toBe('Megamind')
  })

  test('Render child components', () => {
    const wrapper = mount(
      <Overlay className="mega">
        <Overlay className="mind">Megamind</Overlay>
      </Overlay>
    )

    expect(wrapper.find('.mind').length).toBeTruthy()
  })
})

describe('Click', () => {
  test('Can trigger onClick callback', () => {
    let value = false
    const onClick = () => {
      value = true
    }
    const wrapper = mount(<Overlay onClick={onClick} />)

    wrapper.simulate('click')

    expect(value).toBeTruthy()
  })
})

describe('Styles', () => {
  test('Renders inline-styles, if specified', () => {
    const style = {
      background: 'blue',
    }
    const wrapper = mount(<Overlay style={style} />)

    expect(wrapper.prop('style')).toBe(style)
  })

  test('Renders fixed styles, if specified', () => {
    const wrapper = mount(<Overlay fixed />)

    expect(wrapper.getDOMNode().classList.contains('is-fixed')).toBeTruthy()
  })

  test('Renders transparent styles, if specified', () => {
    const wrapper = mount(<Overlay transparent />)

    expect(
      wrapper.getDOMNode().classList.contains('is-transparent')
    ).toBeTruthy()
  })
})
