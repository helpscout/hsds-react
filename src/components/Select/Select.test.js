import React from 'react'
import { mount, render } from 'enzyme'
import { Select } from './Select'

const ui = {
  errorIcon: '.c-Select__errorIcon',
  helpText: '.c-Select__helpText',
  hintText: '.c-Select__hintText',
  label: '.c-Select__label',
}

jest.useFakeTimers()

describe('Placeholder', () => {
  test('Renders a placeholder if defined', () => {
    const placeholder = 'Choose your co-anchor…'
    const options = ['Champ Kind', 'Brian Fantana', 'Brick Tamland']
    const wrapper = mount(
      <Select options={options} placeholder={placeholder} />
    )
    const select = wrapper.find('select')
    const selectOptions = select.children()
    const option = selectOptions.first()

    expect(option.prop('label')).toBe(placeholder)
    expect(option.text()).toBe(placeholder)
  })

  test('Keeps a placeholder if a value is passed', () => {
    const placeholder = 'Choose your co-anchor…'
    const options = ['Champ Kind', 'Brian Fantana', 'Brick Tamland']
    const wrapper = mount(
      <Select
        options={options}
        placeholder={placeholder}
        value="Brick Tamland"
      />
    )
    const select = wrapper.find('select')
    const selectOptions = select.children()

    expect(selectOptions.first().prop('label')).toBe(placeholder)
  })
})

describe('Select', () => {
  test('Can generate an select component', () => {
    const wrapper = render(<Select />)
    const el = wrapper.find('select')

    expect(el.length).toBeTruthy()
  })
})

describe('Option', () => {
  test('Renders with a single string', () => {
    const options = 'Brick Tamland'
    const wrapper = mount(<Select options={options} />)
    const selectOptions = wrapper.find('select').children()

    expect(selectOptions.first().prop('value')).toBe(options)
    expect(selectOptions.first().text()).toBe(options)
  })

  test('Renders with an array of strings', () => {
    const options = ['Champ Kind', 'Brian Fantana', 'Brick Tamland']
    const wrapper = mount(<Select options={options} />)
    const selectOptions = wrapper.find('select').children()

    expect(selectOptions.first().text()).toBe('Champ Kind')
    expect(selectOptions.length).toBe(options.length)
  })

  test('Renders children, if specified', () => {
    const wrapper = mount(
      <Select>
        <option>Hello</option>
      </Select>
    )
    const selectOptions = wrapper.find('select').children()

    expect(selectOptions.first().text()).toBe('Hello')
    expect(selectOptions.length).toBe(1)
  })

  test('Renders children over option prop', () => {
    const options = ['Champ Kind', 'Brian Fantana', 'Brick Tamland']
    const wrapper = mount(
      <Select options={options}>
        <option>Hello</option>
      </Select>
    )
    const selectOptions = wrapper.find('select').children()

    expect(selectOptions.first().text()).toBe('Hello')
    expect(selectOptions.length).toBe(1)
  })

  test('Renders with a correct object schema', () => {
    const options = {
      label: 'Champ Kind',
      value: 'champ',
      disabled: true,
    }
    const wrapper = mount(<Select options={options} />)
    const selectOptions = wrapper.find('select').children()
    const o = selectOptions.first()

    expect(o.prop('value')).toBe(options.value)
    expect(o.text()).toBe(options.label)
    expect(o.prop('disabled')).toBeTruthy()
  })
})

describe('Group', () => {
  test('Renders optgroup if the options.value is an array', () => {
    const options = {
      label: 'Group',
      value: ['Champ Kind', 'Brian Fantana', 'Brick Tamland'],
    }
    const wrapper = mount(<Select options={options} />)
    const group = wrapper.find('optgroup')
    const option = group.children().first()

    expect(group.exists()).toBeTruthy()
    expect(group.prop('label')).toBe(options.label)
    expect(group.children().length).toBe(options.value.length)
    expect(option.exists()).toBeTruthy()
    expect(option.text()).toBe(options.value[0])
  })

  test('Can render an optgroup of one', () => {
    const options = {
      label: 'Group',
      value: ['Brick Tamland'],
    }
    const wrapper = mount(<Select options={options} />)
    const group = wrapper.find('optgroup')
    const option = group.children().first()

    expect(group.exists()).toBeTruthy()
    expect(group.children().length).toBe(options.value.length)
    expect(option.exists()).toBeTruthy()
    expect(option.text()).toBe(options.value[0])
  })

  test('Can render multiple optgroups', () => {
    const options = [
      {
        label: 'Channel 4',
        value: ['Ron Burgandy', 'Champ Kind', 'Brian Fantana', 'Brick Tamland'],
      },
      {
        label: 'Evening',
        value: ['Wes Mantooth'],
      },
      {
        label: 'Channel 2',
        value: ['Frank Vitchard'],
      },
      {
        label: 'Spanish Language News',
        value: ['Arturo Mendez'],
      },
    ]
    const wrapper = mount(<Select options={options} />)
    const groups = wrapper.find('optgroup')

    expect(groups.exists()).toBeTruthy()
    expect(groups.length).toBe(options.length)
    expect(groups.first().children().length).toBe(options[0].value.length)
  })
})

describe('Value', () => {
  test('Selects the value if defined', () => {
    const value = 'Brian Fantana'
    const options = ['Champ Kind', 'Brian Fantana', 'Brick Tamland']
    const wrapper = mount(<Select options={options} value={value} />)
    const select = wrapper.find('select')

    expect(select.prop('value')).toBe(value)
  })
})

describe('Events', () => {
  test('onChange callback passes selected value', () => {
    let result = ''
    const onChange = value => {
      result = value
    }
    const options = ['Champ Kind', 'Brian Fantana', 'Brick Tamland']
    const wrapper = mount(<Select options={options} onChange={onChange} />)

    wrapper.find('select').simulate('change')
    expect(result).toBe(options[0])
  })
})

describe('Label', () => {
  test('Adds label if specified', () => {
    const wrapper = mount(<Select label="Channel" />)
    const label = wrapper.find(ui.label).first()

    expect(label.exists()).toBeTruthy()
    expect(label.text()).toBe('Channel')
  })

  test('Sets ID on the select element', () => {
    const id = 'channel'
    const wrapper = mount(<Select label="Channel" id={id} />)
    const label = wrapper.find(ui.label).first().find('label')
    const select = wrapper.find('select')

    expect(label.text()).toBe('Channel')
    expect(label.prop('htmlFor')).toBe(id)
    expect(select.prop('id')).toBe(id)
  })

  test('Accepts React components', () => {
    const custom = <div className="custom">Custom text</div>
    const wrapper = mount(<Select label={custom} />)
    const o = wrapper.find(ui.label)
    const c = o.find('.custom')

    expect(o.exists()).toBeTruthy()
    expect(c.exists()).toBeTruthy()
    expect(c.text()).toBe('Custom text')
  })
})

describe('Prefix', () => {
  test('Adds prefix if defined', () => {
    const options = ['Champ Kind', 'Brian Fantana', 'Brick Tamland']
    const prefix = 'Pick one'
    const wrapper = mount(<Select options={options} prefix={prefix} />)

    expect(wrapper.find('div.c-Select__item.is-prefix').text()).toBe(prefix)
  })
})

describe('HelpText', () => {
  test('Does not render by default', () => {
    const wrapper = mount(<Select />)
    const o = wrapper.find(ui.helpText)
    expect(o.length).not.toBeTruthy()
  })

  test('Adds helpText if specified', () => {
    const wrapper = mount(<Select helpText="Help text" />)
    const o = wrapper.find(ui.helpText).first()
    expect(o.exists()).toBeTruthy()
    expect(o.text()).toBe('Help text')
  })

  test('Accepts React components', () => {
    const custom = <div className="custom">Custom text</div>
    const wrapper = mount(<Select helpText={custom} />)
    const o = wrapper.find(ui.helpText)
    const c = o.find('.custom')

    expect(o.exists()).toBeTruthy()
    expect(c.exists()).toBeTruthy()
    expect(c.text()).toBe('Custom text')
  })
})

describe('HintText', () => {
  test('Does not render by default', () => {
    const wrapper = mount(<Select />)
    const o = wrapper.find(ui.hintText)
    expect(o.length).not.toBeTruthy()
  })

  test('Adds hintText if specified', () => {
    const wrapper = mount(<Select hintText="Hint text" />)
    const o = wrapper.find(ui.hintText).first()
    expect(o.exists()).toBeTruthy()
    expect(o.text()).toBe('Hint text')
  })

  test('Accepts React components', () => {
    const custom = <div className="custom">Custom text</div>
    const wrapper = mount(<Select hintText={custom} />)
    const o = wrapper.find(ui.hintText)
    const c = o.find('.custom')

    expect(o.exists()).toBeTruthy()
    expect(c.exists()).toBeTruthy()
    expect(c.text()).toBe('Custom text')
  })
})

describe('States', () => {
  test('Disables select if disabled prop is true', () => {
    const wrapper = mount(<Select disabled />)
    const o = wrapper.find('select')

    expect(o.prop('disabled')).toBeTruthy()
  })

  describe('Error', () => {
    test('Applies error styles if error prop is true', () => {
      const wrapper = mount(<Select state="error" />)
      const o = wrapper.find('div.c-Select')

      expect(o.prop('className')).toContain('is-error')
    })

    test('Adds error helper text if error prop is a string', () => {
      const message = 'Cannonballlll'
      const wrapper = mount(<Select state="error" helpText={message} />)
      const o = wrapper.find('.c-HelpText').first()

      expect(o.text()).toContain(message)
    })
  })

  describe('Success', () => {
    test('Applies success styles if success prop is true', () => {
      const wrapper = mount(<Select state="success" />)
      const o = wrapper.find('div.c-Select')

      expect(o.prop('className')).toContain('is-success')
    })

    test('Adds success helper text if success prop is a string', () => {
      const message = 'Cannonballlll'
      const wrapper = mount(<Select state="success" helpText={message} />)
      const o = wrapper.find('.c-HelpText').first()

      expect(o.text()).toContain(message)
    })
  })

  describe('Warning', () => {
    test('Applies warning styles if warning prop is true', () => {
      const wrapper = mount(<Select state="warning" />)
      const o = wrapper.find('div.c-Select')

      expect(o.prop('className')).toContain('is-warning')
    })

    test('Adds warning helper text if warning prop is a string', () => {
      const message = 'Cannonballlll'
      const wrapper = mount(<Select state="warning" helpText={message} />)
      const o = wrapper.find('.c-HelpText').first()

      expect(o.text()).toContain(message)
    })
  })

  test('Updates state.state on prop change', () => {
    const wrapper = mount(<Select state="warning" />)

    wrapper.setProps({ state: 'success' })

    expect(wrapper.state().state).toBe('success')
    expect(wrapper.find('.c-Select').first().hasClass('is-success')).toBe(true)

    wrapper.setProps({ state: null })

    expect(wrapper.state().state).toBe(null)
    expect(wrapper.find('.c-Select').first().hasClass('is-success')).toBe(false)
  })
})

describe('Styles', () => {
  test('Adds seamless styles if defined', () => {
    const wrapper = mount(<Select seamless />)
    const o = wrapper.find('div.c-Select')

    expect(o.prop('className')).toContain('is-seamless')
  })

  test('Adds sizing styles if defined', () => {
    const wrapper = mount(<Select size="sm" />)
    const o = wrapper.find('select')

    expect(o.hasClass('is-sm')).toBeTruthy()
  })

  test('Passes style prop to wrapper', () => {
    const wrapper = mount(<Select style={{ background: 'red' }} />)

    expect(wrapper.prop('style').background).toBe('red')
  })
})

describe('removeStateStylesOnFocus', () => {
  test('Does not remove state style on focus, by default', () => {
    const wrapper = mount(<Select state="error" />)
    const select = wrapper.find('div.c-Select')
    const o = wrapper.find('select')

    o.simulate('focus')

    expect(wrapper.state().state).toBe('error')
    expect(select.hasClass('is-error')).toBe(true)
  })

  test('Removes state style on focus, by specified', () => {
    const wrapper = mount(<Select state="error" removeStateStylesOnFocus />)
    const o = wrapper.find('select')

    o.simulate('focus')

    expect(wrapper.state().state).toBeFalsy()
    expect(wrapper.find('.c-Select').first().hasClass('is-error')).toBe(false)
  })
})

describe('selectNode', () => {
  test('Sets selectNode on mount', () => {
    const wrapper = mount(<Select />)

    expect(wrapper.instance().selectNode).toBeTruthy()
  })

  test('Unsets selectNode on unmount', () => {
    const wrapper = mount(<Select />)
    const o = wrapper.instance()
    wrapper.unmount()

    expect(o.selectNode).not.toBeTruthy()
  })
})

describe('isFocused', () => {
  test('Can focus select using isFocused prop', () => {
    const spy = jest.fn()
    const wrapper = mount(<Select isFocused />)
    const o = wrapper.instance().selectNode
    o.onfocus = spy

    jest.runAllTimers()

    expect(spy).toHaveBeenCalled()
  })

  test('Can focus select using custom timeout', () => {
    const spy = jest.fn()
    const wrapper = mount(<Select isFocused forceAutoFocusTimeout={20} />)
    const o = wrapper.instance().selectNode
    o.onfocus = spy

    expect(spy).not.toHaveBeenCalled()

    jest.runAllTimers()

    expect(spy).toHaveBeenCalled()
  })

  test('Can toggle isFocused', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Select onFocus={spy} isFocused={false} forceAutoFocusTimeout={20} />
    )
    const o = wrapper.instance().selectNode
    o.onfocus = spy

    wrapper.setProps({ isFocused: true })

    jest.runAllTimers()

    expect(spy).toHaveBeenCalled()
  })

  test('Removes focus styles on blur', () => {
    const wrapper = mount(<Select isFocused={true} />)

    expect(wrapper.find('.c-Select').first().hasClass('is-focused')).toBe(true)

    wrapper.find('select').simulate('blur')

    expect(wrapper.find('.c-Select').first().hasClass('is-focused')).toBe(false)
  })
})

describe('ErrorMessage', () => {
  test('Can render an error Icon ', () => {
    const wrapper = mount(<Select state="error" />)
    const error = wrapper.find(ui.errorIcon)

    expect(error.length).toBeTruthy()
    expect(error.first().props().tabIndex).toBe(0)
  })

  test('Renders a Tooltip, if error', () => {
    const wrapper = mount(<Select state="error" errorMessage="Nope!" />)
    const el = wrapper.find('Tooltip').first()

    expect(el.length).toBeTruthy()
    expect(el.props().title).toBe('Nope!')
  })

  test('Can customize error Icon', () => {
    const wrapper = mount(
      <Select state="error" errorIcon="chat" tabIndex={3} />
    )
    const el = wrapper.find('Icon')

    expect(el.props().name).toBe('chat')
    expect(el.props().tabIndex).toBe(3)
  })
})

describe('ref', () => {
  test('Can retrieve ref DOM node', () => {
    const spy = jest.fn()
    const wrapper = mount(<Select innerRef={spy} />)
    const o = wrapper.find('select').getDOMNode()

    expect(spy).toHaveBeenCalledWith(o)
  })
})
