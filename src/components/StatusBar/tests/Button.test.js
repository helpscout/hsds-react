import * as React from 'react'
import { shallow } from 'enzyme'
import StatusBar from '..'
import { Icon } from '../../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<StatusBar.Button />)

    expect(wrapper.hasClass('c-StatusBarButton')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<StatusBar.Button className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = shallow(
      <StatusBar.Button>
        <span className="child">Hello</span>
      </StatusBar.Button>
    )
    const el = wrapper.find('span.child')

    expect(el.text()).toContain('Hello')
  })
})

describe('Icon', () => {
  test('Does not render an icon by default', () => {
    const wrapper = shallow(<StatusBar.Button>Hello</StatusBar.Button>)
    const o = wrapper.find(Icon)

    expect(o.length).toBe(0)
  })

  test('Can render an Icon if specified', () => {
    const wrapper = shallow(
      <StatusBar.Button icon="tick">Hello</StatusBar.Button>
    )
    const o = wrapper.find(Icon)

    expect(o.length).toBe(1)
    expect(o.props().name).toBe('tick')
  })
})
