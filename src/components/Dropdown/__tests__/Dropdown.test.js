import React from 'react'
import { mount, shallow } from 'enzyme'
import Dropdown from '../index'
import { MenuComponent } from '../Menu'

describe('Classname', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Dropdown />)

    expect(wrapper.hasClass('c-Dropdown')).toBeTruthy()
  })

  test('Can accept custom classNames', () => {
    const wrapper = shallow(<Dropdown className="ron" />)

    expect(wrapper.hasClass('ron')).toBeTruthy()
  })

  test('Has isOpen className', () => {
    const wrapper = shallow(<Dropdown isOpen />)

    expect(wrapper.hasClass('is-open')).toBeTruthy()
  })
})

describe('Style', () => {
  test('Can accept custom styles', () => {
    const wrapper = shallow(<Dropdown style={{ background: 'red' }} />)

    expect(wrapper.props().style.background).toBe('red')
  })
})

describe('Children', () => {
  test('Can render a non Trigger/Menu child component', () => {
    const wrapper = mount(
      <Dropdown>
        <div className="ron">Ron</div>
      </Dropdown>
    )
    const o = wrapper.find('.ron')

    expect(o.length).toBe(1)
  })

  test('Can render a single Trigger child component', () => {
    const wrapper = mount(
      <Dropdown>
        <Dropdown.Trigger />
      </Dropdown>
    )
    const o = wrapper.find(Dropdown.Trigger)

    expect(o.length).toBe(1)
  })

  test('Can render a single Menu child component', () => {
    const wrapper = mount(
      <Dropdown>
        <Dropdown.Menu />
      </Dropdown>
    )
    const o = wrapper.find(Dropdown.Menu)

    expect(o.length).toBe(1)
  })

  test('Does not render a Menu if not open', () => {
    const wrapper = mount(
      <Dropdown>
        <Dropdown.Trigger />
        <Dropdown.Menu />
      </Dropdown>
    )
    const o = wrapper.find(Dropdown.Menu)

    expect(o.length).toBe(0)
  })

  test('Can a Menu if open', () => {
    const wrapper = mount(
      <Dropdown isOpen>
        <Dropdown.Trigger />
        <Dropdown.Menu />
      </Dropdown>
    )
    const o = wrapper.find(Dropdown.Menu)

    expect(o.length).toBe(1)
  })

  test('Can render a non-trigger + menu children components', () => {
    const wrapper = mount(
      <Dropdown isOpen>
        <a>Trigger</a>
        <Dropdown.Menu />
      </Dropdown>
    )
    const m = wrapper.find(Dropdown.Menu)
    const o = wrapper.find('a')

    expect(m.length).toBe(1)
    expect(o.length).toBe(1)
  })

  test('Can render a Trigger + non-menu children components', () => {
    const wrapper = mount(
      <Dropdown>
        <Dropdown.Trigger />
        <div className="other">Other guys</div>
      </Dropdown>
    )
    const m = wrapper.find(Dropdown.Trigger)
    const o = wrapper.find('.other')

    expect(m.length).toBe(1)
    expect(o.length).toBe(1)
  })

  test('Can render a Trigger + Menu children components', () => {
    const wrapper = mount(
      <Dropdown isOpen>
        <Dropdown.Trigger />
        <Dropdown.Menu />
      </Dropdown>
    )
    const m = wrapper.find(Dropdown.Menu)
    const o = wrapper.find(Dropdown.Trigger)

    expect(m.length).toBe(1)
    expect(o.length).toBe(1)
  })
})

describe('Open', () => {
  test('Updates isOpen state on isOpen prop change', () => {
    const wrapper = mount(<Dropdown />)

    expect(wrapper.state().isOpen).not.toBeTruthy()
    wrapper.setProps({ isOpen: true })
    expect(wrapper.state().isOpen).toBeTruthy()
  })
})

describe('Selected', () => {
  test('Fires onSelect callback on item click', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Dropdown onSelect={spy} isOpen>
        <Dropdown.Trigger />
        <MenuComponent>
          <Dropdown.Item value="Ron" />
        </MenuComponent>
      </Dropdown>
    )
    const o = wrapper.find(Dropdown.Item)
    o.instance().handleOnClick({ stopPropagation: () => {} })

    expect(spy).toHaveBeenCalledWith('Ron')
  })
})

describe('Click events', () => {
  test('Does not open when document.body is clicked', () => {
    const wrapper = mount(<Dropdown />)
    wrapper.instance().handleOnBodyClick({
      target: document.body,
    })

    expect(wrapper.state().isOpen).toBeFalsy()
  })

  test('Closes when document.body is clicked', () => {
    const wrapper = mount(<Dropdown isOpen />)
    wrapper.instance().handleOnBodyClick({
      target: document.body,
    })

    expect(wrapper.state().isOpen).toBeFalsy()
  })

  test('Closes when triggerNode is clicked', () => {
    const wrapper = mount(
      <Dropdown isOpen>
        <Dropdown.Trigger />
      </Dropdown>
    )
    const o = wrapper.instance()

    o.handleOnBodyClick({
      target: o.triggerNode,
    })

    expect(wrapper.state().isOpen).toBeFalsy()
  })

  test('Opens when triggerNode is clicked', () => {
    const wrapper = mount(
      <Dropdown>
        <Dropdown.Trigger />
      </Dropdown>
    )
    const o = wrapper.instance()

    o.handleOnBodyClick({
      target: o.triggerNode,
    })

    expect(wrapper.state().isOpen).toBeTruthy()
  })
})

describe('SelectedIndex', () => {
  test('Passes selectedIndex to Menu', () => {
    const wrapper = mount(
      <Dropdown isOpen selectedIndex={3}>
        <Dropdown.Trigger />
        <MenuComponent />
      </Dropdown>
    )
    const o = wrapper.find(MenuComponent)

    expect(o.props().selectedIndex).toBe(3)
  })

  test('Respects selectedIndex set on Menu', () => {
    const wrapper = mount(
      <Dropdown isOpen selectedIndex={3}>
        <Dropdown.Trigger />
        <MenuComponent selectedIndex={2} />
      </Dropdown>
    )
    const o = wrapper.find(MenuComponent)

    expect(o.props().selectedIndex).toBe(2)
  })
})

describe('Focus', () => {
  test('Sets internal focus state when Trigger is focused', done => {
    const wrapper = mount(
      <Dropdown isOpen>
        <Dropdown.Trigger />
      </Dropdown>
    )
    const o = wrapper.find(Dropdown.Trigger)

    o.simulate('focus')

    setTimeout(() => {
      expect(wrapper.instance().isFocused).toBeTruthy()
      done()
    }, 1)
  })
})

describe('Keyboard events', () => {
  test('Open on down arrow press', () => {
    const wrapper = mount(<Dropdown />)
    const o = wrapper.instance()
    o.isFocused = true
    o.handleDownArrow()

    expect(o.state.isOpen).toBeTruthy()
    expect(o.state.selectedIndex).toBe(0)
  })

  test('Do not open on down arrow press, if not focused', () => {
    const wrapper = mount(<Dropdown />)
    const o = wrapper.instance()
    o.isFocused = false
    o.handleDownArrow()

    expect(o.state.isOpen).not.toBeTruthy()
    expect(o.state.selectedIndex).toBe(undefined)
  })

  test('Close on tab press', () => {
    const spy = jest.fn()
    const wrapper = mount(<Dropdown isOpen onClose={spy} />)
    const o = wrapper.instance()
    o.handleTab({ preventDefault: () => {} })

    expect(o.state.isOpen).not.toBeTruthy()
    expect(spy).toHaveBeenCalled()
  })

  test('Close on shift+tab press', () => {
    const spy = jest.fn()
    const wrapper = mount(<Dropdown isOpen onClose={spy} />)
    const o = wrapper.instance()
    o.handleShiftTab({ preventDefault: () => {} })

    expect(o.state.isOpen).not.toBeTruthy()
    expect(spy).toHaveBeenCalled()
  })
})

describe('Mounting', () => {
  test('Tracks mount status internally', () => {
    const wrapper = mount(<Dropdown isOpen />)
    const o = wrapper.instance()

    expect(o._isMounted).toBe(true)

    wrapper.unmount()

    expect(o._isMounted).toBe(false)
  })
})

describe('Tab Navigation', () => {
  test('Is not enabled by default', () => {
    const spy = jest.fn()
    const spyEvent = jest.fn()
    const mockEvent = {
      preventDefault: spyEvent,
    }

    const wrapper = mount(<Dropdown isOpen />)

    const o = wrapper.instance()
    o.handleOnMenuClose = spy

    o.handleTab(mockEvent)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spyEvent).toHaveBeenCalledTimes(1)

    o.handleShiftTab(mockEvent)
    expect(spy).toHaveBeenCalledTimes(2)
    expect(spyEvent).toHaveBeenCalledTimes(2)
  })

  test('Does not close menu, if enabled', () => {
    const spy = jest.fn()
    const spyEvent = jest.fn()
    const mockEvent = {
      preventDefault: spyEvent,
    }

    const wrapper = mount(<Dropdown isOpen enableTabNavigation />)

    const o = wrapper.instance()
    o.handleOnMenuClose = spy

    o.handleTab(mockEvent)
    expect(spy).not.toHaveBeenCalled()
    expect(spyEvent).not.toHaveBeenCalled()

    o.handleShiftTab(mockEvent)
    expect(spy).not.toHaveBeenCalled()
    expect(spyEvent).not.toHaveBeenCalled()
  })

  test('Refocuses the trigger when closed', () => {
    const spy = jest.fn()
    const wrapper = mount(<Dropdown isOpen enableTabNavigation />)

    const o = wrapper.instance()
    o.triggerNode = {
      focus: spy,
    }

    o.handleOnMenuClose()

    expect(spy).toHaveBeenCalled()
    expect(o.isFocused).toBe(true)
  })
})
