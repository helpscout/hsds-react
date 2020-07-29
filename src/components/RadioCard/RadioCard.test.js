import React from 'react'
import { mount } from 'enzyme'
import RadioCard from './RadioCard'
import ChoiceGroup from '../ChoiceGroup'

class TestComponent extends React.PureComponent {
  render() {
    return <span>test</span>
  }
}

describe('ClassName', () => {
  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<RadioCard className={customClass} />)

    expect(wrapper.getDOMNode().classList.contains(customClass)).toBe(true)
  })
})

describe('maxWidth', () => {
  test('Applies maxWidth to card', () => {
    const maxWidth = '124px'
    const wrapper = mount(<RadioCard maxWidth={maxWidth} />)

    expect(wrapper.find('.c-RadioCard').first().props().maxWidth).toBe(maxWidth)
  })
})

describe('Radio', () => {
  test('Renders a custom radio', () => {
    const wrapper = mount(<RadioCard checked={true} />)
    const o = wrapper.find('Radio')

    expect(o.length).toBeTruthy()
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

    expect(wrapper.getDOMNode().classList.contains('is-checked')).toBe(true)
    expect(
      wrapper.find('.c-RadioCard__iconWrapper').first().hasClass('is-checked')
    ).toBe(true)

    wrapper.setProps({ checked: false })

    expect(wrapper.getDOMNode().classList.contains('is-checked')).toBe(false)
    expect(
      wrapper.find('.c-RadioCard__iconWrapper').first().hasClass('is-checked')
    ).toBe(false)
  })
})

describe('Icon', () => {
  test('Renders Icon by default', () => {
    const wrapper = mount(<RadioCard checked={true} />)
    const o = wrapper.find('.c-RadioCard__icon')

    expect(o.length).toBeTruthy()
  })

  test('Can customize Icon', () => {
    const wrapper = mount(<RadioCard checked={true} icon="emoji" />)
    const o = wrapper.find('Icon').first()

    expect(o.length).toBeTruthy()
    expect(o.prop('name')).toBe('emoji')
  })

  test('Can render custom Icon function', () => {
    const Custom = () => <div />
    const wrapper = mount(<RadioCard checked={true} icon={Custom} />)

    expect(wrapper.find(Custom).length).toBeTruthy()
  })

  test('Can render custom Icon component', () => {
    const wrapper = mount(<RadioCard checked={true} icon={<TestComponent />} />)

    expect(wrapper.find(TestComponent).length).toBeTruthy()
  })

  test('Falls back to defaultIcon if icon is invalid', () => {
    const wrapper = mount(<RadioCard checked={true} icon={undefined} />)
    const o = wrapper.find('Icon').first()

    expect(o.length).toBeTruthy()
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
    const o = wrapper.find('input').getDOMNode()

    expect(spy).toHaveBeenCalledWith(o)
  })

  test('Can retrieve the input node from innerRef', () => {
    const spy = jest.fn()
    const wrapper = mount(<RadioCard innerRef={spy} />)
    const o = wrapper.find('input').getDOMNode()

    expect(spy).toHaveBeenCalledWith(o)
  })
})

describe('Focus', () => {
  test('Does not render focus, by default', () => {
    const wrapper = mount(<RadioCard />)
    const o = wrapper.find('.is-focused').first()

    expect(o.length).toBe(0)
  })

  test('Can preset focus using props', () => {
    const wrapper = mount(<RadioCard isFocused />)
    const o = wrapper.find('.is-focused').first()

    expect(o.length).toBeTruthy()
  })

  test('Adds and removes focus className, if focused or blurred', () => {
    const wrapper = mount(<RadioCard />)
    wrapper.find('input').first().simulate('focus')
    expect(wrapper.getDOMNode().classList.contains('is-focused')).toBeTruthy()
    wrapper.find('input').first().simulate('blur')
    expect(wrapper.getDOMNode().classList.contains('is-focused')).toBeFalsy()
  })
})

describe('Heading', () => {
  test('Can render custom Heading function', () => {
    const Custom = () => <div />
    const wrapper = mount(<RadioCard checked={true} heading={Custom} />)

    expect(wrapper.find(Custom).length).toBeTruthy()
  })

  test('Can render custom Heading component', () => {
    const wrapper = mount(
      <RadioCard checked={true} heading={<TestComponent />} />
    )

    expect(wrapper.find(TestComponent).length).toBeTruthy()
  })

  test('Can render Heading string', () => {
    const heading = 'this is a heading'
    const wrapper = mount(<RadioCard checked={true} heading={heading} />)

    expect(wrapper.find('.c-RadioCard__heading').first().text()).toBe(heading)
  })
})

describe('Content', () => {
  test('Can render custom Content function', () => {
    const Custom = () => <div />
    const wrapper = mount(<RadioCard checked={true} content={Custom} />)

    expect(wrapper.find(Custom).length).toBeTruthy()
  })

  test('Can render custom Content component', () => {
    const wrapper = mount(
      <RadioCard checked={true} content={<TestComponent />} />
    )

    expect(wrapper.find(TestComponent).length).toBeTruthy()
  })

  test('Can render Content string', () => {
    const content = 'this is a content'
    const wrapper = mount(<RadioCard checked={true} content={content} />)

    expect(wrapper.find('.c-RadioCard__content').first().text()).toBe(content)
  })
})
describe('ChoiceGroup.Context', () => {
  test('Can propogate checked value', () => {
    const wrapper = mount(
      <ChoiceGroup>
        <RadioCard value="buddy" />
        <RadioCard value="elf" />
      </ChoiceGroup>
    )
    let el = wrapper.find('input').first()

    expect(el.prop('checked')).toBe(false)

    el.simulate('change', { target: { checked: true } })

    el = wrapper.find('input').first()
    expect(el.prop('checked')).toBe(true)
  })
})
