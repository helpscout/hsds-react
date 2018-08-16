import React from 'react'
import { mount } from 'enzyme'
import HelpText from '../HelpText'

describe('ClassName', () => {
  test('Applies custom className if specified', () => {
    const className = 'gator'
    const wrapper = mount(<HelpText className={className} />)

    expect(wrapper.hasClass(className)).toBe(true)
  })
})

describe('Content', () => {
  test('Renders child content', () => {
    const wrapper = mount(<HelpText>Gator</HelpText>)

    expect(wrapper.html()).toContain('Gator')
  })

  test('Renders React Component as content', () => {
    const wrapper = mount(
      <HelpText>
        <div className="gator">Gator</div>
      </HelpText>
    )
    const o = wrapper.find('.gator')

    expect(o.length).toBe(1)
    expect(o.html()).toContain('Gator')
  })
})

describe('Styles', () => {
  test('Has default component className', () => {
    const wrapper = mount(<HelpText />)

    expect(wrapper.hasClass('c-HelpText')).toBe(true)
  })
})

describe('States', () => {
  test('Applies error styles if specified', () => {
    const wrapper = mount(<HelpText state="error" />)

    expect(wrapper.hasClass('is-error')).toBe(true)
  })

  test('Applies success styles if specified', () => {
    const wrapper = mount(<HelpText state="success" />)

    expect(wrapper.hasClass('is-success')).toBe(true)
  })

  test('Applies warning styles if specified', () => {
    const wrapper = mount(<HelpText state="warning" />)

    expect(wrapper.hasClass('is-warning')).toBe(true)
  })
})
