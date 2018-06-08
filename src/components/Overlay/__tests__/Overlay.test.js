import React from 'react'
import { mount, shallow } from 'enzyme'
import Overlay from '..'

describe('Accessibility', () => {
  test('Has aria-role', () => {
    const wrapper = shallow(<Overlay />)

    expect(wrapper.prop('role')).toBe('dialog')
  })
})

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Overlay />)

    expect(wrapper.prop('className')).toBe('c-Overlay')
  })

  test('Accepts custom className', () => {
    const wrapper = shallow(<Overlay className="not-metro-man" />)

    expect(wrapper.prop('className')).toContain('not-metro-man')
  })
})

describe('Content', () => {
  test('Renders child content', () => {
    const wrapper = shallow(<Overlay>Megamind</Overlay>)

    expect(wrapper.text()).toBe('Megamind')
  })

  test('Render child components', () => {
    const wrapper = mount(
      <Overlay className="mega">
        <Overlay className="mind">Megamind</Overlay>
      </Overlay>
    )

    const innerOverlay = wrapper.childAt(0)

    expect(innerOverlay.exists()).toBeTruthy()
    expect(innerOverlay.prop('className')).toContain('mind')
    expect(innerOverlay.text()).toBe('Megamind')
  })
})

describe('Click', () => {
  test('Can trigger onClick callback', () => {
    let value = false
    const onClick = () => {
      value = true
    }
    const wrapper = shallow(<Overlay onClick={onClick} />)

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
    const wrapper = shallow(<Overlay fixed />)

    expect(wrapper.hasClass('is-fixed')).toBeTruthy()
  })

  test('Renders transparent styles, if specified', () => {
    const wrapper = shallow(<Overlay transparent />)

    expect(wrapper.hasClass('is-transparent')).toBeTruthy()
  })
})
