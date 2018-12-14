import * as React from 'react'
import { mount } from 'enzyme'
import { ComboBox } from '../ComboBox'
import { hasClass } from '../../../tests/helpers/enzyme'

jest.mock('../../Dropdown/V2/Dropdown.Card', () => {
  const Card = ({ children }) => <div>{children}</div>
  return {
    default: Card,
  }
})

jest.mock('../../Animate', () => {
  const Animate = ({ children }) => <div>{children}</div>
  return {
    default: Animate,
  }
})

jest.mock('../../Portal', () => {
  const Portal = ({ children }) => <div>{children}</div>
  return {
    default: Portal,
  }
})

describe('className', () => {
  test('Has a default className', () => {
    const wrapper = mount(<ComboBox />)

    expect(hasClass(wrapper, 'c-ComboBox')).toBe(true)
  })

  test('Accepts custom className', () => {
    const wrapper = mount(<ComboBox className="ron" />)

    expect(hasClass(wrapper, 'ron')).toBe(true)
  })
})

describe('safeSetState', () => {
  test('Removes _isMounted flag on unmount', () => {
    const wrapper = mount(<ComboBox />)
    const inst = wrapper.instance() as any

    wrapper.unmount()

    expect(inst._isMounted).toBe(false)
  })

  test('Cannot safeSetState on unmount', () => {
    const wrapper = mount(<ComboBox />)
    const inst = wrapper.instance() as any

    wrapper.setState({ safe: true })

    wrapper.unmount()

    inst.safeSetState({ safe: false })

    expect(inst.state.safe).toBe(true)
  })
})

describe('Input', () => {
  test('Passes inputValue to Dropdown', () => {
    const wrapper = mount(<ComboBox />)
    wrapper.setState({ inputValue: 'ron' })

    const el = wrapper.find('Dropdown')

    expect(el.prop('inputValue')).toBe('ron')
  })

  test('Renders an input', () => {
    const wrapper = mount(<ComboBox isOpen />)

    const inputEl = wrapper.find('Input')

    expect(inputEl.length).toBeTruthy()
  })

  test('Fires onInputChange callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<ComboBox isOpen onInputChange={spy} />)

    const el = wrapper.find('input[type="text"]')
    // @ts-ignore
    el.getDOMNode().value = 'ron'
    el.simulate('change')

    expect(spy).toHaveBeenCalled()
  })

  test('Does not fire onInputChange callback, if input value does not change', () => {
    const spy = jest.fn()
    const wrapper = mount(<ComboBox isOpen onInputChange={spy} inputValue="" />)

    const el = wrapper.find('input[type="text"]')
    // @ts-ignore
    el.getDOMNode().value = ''
    el.simulate('change')

    expect(spy).not.toHaveBeenCalled()
  })

  test('Stops propagation on Enter press', () => {
    const spy = jest.fn()
    const wrapper = mount(<ComboBox isOpen />)

    const el = wrapper.find('Input')

    // @ts-ignore
    el.props().onKeyDown({ keyCode: 13, stopPropagation: spy })

    expect(spy).toHaveBeenCalled()
  })

  test('Fires onKeyDown callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<ComboBox isOpen inputProps={{ onKeyDown: spy }} />)

    const el = wrapper.find('Input')

    // @ts-ignore
    el.props().onKeyDown({ keyCode: 13, stopPropagation: jest.fn() })

    expect(spy).toHaveBeenCalled()
  })

  test('Closes ComboBox on input tab press, by default', () => {
    const spy = jest.fn()
    const wrapper = mount(<ComboBox isOpen />)

    const el = wrapper.find('Input')

    // @ts-ignore
    el.props().onKeyDown({ keyCode: 9, stopPropagation: spy })

    expect(spy).toHaveBeenCalled()
    // @ts-ignore
    expect(wrapper.state().isOpen).toBe(false)
  })

  test('Tab press on input does NOT close ComboBox, if specified', () => {
    const spy = jest.fn()
    const wrapper = mount(<ComboBox isOpen closeOnInputTab={false} />)

    const el = wrapper.find('Input')

    // @ts-ignore
    el.props().onKeyDown({ keyCode: 9, stopPropagation: spy })

    expect(spy).not.toHaveBeenCalled()
    // @ts-ignore
    expect(wrapper.state().isOpen).toBe(true)
  })
})

describe('Filtering', () => {
  test('Filters on inputValue change', () => {
    const items = [
      {
        value: 'ron',
      },
      {
        value: 'champ',
      },
      {
        value: 'brick',
      },
    ]
    const wrapper = mount(<ComboBox isOpen items={items} />)

    expect(wrapper.find('DropdownItem').length).toBe(3)

    const el = wrapper.find('input[type="text"]')
    // @ts-ignore
    el.getDOMNode().value = 'ron'
    el.simulate('change')

    expect(wrapper.find('DropdownItem').length).toBe(1)
  })

  test('Can filter against custom keys on inputValue change', () => {
    const items = [
      {
        label: 'ron',
      },
      {
        label: 'champ',
      },
      {
        label: 'brick',
      },
    ]
    const wrapper = mount(
      <ComboBox isOpen items={items} itemFilterKey="label" />
    )

    expect(wrapper.find('DropdownItem').length).toBe(3)

    const el = wrapper.find('input[type="text"]')
    // @ts-ignore
    el.getDOMNode().value = 'ron'
    el.simulate('change')

    expect(wrapper.find('DropdownItem').length).toBe(1)
  })

  test('Filters if custom itemFilterKey cannot be found', () => {
    const items = [
      {
        value: 'ron',
      },
      {
        value: 'champ',
      },
      {
        value: 'brick',
      },
    ]
    const wrapper = mount(
      <ComboBox isOpen items={items} itemFilterKey="nope" />
    )

    expect(wrapper.find('DropdownItem').length).toBe(3)

    const el = wrapper.find('input[type="text"]')
    // @ts-ignore
    el.getDOMNode().value = 'ron'
    el.simulate('change')

    expect(wrapper.find('DropdownItem').length).toBe(0)
  })

  test('Filters groups on inputValue change', () => {
    const items = [
      {
        type: 'group',
        label: 'News Team',
        items: [
          {
            value: 'ron',
          },
          {
            value: 'champ',
          },
          {
            value: 'brick',
          },
        ],
      },
    ]
    const wrapper = mount(<ComboBox isOpen items={items} />)

    // +1 to account for group header
    expect(wrapper.find('DropdownItem').length).toBe(4)

    const el = wrapper.find('input[type="text"]')
    // @ts-ignore
    el.getDOMNode().value = 'ron'
    el.simulate('change')

    // +1 to account for group header
    expect(wrapper.find('DropdownItem').length).toBe(2)
  })

  test('Renders empty results when no items can be found', () => {
    const items = [
      {
        type: 'group',
        label: 'News Team',
        items: [
          {
            value: 'ron',
          },
          {
            value: 'champ',
          },
          {
            value: 'brick',
          },
        ],
      },
    ]
    const wrapper = mount(<ComboBox isOpen items={items} />)

    // +1 to account for group header
    expect(wrapper.find('DropdownItem').length).toBe(4)

    const el = wrapper.find('input[type="text"]')
    const searchQuery = 'loudddddddddnoises'
    // @ts-ignore
    el.getDOMNode().value = searchQuery
    el.simulate('change')

    expect(wrapper.find('DropdownItem').length).toBe(0)

    const emptyEl = wrapper.find('div.c-ComboBoxEmpty')

    expect(emptyEl.length).toBeTruthy()
    expect(emptyEl.text()).toContain('No results')
    expect(emptyEl.text()).toContain(searchQuery)
  })

  test('Can render a custom empty UI', () => {
    const items = [
      {
        type: 'group',
        label: 'News Team',
        items: [
          {
            value: 'ron',
          },
          {
            value: 'champ',
          },
          {
            value: 'brick',
          },
        ],
      },
    ]
    const renderEmpty = () => <div className="empty-block" />
    const wrapper = mount(
      <ComboBox isOpen items={items} renderEmpty={renderEmpty} />
    )

    const el = wrapper.find('input[type="text"]')
    const searchQuery = 'loudddddddddnoises'
    // @ts-ignore
    el.getDOMNode().value = searchQuery
    el.simulate('change')

    const emptyEl = wrapper.find('div.empty-block')

    expect(emptyEl.length).toBeTruthy()
  })
})

describe('Custom Filtering', () => {
  test('Can customize filter results with customFilter', () => {
    const items = [
      {
        value: 'ron',
      },
      {
        value: 'champ',
      },
      {
        value: 'brick',
      },
    ]

    const customFilter = ({ inputValue, items }) => {
      if (!inputValue) return items

      // Force return a bear!
      return [
        {
          value: 'bear',
          label: 'bear',
        },
      ]
    }

    const wrapper = mount(
      <ComboBox isOpen items={items} customFilter={customFilter} />
    )

    expect(wrapper.find('DropdownItem').length).toBe(3)

    const el = wrapper.find('input[type="text"]')
    // @ts-ignore
    el.getDOMNode().value = 'ron'
    el.simulate('change')

    expect(wrapper.find('DropdownItem').length).toBe(1)
    expect(wrapper.find('DropdownItem').text()).toContain('bear')
  })
})

describe('Render slots', () => {
  test('Can render into renderMenuStart', () => {
    const Component = () => <div className="render-component-test" />
    const wrapper = mount(<ComboBox isOpen renderMenuStart={Component} />)
    const el = wrapper.find('div.render-component-test')

    expect(el.length).toBeTruthy()
  })

  test('Can render into renderMenuEnd', () => {
    const Component = () => <div className="render-component-test" />
    const wrapper = mount(<ComboBox isOpen renderMenuEnd={Component} />)
    const el = wrapper.find('div.render-component-test')

    expect(el.length).toBeTruthy()
  })

  test('Can render into renderFooter', () => {
    const Component = () => <div className="render-component-test" />
    const wrapper = mount(<ComboBox isOpen renderFooter={Component} />)
    const el = wrapper.find('div.render-component-test')

    expect(el.length).toBeTruthy()
  })
})

describe('onSelect', () => {
  test('Resets inputValue on select', () => {
    const wrapper = mount(<ComboBox />)
    wrapper.setState({ inputValue: 'brick' })

    const el = wrapper.find('Dropdown').first()

    // @ts-ignore
    el.props().onSelect('ron', {})

    expect(wrapper.state('inputValue')).toBeFalsy()
  })

  test('Fires onSelect callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<ComboBox onSelect={spy} />)
    wrapper.setState({ inputValue: 'brick' })

    const el = wrapper.find('Dropdown').first()

    // @ts-ignore
    el.props().onSelect('ron', {})

    expect(spy).toHaveBeenCalledWith('ron', {})
  })
})

describe('onMenuMount/Unmount', () => {
  test('Clears search query on menu mount', () => {
    const wrapper = mount(<ComboBox />)
    wrapper.setState({ inputValue: 'ron' })

    const el = wrapper.find('Dropdown').first()
    // @ts-ignore
    el.props().onMenuMount()

    // @ts-ignore
    expect(wrapper.state().inputValue).toBeFalsy()
  })

  test('Clears search query on menu unmount', () => {
    const wrapper = mount(<ComboBox />)
    wrapper.setState({ inputValue: 'ron' })

    const el = wrapper.find('Dropdown').first()
    // @ts-ignore
    el.props().onMenuUnmount()

    // @ts-ignore
    expect(wrapper.state().inputValue).toBeFalsy()
  })

  test('Attempts to scroll to top on reset', () => {
    const spy = jest.fn()
    const wrapper = mount(<ComboBox />)
    // @ts-ignore
    wrapper.instance().menuWrapperNode = { scrollTop: 50 }

    // @ts-ignore
    wrapper.instance().resetInputValue()

    // @ts-ignore
    expect(wrapper.instance().menuWrapperNode.scrollTop).toBe(0)
  })
})

describe('onOpen/onClose', () => {
  test('Fires onOpen callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<ComboBox onOpen={spy} />)
    const el = wrapper.find('Dropdown')

    // @ts-ignore
    el.props().onOpen()

    expect(spy).toHaveBeenCalled()
  })

  test('Fires onClose callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<ComboBox onClose={spy} />)
    const el = wrapper.find('Dropdown')

    // @ts-ignore
    el.props().onClose()

    expect(spy).toHaveBeenCalled()
  })
})
