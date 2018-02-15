import React from 'react'
import { mount, shallow } from 'enzyme'
import Label from '..'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Label />)

    expect(wrapper.prop('className')).toContain('c-Label')
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = shallow(<Label className={className} />)

    expect(wrapper.prop('className')).toContain(className)
  })
})

describe('Content', () => {
  test('Renders child content', () => {
    const wrapper = mount(<Label>Channel 4</Label>)
    const text = wrapper.find('Text')

    expect(text.exists()).toBeTruthy()
    expect(text.text()).toBe('Channel 4')
  })

  test('Renders React Component as content', () => {
    const wrapper = shallow(
      <Label>
        <div className='gator'>Gator</div>
      </Label>
    )
    const o = wrapper.find('.gator')

    expect(o.length).toBe(1)
    expect(o.html()).toContain('Gator')
  })
})

describe('For', () => {
  test('Accepts for prop', () => {
    const wrapper = mount(<Label for='channel'>Channel 4</Label>)

    expect(wrapper.prop('for')).toBe('channel')
  })
})

describe('States', () => {
  test('Applies error styles if specified', () => {
    const wrapper = shallow(<Label state='error' />)

    expect(wrapper.prop('className')).toContain('is-error')
  })

  test('Applies success styles if specified', () => {
    const wrapper = shallow(<Label state='success' />)

    expect(wrapper.prop('className')).toContain('is-success')
  })

  test('Applies warning styles if specified', () => {
    const wrapper = shallow(<Label state='warning' />)

    expect(wrapper.prop('className')).toContain('is-warning')
  })
})
