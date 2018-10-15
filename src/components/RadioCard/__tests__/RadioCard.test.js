import React from 'react'
import { mount } from 'enzyme'
import RadioCard from '../RadioCard'

describe('ClassName', () => {
  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<RadioCard className={customClass} />)

    expect(wrapper.hasClass(customClass)).toBe(true)
  })
})

describe('Radio', () => {
  test('Renders a custom radio', () => {
    const wrapper = mount(<RadioCard checked={true} />)
    const o = wrapper.find('Radio')

    expect(o.length).toBe(1)
    expect(o.prop('kind')).toBe('custom')
  })

  test('Passes unique ID to radio', () => {
    const wrapper = mount(<RadioCard />)
    const o = wrapper.find('Radio')

    expect(o.prop('id')).toBe(wrapper.state().id)
  })

  test('Passes id prop to radio', () => {
    const wrapper = mount(<RadioCard id="ron" />)
    const o = wrapper.find('Radio')

    expect(o.prop('id')).toBe('ron')
  })
})

describe('Checked', () => {
  test('Applies checked styles, if provided', () => {
    const wrapper = mount(<RadioCard checked={true} />)

    expect(wrapper.hasClass('is-checked')).toBe(true)
    expect(
      wrapper.find('.c-RadioCard__iconWrapper').hasClass('is-checked')
    ).toBe(true)

    wrapper.setProps({ checked: false })

    expect(wrapper.hasClass('is-checked')).toBe(false)
    expect(
      wrapper.find('.c-RadioCard__iconWrapper').hasClass('is-checked')
    ).toBe(false)
  })
})

describe('Icon', () => {
  test('Renders Icon by default', () => {
    const wrapper = mount(<RadioCard checked={true} />)
    const o = wrapper.find('.c-RadioCard__icon')

    expect(o.length).toBe(1)
    expect(
      wrapper
        .find('Icon')
        .first()
        .prop('name')
    ).toBe(wrapper.instance().defaultIcon)
  })

  test('Can customize Icon', () => {
    const wrapper = mount(<RadioCard checked={true} icon="emoji" />)
    const o = wrapper.find('Icon').first()

    expect(o.length).toBe(1)
    expect(o.prop('name')).toBe('emoji')
  })

  test('Can render custom Icon component', () => {
    const Custom = () => <div />
    const wrapper = mount(<RadioCard checked={true} icon={Custom} />)

    expect(wrapper.find(Custom).length).toBe(1)
  })

  test('Falls back to defaultIcon if icon is invalid', () => {
    const wrapper = mount(<RadioCard checked={true} icon={[]} />)
    const o = wrapper.find('Icon').first()

    expect(o.length).toBe(1)
    expect(o.prop('name')).toBe(wrapper.instance().defaultIcon)
  })
})

describe('Events', () => {
  test('Can fire onBlur callback prop', () => {
    const spy = jest.fn()
    const wrapper = mount(<RadioCard onBlur={spy} />)
    const input = wrapper.find('input')

    input.simulate('blur')

    expect(spy).toHaveBeenCalled()
  })

  test('Can fire onFocus callback prop', () => {
    const spy = jest.fn()
    const wrapper = mount(<RadioCard onFocus={spy} />)
    const input = wrapper.find('input')

    input.simulate('focus')

    expect(spy).toHaveBeenCalled()
  })
})

describe('Ref', () => {
  test('Can retrieve the input node from inputRef', () => {
    const spy = jest.fn()
    const wrapper = mount(<RadioCard inputRef={spy} />)
    const o = wrapper.find('input').getNode()

    expect(spy).toHaveBeenCalledWith(o)
  })
})

describe('Focus', () => {
  test('Does not render focus, by default', () => {
    const wrapper = mount(<RadioCard />)
    const o = wrapper.find('.c-RadioCard__focus').first()

    expect(o.length).toBe(0)
  })

  test('Can preset focus using props', () => {
    const wrapper = mount(<RadioCard isFocused />)
    const o = wrapper.find('.c-RadioCard__focus').first()

    expect(o.length).toBe(1)
  })

  test('Renders FocusUI on blur/focus of input', () => {
    const wrapper = mount(<RadioCard />)
    const input = wrapper.find('input')

    input.simulate('focus')

    expect(wrapper.find('.c-RadioCard__focus').first().length).toBe(1)

    input.simulate('blur')

    expect(wrapper.find('.c-RadioCard__focus').first().length).toBe(0)
  })

  test('Adds focus className, if focused', () => {
    const wrapper = mount(<RadioCard isFocused />)

    expect(wrapper.hasClass('is-focused')).toBe(true)
  })
})
