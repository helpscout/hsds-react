import React from 'react'
import { mount } from 'enzyme'
import { DropdownItem as Item } from '../Dropdown.Item'
import DropdownItemSelectedCheck from '../Dropdown.ItemSelectedCheck'
import {
  findDOMNode,
  hasClass,
  getAttribute,
} from '../../../tests/helpers/enzyme'
import { setMenuPositionStyles } from '../Dropdown.renderUtils'

jest.mock('../Dropdown.utils')
jest.mock('../Dropdown.renderUtils')
jest.mock('../Dropdown.Card', () => {
  const Card = props => <div {...props} />
  return props => {
    return <Card {...props} />
  }
})
jest.mock('../Dropdown.Menu', () => {
  const { MenuUI } = require('../Dropdown.css.js')
  const Menu = props => <MenuUI {...props} />
  return props => {
    return <Menu {...props} />
  }
})

beforeEach(() => {
  setMenuPositionStyles.mockClear()
})

describe('className', () => {
  test('Has a default className', () => {
    const wrapper = mount(<Item />)

    expect(hasClass(wrapper, 'c-DropdownItem')).toBe(true)
  })

  test('Is div by default', () => {
    const wrapper = mount(<Item />)
    expect(wrapper.getDOMNode().tagName).toEqual('DIV')
  })

  test('Is a when provided with href', () => {
    const wrapper = mount(<Item href="https://helpscout.com" />)
    const node = wrapper.getDOMNode()
    expect(node.tagName).toEqual('A')
    expect(node.getAttribute('href')).toEqual('https://helpscout.com')
  })

  test('Accepts custom className', () => {
    const wrapper = mount(<Item className="ron" />)

    expect(hasClass(wrapper, 'ron')).toBe(true)
  })

  test('Selection Clearer className', () => {
    const state = {
      allowMultipleSelection: true,
      selectionClearer: 'All Items',
    }

    const wrapper = mount(<Item getState={() => state} isSelectionClearer />)

    expect(hasClass(wrapper, 'c-SelectionClearerItem')).toBe(true)
  })
})

describe('children', () => {
  test('Can render children', () => {
    const wrapper = mount(
      <Item>
        <div className="ron">Ron</div>
      </Item>
    )

    expect(wrapper.find('div.ron').length).toBeTruthy()
  })
})

describe('ref', () => {
  test('Can set an ref to a DOM node', () => {
    const spy = jest.fn()
    const wrapper = mount(<Item innerRef={spy} />)
    const el = wrapper.getDOMNode()

    expect(spy).toHaveBeenCalledWith(el)
  })

  test('Internally sets the actionNode', () => {
    const items = [{ value: 'ron' }, { value: 'champ' }, { value: 'brick' }]
    const wrapper = mount(<Item items={items} />)
    const el = findDOMNode(wrapper, '.c-DropdownItemAction')

    expect(wrapper.instance().actionNode).toBe(el)
  })

  test('Internally sets the wrapperNode', () => {
    const items = [{ value: 'ron' }, { value: 'champ' }, { value: 'brick' }]
    const wrapper = mount(<Item items={items} />)

    expect(wrapper.instance().wrapperNode).toBeTruthy()
  })
})

describe('renderMenu', () => {
  // TODO: fix that test
  // test('Renders the menu on mount', () => {
  //   const items = [{ value: 'ron' }, { value: 'champ' }, { value: 'brick' }]
  //   const wrapper = mount(<Item items={items} />)
  //   expect(wrapper).toBeTruthy()
  //   expect(setMenuPositionStyles).toHaveBeenCalled()
  // })
  // TODO: fix that test
  // test('Does not render the menu if important DOM nodes are missing', () => {
  //   const items = [{ value: 'ron' }, { value: 'champ' }, { value: 'brick' }]
  //   const wrapper = mount(<Item items={items} />)
  //   expect(setMenuPositionStyles).toHaveBeenCalledTimes(1)
  //   wrapper.instance().menuNode = null
  //   wrapper.setProps({
  //     isHover: true,
  //   })
  //   expect(setMenuPositionStyles).toHaveBeenCalledTimes(1)
  // })
})

describe('Action', () => {
  const items = [{ value: 'ron' }, { value: 'champ' }, { value: 'brick' }]
  test('Renders an Action', () => {
    const wrapper = mount(<Item items={items} />)
    const el = wrapper.find('.c-DropdownItemAction')

    expect(el.length).toBeTruthy()
  })

  test('Gets subMenu class, if applicable', () => {
    const items = [{ value: 'ron' }, { value: 'champ' }, { value: 'brick' }]
    const wrapper = mount(<Item items={items} />)
    const el = wrapper.find('.c-DropdownItemAction')

    expect(hasClass(el, 'has-subMenu')).toBe(true)
  })
})

describe('Items', () => {
  test('Does not render sub menu by default', () => {
    const wrapper = mount(<Item />)
    const el = wrapper.find('Menu')

    expect(el.length).not.toBeTruthy()
  })

  test('Renders sub menu with items', () => {
    const items = [{ value: 'ron' }, { value: 'champ' }, { value: 'brick' }]
    const wrapper = mount(<Item items={items} />)
    const el = wrapper.find('Menu')

    expect(el.length).toBeTruthy()
  })
})

describe('ItemSelectedCheck', () => {
  test('Renders with value', () => {
    const wrapper = mount(<DropdownItemSelectedCheck value="Jon" />)
    const valueSpan = wrapper.find('span.c-ItemSelectedCheck__value').first()
    const icon = wrapper.find('.c-Icon').first()

    expect(valueSpan.text()).toBe('Jon')
    expect(icon).toHaveLength(0)
  })

  test('Does not Renders without value', () => {
    const wrapper = mount(<DropdownItemSelectedCheck />)

    expect(wrapper.instance()).toBe(null)
  })

  test('Renders checkmark if active', () => {
    const wrapper = mount(
      <DropdownItemSelectedCheck value="Jon" isActive={true} />
    )

    const valueSpan = wrapper.find('span.c-ItemSelectedCheck__value').first()
    const icon = wrapper.find('.c-Icon').first()

    expect(valueSpan.text()).toBe('Jon')
    expect(icon).toHaveLength(1)
  })

  test('isSelectionClearer state', () => {
    const wrapper = mount(
      <DropdownItemSelectedCheck
        value="All Items"
        isSelectionClearer={true}
        getState={() => ({
          selectedItem: 'hello',
        })}
      />
    )

    const valueSpan = wrapper.find('span.c-ItemSelectedCheck__value').first()

    expect(valueSpan.text()).toBe('All Items')
    expect(hasClass(wrapper, 'selectionClearer')).toBeTruthy()
  })
})

describe('Events', () => {
  test('onClick callback fires', () => {
    const spy = jest.fn()
    const wrapper = mount(<Item onClick={spy} />)

    wrapper.simulate('click')

    expect(spy).toHaveBeenCalled()
  })

  test('onClick callback fires (selectionClearer)', () => {
    const spy = jest.fn()
    const state = {
      allowMultipleSelection: true,
      selectionClearer: 'All Items',
    }
    const wrapper = mount(<Item onClick={spy} getState={() => state} />)

    wrapper.simulate('click')

    expect(spy).toHaveBeenCalledWith(
      state,
      expect.objectContaining({
        type: expect.any(String),
      })
    )
  })

  test('onClick callback fires when `preventSelect` is true', () => {
    const spy = jest.fn()
    const wrapper = mount(<Item onClick={spy} preventSelect />)

    wrapper.simulate('click')

    expect(spy).toHaveBeenCalled()
  })

  test('onMouseEnter callback fires', () => {
    const spy = jest.fn()
    const wrapper = mount(<Item onMouseEnter={spy} />)

    wrapper.simulate('mouseenter')

    expect(spy).toHaveBeenCalled()
  })

  test('onFocus callback fires', () => {
    const spy = jest.fn()
    const wrapper = mount(<Item onFocus={spy} />)

    wrapper.simulate('focus')

    expect(spy).toHaveBeenCalled()
  })

  test('onBlur callback fires', () => {
    const spy = jest.fn()
    const wrapper = mount(<Item onBlur={spy} />)

    wrapper.simulate('blur')

    expect(spy).toHaveBeenCalled()
  })
})

describe('Indicator', () => {
  test('Renders the sub menu indicator, if has items', () => {
    const items = [{ value: 'ron' }, { value: 'champ' }, { value: 'brick' }]
    const wrapper = mount(<Item items={items} />)
    const el = wrapper.find('.c-DropdownItemSubMenuIndicator')

    expect(el.length).toBeTruthy()
  })

  test('Does not render the sub menu indicator, if has no items', () => {
    const items = undefined
    const wrapper = mount(<Item items={items} />)
    const el = wrapper.find('.c-DropdownItemSubMenuIndicator')

    expect(el.length).not.toBeTruthy()
  })

  test('Is directionally aware', () => {
    const items = [{ value: 'ron' }, { value: 'champ' }, { value: 'brick' }]
    const wrapper = mount(<Item items={items} dropRight={false} />)

    expect(wrapper.find('Icon').props().name).toContain('left')

    wrapper.setProps({ dropRight: true })

    expect(wrapper.find('Icon').props().name).toContain('right')
  })
})

describe('renderItem', () => {
  test('Can render custom markup for item', () => {
    const CustomItem = (props = {}) => {
      return <div className="ron">{props.label}</div>
    }

    const wrapper = mount(<Item label="Champ" renderItem={CustomItem} />)
    const el = wrapper.find('div.ron')

    expect(el.length).toBeTruthy()
  })

  test('Can render custom markup for item when multiselect enabled', () => {
    const CustomItem = (props = {}) => {
      return <div className="ron">{props.label}</div>
    }

    const wrapper = mount(
      <Item
        label="Champ"
        renderItem={CustomItem}
        getState={() => {
          return {
            allowMultipleSelection: true,
          }
        }}
      />
    )

    const el = wrapper.find('div.ron')

    expect(el.length).toBeTruthy()
  })

  test('Renders default markup (itemSelectedCheck) for item when multiselect enabled', () => {
    const wrapper = mount(<Item label="Champ" value="hello" />)

    wrapper.setProps({
      getState: () => ({
        allowMultipleSelection: true,
      }),
    })

    const itemSelectedCheck = wrapper.find(DropdownItemSelectedCheck)

    expect(itemSelectedCheck).toBeTruthy()
  })
})

describe('disabled', () => {
  test('Adds disabled styles, if specified', () => {
    const wrapper = mount(<Item disabled />)
    const el = wrapper.find('.c-DropdownItem')

    expect(hasClass(wrapper, 'is-disabled')).toBe(true)
    expect(getAttribute(el, 'aria-disabled')).toBe('true')
  })
})

describe('Types', () => {
  test('Renders a Group Header, if type is group', () => {
    const wrapper = mount(<Item type="group" />)
    const el = wrapper.find('DropdownHeader')

    expect(el.length).toBeTruthy()
  })

  test('Renders a Divider, if type is divider', () => {
    const wrapper = mount(<Item type="divider" />)
    const el = wrapper.find('DropdownDivider')

    expect(el.length).toBeTruthy()
  })
})
