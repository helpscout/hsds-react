import React from 'react'
import { waitFor } from '@testing-library/react'
import { mount } from 'enzyme'
import { MenuContainer } from '../Dropdown.MenuContainer'
import { initialState } from '../Dropdown.store'
import { find, hasClass } from '../../../tests/helpers/enzyme'

const { defaultProps } = MenuContainer

jest.mock('../Dropdown.MenuPortal', () => {
  const Portal = ({ children }) => <div>{children}</div>
  return Portal
})
jest.mock('../../Animate', () => {
  const Animate = ({ children }) => <div>{children}</div>
  return Animate
})
jest.mock('../Dropdown.Renderer', () => {
  const Renderer = () => <div />
  return Renderer
})
jest.mock('../Dropdown.Menu', () => {
  const { MenuUI } = require('../Dropdown.css.js')
  const Menu = props => <MenuUI {...props} />
  return Menu
})
jest.mock('../Dropdown.Card', () => {
  const Card = ({ children }) => <div>{children}</div>
  return Card
})
jest.mock('../Dropdown.Item', () => {
  const Item = ({ children }) => <div>{children}</div>
  return Item
})

const baseSelector = 'div.c-DropdownMenuContainer'

describe('className', () => {
  test('Has a default className', () => {
    const wrapper = mount(<MenuContainer isOpen />)
    const el = wrapper.find(baseSelector)

    expect(el.length).toBeTruthy()
  })

  test('Accepts custom className', () => {
    const wrapper = mount(<MenuContainer className="ron" isOpen />)
    const el = find(wrapper, baseSelector)

    expect(hasClass(el, 'ron')).toBe(true)
  })
})

describe('Portal', () => {
  test('Renders a Portal', () => {
    const wrapper = mount(<MenuContainer isOpen={true} />)
    const el = wrapper.find('Portal')

    expect(el.length).toBeTruthy()
  })

  test('Passes isOpen false to Portal, if closed', () => {
    const wrapper = mount(<MenuContainer isOpen={false} />)
    const el = wrapper.find('Portal')

    expect(el.prop('isOpen')).toBe(false)
  })

  test('Passes isOpen true to Portal, if open', () => {
    const wrapper = mount(<MenuContainer isOpen={true} />)
    const el = wrapper.find('Portal')

    expect(el.prop('isOpen')).toBe(true)
  })

  test('Fires onMenuMounted callback on mount', () => {
    const spy = jest.fn()
    const wrapper = mount(<MenuContainer isOpen={true} onMenuMounted={spy} />)

    wrapper.instance().repositionMenuNodeCycle = spy
    const portal = wrapper.find('Portal')

    portal.props().onOpen()

    expect(spy).toHaveBeenCalled()
  })

  test('Fires onMenuUnmounted callback on mount', () => {
    const spy = jest.fn()
    const wrapper = mount(<MenuContainer isOpen={true} onMenuUnmounted={spy} />)

    wrapper.instance().repositionMenuNodeCycle = spy
    const portal = wrapper.find('Portal')

    portal.props().onClose()

    expect(spy).toHaveBeenCalled()
  })

  test('Adjusts position on Portal mount', async () => {
    const spy = jest.fn()
    const wrapper = mount(<MenuContainer isOpen={true} />)

    wrapper.instance().setPositionStylesOnNode = spy

    wrapper.instance().repositionMenuNodeCycle = spy
    const portal = wrapper.find('Portal')

    portal.props().onOpen()

    await waitFor(() => {
      expect(spy).toHaveBeenCalled()
    })
  })

  test('Refocuses triggerNode on close', () => {
    const spy = jest.fn()
    const mockTriggerNode = {
      focus: spy,
      getBoundingClientRect: () => ({ height: 0, top: 0, left: 0 }),
    }

    const wrapper = mount(
      <MenuContainer isOpen={true} triggerNode={mockTriggerNode} />
    )
    const portal = wrapper.find('Portal')

    portal.prop('onClose')()

    expect(spy).toHaveBeenCalled()
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
    const getState = () => ({ ...initialState, items })

    const wrapper = mount(
      <MenuContainer items={items} isOpen getState={getState} />
    )

    const menu = wrapper.find('Menu')
    const els = menu.find('Item')
    const el = els.first()

    expect(els.length).toBeTruthy()
    expect(el.props().label).toBe('Ron')
    expect(el.props().value).toBe('ron')
  })

  test('Renders Clearer', () => {
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
    const getState = () => ({ ...initialState, items })

    const wrapper = mount(
      <MenuContainer
        items={items}
        isOpen
        getState={getState}
        allowMultipleSelection={true}
        selectionClearer="All Items"
      />
    )

    const menu = wrapper.find('Menu')
    const els = menu.find('Item')
    const el = els.first()

    expect(els.length).toBeTruthy()
    expect(el.props().value).toBe('All Items')
  })
})

describe('Groups', () => {
  test('Can render grouped items', () => {
    const items = [
      {
        type: 'group',
        label: 'Group',
        items: [
          {
            value: 'ron',
            label: 'Ron',
          },
          {
            value: 'brian',
            label: 'Brian',
          },
        ],
      },
    ]
    const getState = () => ({ ...initialState, items })

    const wrapper = mount(
      <MenuContainer items={items} isOpen getState={getState} />
    )

    const group = wrapper.find('DropdownGroup')
    const menu = wrapper.find('Menu')
    const els = menu.find('Item.c-DropdownItem')
    const el = els.first()

    expect(group.length).toBeTruthy()
    expect(els.length).toBeTruthy()
    expect(el.props().label).toBe('Ron')
    expect(el.props().value).toBe('ron')
  })

  test('Renders group with default id, if id is undefined', () => {
    const items = [
      {
        type: 'group',
        label: 'Group',
        items: [
          {
            value: 'ron',
            label: 'Ron',
          },
          {
            value: 'brian',
            label: 'Brian',
          },
        ],
      },
    ]
    const getState = () => ({ ...initialState, items })

    const wrapper = mount(
      <MenuContainer items={items} isOpen getState={getState} id={undefined} />
    )

    const group = wrapper.find('DropdownGroup')

    expect(group.prop('id')).toContain('group-')
  })

  test('Does not render group is group.items is empty', () => {
    const items = [
      {
        type: 'group',
        label: 'Group',
        items: [],
      },
    ]
    const getState = () => ({ ...initialState, items })

    const wrapper = mount(
      <MenuContainer items={items} isOpen getState={getState} />
    )

    const group = wrapper.find('DropdownGroup')

    expect(group.length).toBeFalsy()
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
    const getState = () => ({ ...initialState, items })

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
      <MenuContainer isOpen items={items} getState={getState}>
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

describe('Style/Direction', () => {
  test('shouldDropUp returns true if set', () => {
    const wrapper = mount(<MenuContainer dropUp={true} />)

    expect(wrapper.instance().shouldDropUp()).toBe(true)
  })

  test('shouldDropUp returns false if important nodes are missing', () => {
    const wrapper = mount(<MenuContainer />)

    wrapper.instance().wrapperNode = undefined

    expect(wrapper.instance().shouldDropUp()).toBe(false)
  })

  test('Renders dropUp styles, if defined', () => {
    const wrapper = mount(<MenuContainer />)

    wrapper.instance().shouldDropDirectionUpdate = () => true

    wrapper.setProps({ dropUp: true })
    wrapper.update()

    const el = find(wrapper, baseSelector)
    const animate = wrapper.find('Animate')

    expect(animate.prop('sequence')).toContain('up')
  })

  test('Renders dropLeft styles, if defined', () => {
    const wrapper = mount(<MenuContainer dropRight={false} />)
    const el = find(wrapper, baseSelector)

    expect(hasClass(el, 'is-dropLeft')).toBe(true)
  })
})

describe('isLoading', () => {
  test('Can render custom Loading UI', () => {
    const Loading = () => <div>Loading...</div>
    const wrapper = mount(
      <MenuContainer
        isOpen={true}
        items={[]}
        isLoading={true}
        renderLoading={<Loading />}
      />
    )
    const el = wrapper.find('Loading')

    expect(el.length).toBeTruthy()
  })

  test('Does not render loading UI, if isLoading is false', () => {
    const Loading = () => <div>Loading...</div>
    const wrapper = mount(
      <MenuContainer
        isOpen={true}
        items={[]}
        isLoading={false}
        renderLoading={<Loading />}
      />
    )
    const el = wrapper.find('Loading')

    expect(el.length).toBeFalsy()
  })

  test('Does not render loading UI by default', () => {
    const Loading = () => <div>Loading...</div>
    const wrapper = mount(
      <MenuContainer isOpen={true} items={[]} renderLoading={<Loading />} />
    )
    const el = wrapper.find('Loading')

    expect(el.length).toBeFalsy()
  })
})

describe('Empty', () => {
  test('Can render Empty UI, if applicable', () => {
    const Empty = () => <div>Empty</div>
    const wrapper = mount(
      <MenuContainer isOpen={true} items={[]} renderEmpty={<Empty />} />
    )
    const el = wrapper.find('Empty')

    expect(el.length).toBeTruthy()
  })

  test('Does not render Empty UI, if there are items', () => {
    const items = [
      {
        value: 'ron',
        label: 'Ron',
      },
      {
        value: 'champ',
        label: 'Champ',
      },
    ]
    const getState = () => ({ ...initialState, items })
    const Empty = () => <div>Empty</div>
    const wrapper = mount(
      <MenuContainer
        getState={getState}
        isOpen={true}
        items={items}
        renderEmpty={<Empty />}
      />
    )
    const el = wrapper.find('Empty')

    expect(el.length).toBeFalsy()
  })

  test('Does not render Empty UI, if isLoading', () => {
    const Loading = () => <div>Loading...</div>
    const Empty = () => <div>Empty</div>
    const items = [
      {
        value: 'ron',
        label: 'Ron',
      },
      {
        value: 'champ',
        label: 'Champ',
      },
    ]
    const getState = () => ({ ...initialState, items })

    const wrapper = mount(
      <MenuContainer
        getState={getState}
        isOpen={true}
        items={items}
        isLoading={true}
        renderEmpty={<Empty />}
        renderLoading={<Loading />}
      />
    )

    expect(wrapper.find('Loading').length).toBeTruthy()
    expect(wrapper.find('Empty').length).toBeFalsy()
  })
})

describe('Position', () => {
  test('Renders position: absolute, by default', () => {
    const wrapper = mount(<MenuContainer isOpen={true} positionFixed={false} />)
    const inst = wrapper.instance()

    expect(inst.getPositionProps().position).toBe('absolute')
  })

  test('Renders position: fixed, if defined', () => {
    const wrapper = mount(<MenuContainer isOpen={true} positionFixed={true} />)
    const inst = wrapper.instance()

    expect(inst.getPositionProps().position).toBe('fixed')
  })
})

describe('forceHideMenuNode', () => {
  test('Forces the menu node to hide, on unmount', () => {
    const wrapper = mount(<MenuContainer isOpen={true} />)
    const placementNode = {
      style: {
        display: 'block',
      },
    }
    const inst = wrapper.instance()

    inst.placementNode = placementNode

    wrapper.unmount()

    expect(placementNode.style.display).toBe('none')
  })
})

describe('shouldDropDirectionUpdate', () => {
  test('shouldDropDirectionUpdate should resolve to true', () => {
    expect(defaultProps.shouldDropDirectionUpdate()).toBe(true)
  })

  test('Gets called when position is being calculated', () => {
    const spy = jest.fn()

    const shouldDropDirectionUpdate = props => {
      spy(props)
      return true
    }

    const wrapper = mount(
      <MenuContainer shouldDropDirectionUpdate={shouldDropDirectionUpdate} />
    )
    // Mocking Portal callbacks that open the Menu

    wrapper.instance().didOpen = true

    // Mock triggering

    wrapper.instance().shouldDropDirectionUpdate()

    expect(spy).toHaveBeenCalled()
  })

  test('Does not get called on the first positionMenuNodeCycle run', () => {
    const spy = jest.fn()

    const shouldDropDirectionUpdate = props => {
      spy(props)
      return true
    }

    const wrapper = mount(
      <MenuContainer shouldDropDirectionUpdate={shouldDropDirectionUpdate} />
    )
    // Mocking Portal callbacks that open the Menu

    wrapper.instance().didOpen = false

    wrapper.instance().shouldDropDirectionUpdate()

    expect(spy).not.toHaveBeenCalled()

    // Mocking RAF loop, on the 2nd run

    wrapper.instance().didOpen = true

    wrapper.instance().shouldDropDirectionUpdate()

    expect(spy).toHaveBeenCalled()
  })
})

describe('setPositionStylesOnNode', () => {
  test('Does not call shouldDropDirectionUpdate, if forceDropDown', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <MenuContainer forceDropDown={true} shouldDropDirectionUpdate={spy} />
    )

    // Setup
    const inst = wrapper.instance()
    inst.node = document.createElement('div')
    inst.placementNode = document.createElement('div')
    inst.didOpen = true

    const positionData = {
      top: 0,
      left: 0,
      position: 'absolute',
    }

    // Mock execution
    inst.setPositionStylesOnNode(positionData)

    expect(spy).not.toHaveBeenCalled()
  })

  test('Calls shouldDropDirectionUpdate, if forceDropDown is false', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <MenuContainer forceDropDown={false} shouldDropDirectionUpdate={spy} />
    )

    // Setup
    const inst = wrapper.instance()
    inst.node = document.createElement('div')
    inst.placementNode = document.createElement('div')
    inst.didOpen = true

    const positionData = {
      top: 0,
      left: 0,
      position: 'absolute',
    }

    // Mock execution
    inst.setPositionStylesOnNode(positionData)

    expect(spy).toHaveBeenCalled()
  })

  test('Adds dropUp styles, if applicable', () => {
    const mockTriggerNode = document.createElement('div')
    const wrapper = mount(<MenuContainer triggerNode={mockTriggerNode} />)

    // Setup
    const inst = wrapper.instance()
    inst.node = document.createElement('div')
    inst.placementNode = document.createElement('div')
    inst.didOpen = true

    // Mock drop calculation
    inst.shouldDropUp = () => true

    const positionData = {
      top: 0,
      left: 0,
      position: 'absolute',
    }

    // Mock execution
    inst.setPositionStylesOnNode(positionData)

    expect(inst.node.classList.contains('is-dropUp')).toBeTruthy()
    expect(window.getComputedStyle(inst.placementNode).marginTop).toContain('-')
  })

  test('Removes dropUp styles, if applicable', () => {
    const mockTriggerNode = document.createElement('div')
    const wrapper = mount(<MenuContainer triggerNode={mockTriggerNode} />)

    // Setup
    const inst = wrapper.instance()
    inst.node = document.createElement('div')
    inst.placementNode = document.createElement('div')
    inst.didOpen = true

    // Mock dropUp DOM state
    inst.node.classList.add('is-dropUp')

    // Mock drop calculation
    inst.shouldDropUp = () => false

    const positionData = {
      top: 0,
      left: 0,
      position: 'absolute',
    }

    // Mock execution
    inst.setPositionStylesOnNode(positionData)

    expect(inst.node.classList.contains('is-dropUp')).toBeFalsy()
    expect(window.getComputedStyle(inst.placementNode).marginTop).not.toContain(
      '-'
    )
  })

  test('Does not adjust placementNode styles on dropUp, if triggerNode is not defined', () => {
    const wrapper = mount(<MenuContainer />)

    // Setup
    const inst = wrapper.instance()
    inst.node = document.createElement('div')
    inst.placementNode = document.createElement('div')
    inst.didOpen = true

    // Mock drop calculation
    inst.shouldDropUp = () => true

    const positionData = {
      top: 0,
      left: 0,
      position: 'absolute',
    }

    // Mock execution
    inst.setPositionStylesOnNode(positionData)

    expect(inst.node.classList.contains('is-dropUp')).toBeTruthy()
    expect(window.getComputedStyle(inst.placementNode).marginTop).not.toContain(
      '-'
    )
  })
})
