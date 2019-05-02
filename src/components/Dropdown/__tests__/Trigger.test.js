import * as React from 'react'
import { shallow } from 'enzyme'
import Trigger from '../Dropdown.Trigger'
import { Button, Icon } from '../../'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Trigger />)

    expect(wrapper.hasClass('c-DropdownTrigger')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<Trigger className={customClass} />)

    expect(wrapper.hasClass(customClass)).toBeTruthy()
  })
})

describe('Active', () => {
  test('Is not active by default', () => {
    const wrapper = shallow(<Trigger />)

    expect(wrapper.props().isActive).not.toBeTruthy()
  })

  test('Adds active className, if set', () => {
    const wrapper = shallow(<Trigger isActive />)

    expect(wrapper.hasClass('is-active')).toBeTruthy()
  })

  test('Adds active className to non-text child, if set', () => {
    const wrapper = shallow(
      <Trigger isActive>
        <a>Link</a>
      </Trigger>
    )
    const o = wrapper.find('a')

    expect(o.hasClass('is-active')).toBeTruthy()
  })
})

describe('Children', () => {
  test('Can render a text-node child, with default button markup', () => {
    const wrapper = shallow(<Trigger>Text</Trigger>)
    const o = wrapper.find(Button)

    expect(o.length).toBeTruthy()
    expect(o.find(Icon).length).toBeTruthy()
  })

  test('Can render a non-text-node child, while preserving props', () => {
    const wrapper = shallow(
      <Trigger className="buddy-link" style={{ background: 'red' }}>
        <a>Link</a>
      </Trigger>
    )

    const o = wrapper.find('a')
    const n = wrapper.find(Button)

    expect(o.length).toBeTruthy()
    expect(o.hasClass('c-DropdownTrigger')).toBeTruthy()
    expect(o.hasClass('buddy-link')).toBeTruthy()
    expect(o.props().style.background).toBe('red')
    expect(o.props().tabIndex).toBe(0)
    expect(n.length).not.toBeTruthy()
  })

  test('Only accepts a single child component', () => {
    const wrapper = () =>
      shallow(
        <Trigger className="buddy-link" style={{ background: 'red' }}>
          <a>Link</a>
          <a>Link Two</a>
        </Trigger>
      )

    expect(wrapper).toThrow(Error, /React.Children.only/)
  })
})

describe('Callbacks', () => {
  test('onBlur callback can be fired', () => {
    const spy = jest.fn()
    const wrapper = shallow(<Trigger onBlur={spy} />)

    wrapper.simulate('blur')

    expect(spy).toHaveBeenCalled()
  })

  test('onClick callback can be fired', () => {
    const spy = jest.fn()
    const wrapper = shallow(<Trigger onClick={spy} />)
    const o = wrapper.find(Button)

    o.simulate('click')

    expect(spy).toHaveBeenCalled()
  })

  test('onFocus callback can be fired', () => {
    const spy = jest.fn()
    const wrapper = shallow(<Trigger onFocus={spy} />)

    wrapper.simulate('focus')

    expect(spy).toHaveBeenCalled()
  })
})

describe('Direction', () => {
  test('Has a default direction of down', () => {
    const wrapper = shallow(<Trigger />)

    expect(wrapper.hasClass('is-down')).toBeTruthy()
  })

  test('Can set custom direction', () => {
    const wrapper = shallow(<Trigger direction="up" />)

    expect(wrapper.hasClass('is-down')).not.toBeTruthy()
    expect(wrapper.hasClass('is-up')).toBeTruthy()
  })
})

describe('Style', () => {
  test('Can accept custom styles', () => {
    const wrapper = shallow(<Trigger style={{ padding: 200 }} />)

    expect(wrapper.props().style.padding).toBe(200)
  })
})

describe('Click', () => {
  test('Prevents defaultEvent on click', () => {
    const spy = jest.fn()
    const wrapper = shallow(<Trigger />)

    wrapper.instance().handleOnClick({ preventDefault: spy })

    expect(spy).toHaveBeenCalled()
  })

  test('Fires onClick callback', () => {
    const spy = jest.fn()
    const wrapper = shallow(<Trigger onClick={spy} />)

    wrapper.instance().handleOnClick()

    expect(spy).toHaveBeenCalled()
  })
})
