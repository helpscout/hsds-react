import * as React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'unistore/react'
import ConnectedMenuContainer, {
  MenuContainer,
} from '../Dropdown.MenuContainer'
import createStore from '../Dropdown.store'
import { find, hasClass } from './Dropdown.testHelpers'
// @ts-ignore
import Portal from '../../../Portal'

jest.mock('../../../Portal', () => {
  return {
    default: 'Portal',
  }
})

const baseSelector = 'div.c-DropdownV2MenuContainer'

describe('className', () => {
  test('Has a default className', () => {
    const wrapper = mount(<MenuContainer />)
    const el = wrapper.find(baseSelector)

    expect(el.length).toBeTruthy()
  })

  test('Accepts custom className', () => {
    const wrapper = mount(<MenuContainer className="ron" />)
    const el = find(wrapper, baseSelector)

    expect(hasClass(el, 'ron')).toBe(true)
  })
})

describe('Portal', () => {
  test('Renders a Portal, if open', () => {
    const wrapper = mount(<MenuContainer isOpen={true} />)
    const el = wrapper.find('Portal')

    expect(el.length).toBeTruthy()
  })

  test('Does not render Portal, if closed', () => {
    const wrapper = mount(<MenuContainer isOpen={false} />)
    const el = wrapper.find('Portal')

    expect(el.length).not.toBeTruthy()
  })

  test('Does not render if Portal is closed', () => {
    const wrapper = mount(<MenuContainer isOpen={false} />)
    const el = wrapper.find(baseSelector)

    expect(el.length).not.toBeTruthy()
  })
})

describe('Menu', () => {
  test('Renders a Menu by default', () => {
    const wrapper = mount(<MenuContainer items={[]} isOpen />)
    const el = wrapper.find('Menu')

    expect(el.length).toBeTruthy()
  })

  test('Renders a Menu within Portal', () => {
    const wrapper = mount(<MenuContainer items={[]} isOpen />)
    const portal = wrapper.find('Portal')
    const el = portal.find('Menu')

    expect(el.length).toBeTruthy()
  })

  test('Passes the id to the Menu', () => {
    const wrapper = mount(<MenuContainer items={[]} id="ron" isOpen />)
    const el = find(wrapper, 'Menu')

    expect(el.prop('id')).toBe('ron')
  })
})

describe('Item', () => {
  test('Renders Items', () => {
    const items = [
      {
        value: 'ron',
        label: 'Ron',
      },
      {
        value: 'brian',
        label: 'Brian',
      },
    ]
    const wrapper = mount(<MenuContainer items={items} isOpen />)
    const menu = wrapper.find('Menu')
    const els = menu.find('Item')
    const el = els.first()

    expect(els.length).toBeTruthy()
    expect(el.props().label).toBe('Ron')
    expect(el.props().value).toBe('ron')
  })

  test('Renders nested tems', () => {
    const items = [
      {
        value: 'ron',
        label: 'Ron',
        items: [
          {
            value: 'brian',
            label: 'Brian',
          },
        ],
      },
    ]
    const wrapper = mount(<MenuContainer items={items} isOpen />)
    const menu = wrapper.find('Menu')
    const subMenu = menu.last()
    const el = subMenu.find('Item').first()

    expect(menu.length).toBeGreaterThanOrEqual(2)

    expect(el.props().label).toBe('Brian')
    expect(el.props().value).toBe('brian')
  })
})

describe('Accessibility', () => {
  test('Sets activeId on Menu', () => {
    const wrapper = mount(<MenuContainer items={[]} activeId="ron" isOpen />)
    const el = find(wrapper, 'Menu')

    expect(el.prop('aria-activedescendant')).toBe('ron')
  })

  test('Sets triggerId on Menu', () => {
    const wrapper = mount(<MenuContainer items={[]} triggerId="ron" isOpen />)
    const el = find(wrapper, 'Menu')

    expect(el.prop('aria-labelledby')).toBe('ron')
  })
})

describe('renderProp', () => {
  test('Does not render Menu, if renderProp (children) is specified', () => {
    const spy = jest.fn()
    const wrapper = mount(<MenuContainer isOpen>{spy}</MenuContainer>)
    const menu = wrapper.find('Menu')

    expect(menu.length).toBe(0)
    expect(spy).toHaveBeenCalled()
  })

  test('Renders a custom component with provided props', () => {
    const items = [
      {
        value: 'ron',
        label: 'Ron',
      },
      {
        value: 'brian',
        label: 'Brian',
      },
    ]

    const CustomMenu = props => {
      const { items } = props
      return (
        <div className="custom-menu">
          {items.map(item => (
            <div className="custom-item" key={item.value}>
              {item.label}
            </div>
          ))}
        </div>
      )
    }

    const wrapper = mount(
      <MenuContainer isOpen items={items}>
        {CustomMenu}
      </MenuContainer>
    )
    const menu = wrapper.find('.custom-menu')
    const els = menu.find('.custom-item')
    const el = els.first()

    expect(menu.length).toBe(1)
    expect(els.length).toBe(2)
    expect(el.html()).toContain('Ron')
  })
})

describe('ConnectedMenuContainer', () => {
  test('Can render ConnectedMenuContainer', () => {
    const mockStore = createStore({
      activeIndex: '0',
    })
    const wrapper = mount(
      <Provider store={mockStore}>
        <ConnectedMenuContainer />
      </Provider>
    )

    expect(wrapper).toBeTruthy()
  })

  test('Receives props from store', () => {
    const initialState = {
      activeIndex: '1',
      activeId: 'dropdown-1',
      direction: 'left',
      menuId: 'someId',
      zIndex: '1',
    }
    const mockStore = createStore(initialState)
    const wrapper = mount(
      <Provider store={mockStore}>
        <ConnectedMenuContainer />
      </Provider>
    )

    const el = wrapper.find('MenuContainer')

    expect(el.prop('activeIndex')).toBe(initialState.activeIndex)
    expect(el.prop('activeId')).toBe(initialState.activeId)
    expect(el.prop('id')).toBe(initialState.menuId)
    expect(el.prop('dropRight')).toBe(false)
    expect(el.prop('zIndex')).toBe(initialState.zIndex)
  })
})
