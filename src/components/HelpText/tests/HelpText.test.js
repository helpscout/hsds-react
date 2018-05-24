import React from 'react'
import { shallow } from 'enzyme'
import HelpText from '..'

describe('ClassName', () => {
  test('Applies custom className if specified', () => {
    const className = 'gator'
    const wrapper = shallow(<HelpText className={className} />)

    expect(wrapper.prop('className')).toContain(className)
  })
})

describe('Content', () => {
  test('Renders child content', () => {
    const wrapper = shallow(<HelpText>Gator</HelpText>)

    expect(wrapper.html()).toContain('Gator')
  })

  test('Renders React Component as content', () => {
    const wrapper = shallow(
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
    const wrapper = shallow(<HelpText />)

    expect(wrapper.prop('className')).toContain('c-HelpText')
  })

  test('Applies muted styles if specified', () => {
    const wrapper = shallow(<HelpText muted />)

    expect(wrapper.prop('className')).toContain('is-muted')
  })
})

describe('States', () => {
  test('Applies error styles if specified', () => {
    const wrapper = shallow(<HelpText state="error" />)

    expect(wrapper.prop('className')).toContain('is-error')
  })

  test('Applies success styles if specified', () => {
    const wrapper = shallow(<HelpText state="success" />)

    expect(wrapper.prop('className')).toContain('is-success')
  })

  test('Applies warning styles if specified', () => {
    const wrapper = shallow(<HelpText state="warning" />)

    expect(wrapper.prop('className')).toContain('is-warning')
  })
})
