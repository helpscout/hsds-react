import * as React from 'react'
import { mount } from 'enzyme'
import FormLabel from '../FormLabel'
import Input from '../../Input'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<FormLabel />)

    expect(wrapper.hasClass('c-FormLabel')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = mount(<FormLabel className={className} />)

    expect(wrapper.hasClass(className)).toBe(true)
  })
})

describe('Content', () => {
  test('Renders child content', () => {
    const wrapper = mount(<FormLabel>Channel 4</FormLabel>)

    expect(wrapper.text()).toBe('Channel 4')
  })

  test('Renders React Component as content', () => {
    const wrapper = mount(
      <FormLabel>
        <div className="gator">Gator</div>
      </FormLabel>
    )
    const o = wrapper.find('.gator')

    expect(o.length).toBe(1)
    expect(o.html()).toContain('Gator')
  })
})

describe('Label', () => {
  test('Renders a Label, if specified', () => {
    const wrapper = mount(
      <FormLabel label="Blue">
        <Input />
      </FormLabel>
    )
    const o = wrapper.find('Label')

    expect(o.length).toBe(1)
    expect(o.text()).toContain('Blue')
  })

  test('Does not render a Label by default', () => {
    const wrapper = mount(
      <FormLabel>
        <Input />
      </FormLabel>
    )
    const o = wrapper.find('Label')

    expect(o.length).toBe(0)
  })

  test('Passes auto-generated ID to label', () => {
    const wrapper = mount(
      <FormLabel label="Blue">
        <Input />
      </FormLabel>
    )
    const o = wrapper.find('label')

    expect(o.prop('htmlFor')).toContain('FormControl')
  })
})

describe('HelpText', () => {
  test('Renders a HelpText, if specified', () => {
    const wrapper = mount(
      <FormLabel helpText="Blue">
        <Input />
      </FormLabel>
    )
    const o = wrapper.find('HelpText')

    expect(o.length).toBe(1)
    expect(o.text()).toContain('Blue')
  })

  test('Does not render a HelpText by default', () => {
    const wrapper = mount(
      <FormLabel>
        <Input />
      </FormLabel>
    )
    const o = wrapper.find('HelpText')

    expect(o.length).toBe(0)
  })
})

describe('Context', () => {
  test('Passes auto-generated ID to Context consuming component', () => {
    const wrapper = mount(
      <FormLabel>
        <Input />
      </FormLabel>
    )
    const o = wrapper.find('input')

    expect(o.prop('id')).toContain('FormControl')
  })
})
