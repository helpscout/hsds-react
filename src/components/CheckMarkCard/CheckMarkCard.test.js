import React from 'react'
import { mount } from 'enzyme'
import CheckMarkCard from '../CheckMarkCard'
import Checkbox from '../Checkbox'
import Icon from '../Icon'
import Tooltip from '../Tooltip'
import VisuallyHidden from '../VisuallyHidden'
import { render, screen } from '@testing-library/react'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = mount(<CheckMarkCard />)

    expect(wrapper.find('.c-CheckMarkCard').length).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = mount(<CheckMarkCard className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('dimensions', () => {
  test('should apply maxWidth to card if passed', () => {
    const maxWidth = '124px'
    const wrapper = mount(<CheckMarkCard maxWidth={maxWidth} />)

    expect(wrapper.find('.c-CheckMarkCard').first().props().maxWidth).toBe(
      maxWidth
    )
  })

  test('should apply height to card if passed', () => {
    const height = '124px'
    const wrapper = mount(<CheckMarkCard height={height} />)

    expect(wrapper.find('.c-CheckMarkCard').first().props().height).toBe(height)
  })
})

describe('Checkbox', () => {
  test('should use a Checkbox under the hood', () => {
    const wrapper = mount(<CheckMarkCard />)

    expect(wrapper.find(Checkbox).length).toBeTruthy()
  })

  test('should use VisuallyHidden to hide the checkbox', () => {
    const wrapper = mount(<CheckMarkCard />)

    expect(wrapper.find(VisuallyHidden).length).toBeTruthy()
  })

  test('Passes unique ID to Checkbox', () => {
    const wrapper = mount(<CheckMarkCard />)
    const o = wrapper.find(Checkbox)

    expect(o.prop('id')).toBeTruthy()
  })

  test('Passes id prop to Checkbox', () => {
    const wrapper = mount(<CheckMarkCard id="ron" />)
    const o = wrapper.find(Checkbox)

    expect(o.prop('id')).toBe('ron')
  })
})

describe('Checked', () => {
  test('Applies checked styles, if provided', () => {
    const wrapper = mount(<CheckMarkCard checked />)

    expect(wrapper.getDOMNode().classList.contains('is-checked')).toBeTruthy()
    expect(wrapper.find(Icon).first().props().name).toBe('checkmark')

    wrapper.setProps({ checked: false })

    expect(wrapper.getDOMNode().classList.contains('is-checked')).toBeFalsy()
  })
})

describe('with status', () => {
  const statusProps = {
    status: 'locked',
    iconName: 'lock-closed',
    iconSize: '20',
    markColor: 'lavender',
  }
  test('Applies withStatus styles', () => {
    const wrapper = mount(<CheckMarkCard {...statusProps} />)

    expect(wrapper.getDOMNode().classList.contains('with-status')).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('is-lavender')).toBeTruthy()
    expect(
      wrapper.getDOMNode().classList.contains(`is-${statusProps.status}`)
    ).toBeTruthy()
    expect(wrapper.find(Icon).first().props().name).toBe('lock-closed')
    expect(wrapper.find(Tooltip).length).toBeFalsy()

    wrapper.setProps({ status: undefined, markColor: undefined })

    expect(wrapper.getDOMNode().classList.contains('with-status')).toBeFalsy()
  })

  test('the input should be disabled', () => {
    const wrapper = mount(<CheckMarkCard {...statusProps} />)

    expect(wrapper.find(Checkbox).first().props().disabled).toBeTruthy()
  })

  test('adds tooltip to mark if provided', () => {
    statusProps.tooltipText = 'hello'
    const wrapper = mount(<CheckMarkCard {...statusProps} />)

    expect(wrapper.find(Tooltip).length).toBeTruthy()
    expect(wrapper.find(Tooltip).first().props().title).toBe('hello')
  })

  test('with status styles take precedent over checked', () => {
    const wrapper = mount(<CheckMarkCard {...statusProps} checked />)

    expect(
      wrapper.getDOMNode().classList.contains(`is-${statusProps.status}`)
    ).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('is-checked')).toBeFalsy()
    expect(wrapper.find(Icon).first().props().name).toBe('lock-closed')
  })
})

describe('Disabled', () => {
  test('Applies disabled styles, if provided', () => {
    const wrapper = mount(<CheckMarkCard disabled />)

    expect(wrapper.getDOMNode().classList.contains('is-disabled')).toBeTruthy()

    wrapper.setProps({ disabled: false })

    expect(wrapper.getDOMNode().classList.contains('is-disabled')).toBeFalsy()
  })

  test('show tooltip to the card if provided', () => {
    const wrapper = mount(<CheckMarkCard cardTooltipText="hello" disabled />)

    expect(wrapper.find(Tooltip).length).toBeTruthy()
    expect(wrapper.find(Tooltip).first().props().title).toBe('hello')
  })
})

describe('Events', () => {
  test('Can fire onChange callback prop', () => {
    const spy = jest.fn()
    const wrapper = mount(<CheckMarkCard onChange={spy} />)
    const input = wrapper.find('input')

    input.simulate('change', { target: { checked: true } })

    expect(spy).toHaveBeenCalled()
  })

  test('Can fire onBlur callback prop', () => {
    const spy = jest.fn()
    const wrapper = mount(<CheckMarkCard onBlur={spy} />)
    const input = wrapper.find('input')

    input.simulate('blur')

    expect(spy).toHaveBeenCalled()
  })

  test('Can fire onFocus callback prop', () => {
    const spy = jest.fn()
    const wrapper = mount(<CheckMarkCard onFocus={spy} />)
    const input = wrapper.find('input')

    input.simulate('focus')

    expect(spy).toHaveBeenCalled()
  })
})

describe('Ref', () => {
  test('Can retrieve the input node from inputRef', () => {
    const spy = jest.fn()
    const wrapper = mount(<CheckMarkCard inputRef={spy} />)
    const o = wrapper.find('input').getDOMNode()

    expect(spy).toHaveBeenCalledWith(o)
  })
})

describe('Focus', () => {
  test('Does not render focus, by default', () => {
    const wrapper = mount(<CheckMarkCard />)
    const o = wrapper.find('.is-focused').first()

    expect(o.length).toBe(0)
  })

  test('Can preset focus using props', () => {
    const wrapper = mount(<CheckMarkCard isFocused />)

    expect(wrapper.getDOMNode().classList.contains('is-focused')).toBeTruthy()
  })

  test('Adds and removes focus className, if focused or blurred', () => {
    const wrapper = mount(<CheckMarkCard />)

    wrapper.find('input').first().simulate('focus')
    expect(wrapper.getDOMNode().classList.contains('is-focused')).toBeTruthy()

    wrapper.find('input').first().simulate('blur')
    expect(wrapper.getDOMNode().classList.contains('is-focused')).toBeFalsy()
  })
})

describe('Label', () => {
  it('should use content as a label for checkbox', () => {
    render(
      <CheckMarkCard
        label="John"
        subtitle="NYC"
        avatar={'https://exmaple-image'}
      />
    )

    expect(screen.getByRole('checkbox')).toHaveAccessibleName('John NYC')
  })
})
