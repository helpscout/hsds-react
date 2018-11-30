import * as React from 'react'
import { mount } from 'enzyme'
import { Item } from '../Dropdown.Item'
import {
  findDOMNode,
  hasClass,
  getAttribute,
} from '../../../../tests/helpers/enzyme'
import { setMenuPositionStyles } from '../Dropdown.renderUtils'
import { MenuUI } from '../Dropdown.css.js'

jest.mock('../Dropdown.utils')
jest.mock('../Dropdown.renderUtils')
jest.mock('../Dropdown.Card', () => {
  const Card = props => <div {...props} />
  return {
    default: props => {
      return <Card {...props} />
    },
  }
})
jest.mock('../Dropdown.Menu', () => {
  const Menu = props => <MenuUI {...props} />
  return {
    default: props => {
      return <Menu {...props} />
    },
  }
})

beforeEach(() => {
  // @ts-ignore
  setMenuPositionStyles.mockClear()
})

describe('className', () => {
  test('Has a default className', () => {
    const wrapper = mount(<Item />)

    expect(hasClass(wrapper, 'c-DropdownV2Item')).toBe(true)
  })

  test('Accepts custom className', () => {
    const wrapper = mount(<Item className="ron" />)

    expect(hasClass(wrapper, 'ron')).toBe(true)
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

describe('innerRef', () => {
  test('Can set an innerRef to a DOM node', () => {
    const spy = jest.fn()
    const wrapper = mount(<Item innerRef={spy} />)
    const el = wrapper.getDOMNode()

    expect(spy).toHaveBeenCalledWith(el)
  })

  test('Internally sets the actionNode', () => {
    const items = [{ value: 'ron' }, { value: 'champ' }, { value: 'brick' }]
    const wrapper = mount(<Item items={items} />)
    const el = findDOMNode(wrapper, '.c-DropdownV2ItemAction')

    // @ts-ignore
    expect(wrapper.instance().actionNode).toBe(el)
  })

  test('Internally sets the wrapperNode', () => {
    const items = [{ value: 'ron' }, { value: 'champ' }, { value: 'brick' }]
    const wrapper = mount(<Item items={items} />)

    // @ts-ignore
    expect(wrapper.instance().wrapperNode).toBeTruthy()
  })
})

describe('renderMenu', () => {
  test('Renders the menu on mount', () => {
    const items = [{ value: 'ron' }, { value: 'champ' }, { value: 'brick' }]
    const wrapper = mount(<Item items={items} />)

    expect(wrapper).toBeTruthy()
    expect(setMenuPositionStyles).toHaveBeenCalled()
  })

  test('Does not render the menu if important DOM nodes are missing', () => {
    const items = [{ value: 'ron' }, { value: 'champ' }, { value: 'brick' }]
    const wrapper = mount(<Item items={items} />)

    expect(setMenuPositionStyles).toHaveBeenCalledTimes(1)

    // @ts-ignore
    wrapper.instance().menuNode = null

    wrapper.setProps({
      isHover: true,
    })

    expect(setMenuPositionStyles).toHaveBeenCalledTimes(1)
  })
})

describe('Action', () => {
  test('Renders an Action', () => {
    const wrapper = mount(<Item />)
    const el = wrapper.find('.c-DropdownV2ItemAction')

    expect(el.length).toBeTruthy()
  })

  test('Gets subMenu class, if applicable', () => {
    const items = [{ value: 'ron' }, { value: 'champ' }, { value: 'brick' }]
    const wrapper = mount(<Item items={items} />)
    const el = wrapper.find('.c-DropdownV2ItemAction')

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

describe('Events', () => {
  test('onClick callback fires', () => {
    const spy = jest.fn()
    const wrapper = mount(<Item onClick={spy} />)

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
    const el = wrapper.find('.c-DropdownV2ItemSubMenuIndicator')

    expect(el.length).toBeTruthy()
  })

  test('Does not render the sub menu indicator, if has no items', () => {
    const items = undefined
    const wrapper = mount(<Item items={items} />)
    const el = wrapper.find('.c-DropdownV2ItemSubMenuIndicator')

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
      // @ts-ignore
      return <div className="ron">{props.label}</div>
    }

    const wrapper = mount(<Item label="Champ" renderItem={CustomItem} />)
    const el = wrapper.find('div.ron')

    expect(el.length).toBeTruthy()
  })
})

describe('disabled', () => {
  test('Adds disabled styles, if specified', () => {
    const wrapper = mount(<Item disabled />)
    const el = wrapper.find('.c-DropdownV2Item')

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
