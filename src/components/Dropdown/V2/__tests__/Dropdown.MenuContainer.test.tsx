import * as React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'unistore/react'
import ConnectedMenuContainer, {
  MenuContainer,
} from '../Dropdown.MenuContainer'
import { getEnhancedItemsWithProps } from '../Dropdown.utils'
import createStore from '../Dropdown.store'
import { find, hasClass } from './Dropdown.testHelpers'
import Keys from '../../../../constants/Keys'
// @ts-ignore
import Portal from '../../../Portal'

jest.mock('../../../Portal', () => {
  return {
    default: 'Portal',
  }
})

const documentEvents = {
  keydown: (event: any) => undefined,
}

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

describe('Style/Direction', () => {
  test('shouldDropUp returns true if set', () => {
    const wrapper = mount(<MenuContainer dropUp={true} />)

    // @ts-ignore
    expect(wrapper.instance().shouldDropUp()).toBe(true)
  })

  test('shouldDropUp returns false if important nodes are missing', () => {
    const wrapper = mount(<MenuContainer />)
    // @ts-ignore
    wrapper.instance().wrapperNode = undefined

    // @ts-ignore
    expect(wrapper.instance().shouldDropUp()).toBe(false)
  })

  test('Renders dropUp styles, if defined', () => {
    const wrapper = mount(<MenuContainer dropUp={true} />)
    const el = find(wrapper, baseSelector)
    const animate = wrapper.find('Animate')

    expect(hasClass(el, 'is-dropUp')).toBe(true)
    expect(animate.prop('sequence')).toContain('up')
  })
})

describe('SubMenus', () => {
  test('Increments base index to activeIndex path when opening sub menu', () => {
    const spy = jest.fn()
    const wrapper = mount(<MenuContainer activeIndex="5" isOpen={true} />)
    // @ts-ignore
    wrapper.instance().setNextActiveItem = spy

    // @ts-ignore
    wrapper.instance().openSubMenu()

    expect(spy).toHaveBeenCalledWith('5.0')
  })

  test('Does not open sub menu if menu is closed', () => {
    const spy = jest.fn()
    const wrapper = mount(<MenuContainer activeIndex="5" isOpen={false} />)
    // @ts-ignore
    wrapper.instance().setNextActiveItem = spy

    // @ts-ignore
    wrapper.instance().openSubMenu()

    expect(spy).not.toHaveBeenCalled()
  })

  test('Decrements base index to activeIndex path when closing sub menu', () => {
    const spy = jest.fn()
    const wrapper = mount(<MenuContainer activeIndex="5.0" isOpen={true} />)
    // @ts-ignore
    wrapper.instance().setNextActiveItem = spy

    // @ts-ignore
    wrapper.instance().closeSubMenu()

    expect(spy).toHaveBeenCalledWith('5')
  })

  test('Does not close sub menu if menu is closed', () => {
    const spy = jest.fn()
    const wrapper = mount(<MenuContainer activeIndex="5" isOpen={false} />)
    // @ts-ignore
    wrapper.instance().setNextActiveItem = spy

    // @ts-ignore
    wrapper.instance().closeSubMenu()

    expect(spy).not.toHaveBeenCalled()
  })
})

describe('Keyboard interactions', () => {
  const initialState = {
    activeIndex: null,
    isOpen: true,
    items: [
      {
        value: 'ron',
        label: 'Ron',
      },
      {
        value: 'champ',
        label: 'Champ',
      },
    ],
  }

  beforeEach(() => {
    document.addEventListener = jest.fn((event, handler) => {
      documentEvents[event] = handler
    })
  })

  afterEach(() => {
    // @ts-ignore
    document.addEventListener.mockRestore()
  })

  describe('Down Arrow', () => {
    test('Down: Does not select the first item if Menu is closed', () => {
      const mockStore = createStore({
        ...initialState,
        isOpen: false,
        items: getEnhancedItemsWithProps(initialState),
      })

      mount(
        <Provider store={mockStore}>
          <ConnectedMenuContainer items={mockStore.getState().items} />
        </Provider>
      )

      documentEvents.keydown({
        preventDefault: jest.fn(),
        keyCode: Keys.DOWN_ARROW,
      })

      expect(mockStore.getState().activeIndex).toBeFalsy()
      expect(mockStore.getState().activeItem).toBeFalsy()
    })

    test('Down: Does not select item if there are none', () => {
      const mockStore = createStore({
        ...initialState,
        items: getEnhancedItemsWithProps({ items: [] }),
      })

      mount(
        <Provider store={mockStore}>
          <ConnectedMenuContainer items={mockStore.getState().items} />
        </Provider>
      )

      documentEvents.keydown({
        preventDefault: jest.fn(),
        keyCode: Keys.DOWN_ARROW,
      })

      expect(mockStore.getState().activeIndex).toBeFalsy()
      expect(mockStore.getState().activeItem).toBeFalsy()
    })

    test('Down: Selects first item on keydown', () => {
      const mockStore = createStore({
        ...initialState,
        items: getEnhancedItemsWithProps(initialState),
      })

      mount(
        <Provider store={mockStore}>
          <ConnectedMenuContainer items={mockStore.getState().items} />
        </Provider>
      )

      expect(mockStore.getState().activeIndex).toBeFalsy()
      expect(mockStore.getState().activeItem).toBeFalsy()

      documentEvents.keydown({
        preventDefault: jest.fn(),
        keyCode: Keys.DOWN_ARROW,
      })

      expect(mockStore.getState().activeIndex).toBe('0')
      expect(mockStore.getState().activeItem).toBeTruthy()

      documentEvents.keydown({
        preventDefault: jest.fn(),
        keyCode: Keys.DOWN_ARROW,
      })
      expect(mockStore.getState().activeIndex).toBe('1')
    })

    test('Does not update store if there are no next valid items', () => {
      const spy = jest.fn()
      const mockStore = createStore({
        ...initialState,
        activeIndex: '500',
        items: getEnhancedItemsWithProps(initialState),
      })

      mount(
        <Provider store={mockStore}>
          <ConnectedMenuContainer items={mockStore.getState().items} />
        </Provider>
      )

      mockStore.subscribe(spy)

      documentEvents.keydown({
        preventDefault: jest.fn(),
        keyCode: Keys.DOWN_ARROW,
      })

      expect(spy).not.toHaveBeenCalled()
    })
  })

  describe('Up Arrow', () => {
    test('Up: Does not select the item if Menu is closed', () => {
      const mockStore = createStore({
        ...initialState,
        isOpen: false,
        items: getEnhancedItemsWithProps(initialState),
      })

      mount(
        <Provider store={mockStore}>
          <ConnectedMenuContainer items={mockStore.getState().items} />
        </Provider>
      )

      documentEvents.keydown({
        preventDefault: jest.fn(),
        keyCode: Keys.UP_ARROW,
      })

      expect(mockStore.getState().activeIndex).toBeFalsy()
      expect(mockStore.getState().activeItem).toBeFalsy()
    })

    test('Up: Does not update store if activeIndex is undefined', () => {
      const spy = jest.fn()
      const mockStore = createStore({
        ...initialState,
        items: getEnhancedItemsWithProps(initialState),
      })

      mount(
        <Provider store={mockStore}>
          <ConnectedMenuContainer items={mockStore.getState().items} />
        </Provider>
      )

      mockStore.subscribe(spy)

      documentEvents.keydown({
        preventDefault: jest.fn(),
        keyCode: Keys.UP_ARROW,
      })

      expect(spy).not.toHaveBeenCalled()
    })

    test('Up: Selects previous item on keydown', () => {
      const mockStore = createStore({
        ...initialState,
        items: getEnhancedItemsWithProps(initialState),
      })

      mount(
        <Provider store={mockStore}>
          <ConnectedMenuContainer items={mockStore.getState().items} />
        </Provider>
      )

      documentEvents.keydown({
        preventDefault: jest.fn(),
        keyCode: Keys.DOWN_ARROW,
      })
      documentEvents.keydown({
        preventDefault: jest.fn(),
        keyCode: Keys.DOWN_ARROW,
      })

      expect(mockStore.getState().activeIndex).toBe('1')

      documentEvents.keydown({
        preventDefault: jest.fn(),
        keyCode: Keys.UP_ARROW,
      })

      expect(mockStore.getState().activeIndex).toBe('0')
    })
  })

  describe('Right Arrow', () => {})

  describe('Tab', () => {
    test('Closes menu if pressed on last item', () => {
      const mockStore = createStore({
        ...initialState,
        activeIndex: '1',
        items: getEnhancedItemsWithProps(initialState),
      })

      const wrapper = mount(
        <Provider store={mockStore}>
          <ConnectedMenuContainer items={mockStore.getState().items} />
        </Provider>
      )

      documentEvents.keydown({
        preventDefault: jest.fn(),
        keyCode: Keys.TAB,
      })

      expect(mockStore.getState().isOpen).toBe(false)
      expect(wrapper.find('Menu').length).toBe(0)
    })

    test('Does not trigger store update if menu is closed', () => {
      const spy = jest.fn()
      const mockStore = createStore({
        ...initialState,
        activeIndex: '1',
        isOpen: false,
        items: getEnhancedItemsWithProps(initialState),
      })

      mount(
        <Provider store={mockStore}>
          <ConnectedMenuContainer items={mockStore.getState().items} />
        </Provider>
      )

      mockStore.subscribe(spy)

      documentEvents.keydown({
        preventDefault: jest.fn(),
        keyCode: Keys.TAB,
      })

      expect(spy).not.toHaveBeenCalled()
    })
  })
})
