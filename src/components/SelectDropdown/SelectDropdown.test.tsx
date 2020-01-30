import * as React from 'react'
import { mount, render } from 'enzyme'
import { SelectDropdown } from './SelectDropdown'

jest.mock('../Dropdown/DropdownV2', () => {
  const Dropdown = () => <div />
  Dropdown.Card = () => <div />
  Dropdown.Menu = () => <div />

  return { default: Dropdown }
})

describe('className', () => {
  test('Has a default className', () => {
    const wrapper = mount(<SelectDropdown />)
    const el = wrapper.find('AutoDropdown')

    expect(el.hasClass('c-SelectDropdown')).toBeTruthy()
  })

  test('Can render a custom className', () => {
    const className = 'buddy'
    const wrapper = mount(<SelectDropdown className={className} />)
    const el = wrapper.find('AutoDropdown')

    expect(el.hasClass(className)).toBeTruthy()
  })
})

describe('limit', () => {
  test('Renders a searchable input, if item count exceeds limit', () => {
    const items = [0, 1, 2, 3]
    const wrapper = mount(<SelectDropdown items={items} limit={2} />)
    const el = wrapper.find('ComboBox')

    expect(el.prop('showInput')).toBe(true)
  })

  test('Does not show a searchable input, if item count is below limit', () => {
    const items = [0, 1, 2, 3]
    const wrapper = mount(<SelectDropdown items={items} limit={20} />)
    const el = wrapper.find('ComboBox')

    expect(el.prop('showInput')).toBe(false)
  })
})

describe('Events', () => {
  test('onBlur callback can be fired', () => {
    const spy = jest.fn()
    const wrapper = mount(<SelectDropdown onBlur={spy} />)
    const el = wrapper.find('AutoDropdown')

    // @ts-ignore
    el.props().onBlur()

    expect(spy).toHaveBeenCalled()
  })

  test('onFocus callback can be fired', () => {
    const spy = jest.fn()
    const wrapper = mount(<SelectDropdown onFocus={spy} />)
    const el = wrapper.find('AutoDropdown')

    // @ts-ignore
    el.props().onFocus()

    expect(spy).toHaveBeenCalled()
  })

  test('onSelect callback can be fired', () => {
    const spy = jest.fn()
    const wrapper = mount(<SelectDropdown onSelect={spy} />)
    const el = wrapper.find('AutoDropdown')

    // @ts-ignore
    el.props().onSelect('value', { item: {} })

    expect(spy).toHaveBeenCalled()
  })
})

describe('selectedItem', () => {
  test('Updates the selectedItem on if prop changes', () => {
    const prevItem = {}
    const nextItem = {}
    const items = [prevItem, nextItem]

    const wrapper = mount(
      <SelectDropdown items={items} selectedItem={prevItem} />
    )

    expect(wrapper.find('Dropdown').prop('selectedItem')).toBe(prevItem)

    wrapper.setProps({ selectedItem: nextItem })

    expect(wrapper.find('Dropdown').prop('selectedItem')).toBe(nextItem)
  })

  test('Does not update the selectItem on an unrelated prop change', () => {
    const prevItem = jest.fn()

    const wrapper = mount(<SelectDropdown selectedItem={prevItem} />)

    expect(wrapper.find('Dropdown').prop('selectedItem')).toBe(prevItem)

    wrapper.setProps({ dropUp: true })

    expect(wrapper.find('Dropdown').prop('selectedItem')).toBe(prevItem)
  })

  test('Does not reset the selectItem on an unrelated change', () => {
    const item = jest.fn()

    const wrapper = mount(<SelectDropdown selectedItem={undefined} />)

    wrapper.setState({ selectedItem: item })
    wrapper.setProps({ selectedItem: undefined })

    // @ts-ignore
    expect(wrapper.state().selectedItem).toBe(item)
  })
})

describe('renderTrigger', () => {
  test('Renders a trigger', () => {
    const preWrapper = mount(<SelectDropdown />)
    // @ts-ignore
    const Trigger = preWrapper.instance().renderTrigger()
    const wrapper = mount(Trigger)

    expect(wrapper.length).toBeTruthy()
  })

  test('Renders a label, if defined', () => {
    const preWrapper = mount(<SelectDropdown trigger="Buddy" />)
    // @ts-ignore
    const Trigger = preWrapper.instance().renderTrigger()
    const wrapper = render(Trigger)

    expect(wrapper.text()).toBe('Buddy')
  })

  test('Renders a placeholder, if defined', () => {
    const preWrapper = mount(<SelectDropdown placeholder="Buddy" />)
    // @ts-ignore
    const Trigger = preWrapper.instance().renderTrigger()
    const wrapper = render(Trigger)

    expect(wrapper.text()).toBe('Buddy')
  })

  test('Renders a label over a placeholder, if defined', () => {
    const preWrapper = mount(
      <SelectDropdown trigger="Buddy" placeholder="Elf" />
    )
    // @ts-ignore
    const Trigger = preWrapper.instance().renderTrigger()
    const wrapper = render(Trigger)

    expect(wrapper.text()).toBe('Buddy')
  })
})

describe('Error', () => {
  test('Renders Error UI, if state is error', () => {
    const preWrapper = mount(<SelectDropdown state="error" />)
    // @ts-ignore
    const Trigger = preWrapper.instance().renderTrigger()
    const wrapper = render(Trigger)
    const el = wrapper.find('.c-SelectDropdownError')

    expect(el.length).toBeTruthy()
  })

  test('Does not render Error UI by default', () => {
    const preWrapper = mount(<SelectDropdown />)
    // @ts-ignore
    const Trigger = preWrapper.instance().renderTrigger()
    const wrapper = render(Trigger)
    const el = wrapper.find('.c-SelectDropdownError')

    expect(el.length).toBeFalsy()
  })

  test('Adds error style on Trigger, if error', () => {
    const preWrapper = mount(<SelectDropdown state="error" />)
    // @ts-ignore
    const Trigger = preWrapper.instance().renderTrigger()
    const wrapper = render(Trigger)

    expect(wrapper.hasClass('is-error')).toBeTruthy()
  })

  test('Renders a tooltip with error message, if defined', () => {
    const preWrapper = mount(
      <SelectDropdown state="error" errorMessage="Uh oh!" />
    )
    // @ts-ignore
    const Trigger = preWrapper.instance().renderTrigger()
    const wrapper = mount(Trigger)
    const el = wrapper.find('Tooltip').first()

    expect(el.prop('title')).toBe('Uh oh!')
  })
})

describe('value', () => {
  test('Sets initial selectedItem state with value onMount', () => {
    const items = [
      {
        value: 'will',
      },
      {
        value: 'ron',
      },
    ]
    const wrapper = mount(<SelectDropdown items={items} value="ron" />)

    // @ts-ignore
    expect(wrapper.state().selectedItem.value).toBe('ron')
  })

  test('Updates selectedItem state on value change', () => {
    const items = [
      {
        value: 'will',
      },
      {
        value: 'ron',
      },
    ]
    const wrapper = mount(<SelectDropdown items={items} />)
    wrapper.setProps({ value: 'ron' })

    // @ts-ignore
    expect(wrapper.state().selectedItem.value).toBe('ron')
  })
})
