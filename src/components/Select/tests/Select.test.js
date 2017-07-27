import React from 'react'
import { mount, shallow } from 'enzyme'
import Select from '..'

describe('Placeholder', () => {
  test('Renders a placeholder if defined', () => {
    const placeholder = "Choose your co-anchor…"
    const options = ['Champ Kind', 'Brian Fantana', 'Brick Tamland']
    const wrapper = mount(<Select options={options} placeholder={placeholder} />)
    const select = wrapper.find('select')
    const selectOptions = select.children();

    expect(selectOptions.first().prop('label')).toBe(placeholder)
  })

  test('Does not render a placeholder if a value is passed', () => {
    const placeholder = "Choose your co-anchor…"
    const options = ['Champ Kind', 'Brian Fantana', 'Brick Tamland']
    const wrapper = mount(<Select options={options} placeholder={placeholder} value="Brick Tamland" />)
    const select = wrapper.find('select')
    const selectOptions = select.children();

    expect(selectOptions.first().prop('label')).not.toBe(placeholder)
  })
})

describe('Value', () => {
  test('Selects the value if defined', () => {
    const value = "Brian Fantana"
    const options = ['Champ Kind', 'Brian Fantana', 'Brick Tamland']
    const wrapper = mount(<Select options={options} value={value} />)
    const select = wrapper.find('select')

    expect(select.prop('value')).toBe(value)
  })
})

test('Disables select if disabled prop is true', () => {
  const wrapper = shallow(<Select disabled />)
  const o = wrapper.find('select')

  expect(o.prop('disabled')).toBeTruthy()
})

describe('States', () => {
  describe('Error', () => {
    test('Applies error styles if error prop is true', () => {
      const wrapper = shallow(<Select error />)
      const o = wrapper.find('.c-Select')

      expect(o.prop('className')).toContain('is-error')
    })

    test('Adds error helper text if error prop is a string', () => {
      const message = 'Cannonballlll'
      const wrapper = shallow(<Select error={message} />)
      const o = wrapper.find('.c-InputHelperLabel')

      expect(o.text()).toContain(message)
    })
  })

  describe('Success', () => {
    test('Applies success styles if success prop is true', () => {
      const wrapper = shallow(<Select success />)
      const o = wrapper.find('.c-Select')

      expect(o.prop('className')).toContain('is-success')
    })

    test('Adds success helper text if success prop is a string', () => {
      const message = 'Cannonballlll'
      const wrapper = shallow(<Select success={message} />)
      const o = wrapper.find('.c-InputHelperLabel')

      expect(o.text()).toContain(message)
    })
  })

  describe('Warning', () => {
    test('Applies warning styles if warning prop is true', () => {
      const wrapper = shallow(<Select warning />)
      const o = wrapper.find('.c-Select')

      expect(o.prop('className')).toContain('is-warning')
    })

    test('Adds warning helper text if warning prop is a string', () => {
      const message = 'Cannonballlll'
      const wrapper = shallow(<Select warning={message} />)
      const o = wrapper.find('.c-InputHelperLabel')

      expect(o.text()).toContain(message)
    })
  })
})
