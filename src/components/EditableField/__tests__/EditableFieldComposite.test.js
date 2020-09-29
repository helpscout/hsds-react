import React from 'react'
import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
import { mount } from 'enzyme'
import { EditableFieldComposite } from '../'
import { EditableField } from '../EditableField'
import {
  COMPOSITE_CLASSNAMES,
  EDITABLEFIELD_CLASSNAMES,
  STATES_CLASSNAMES,
} from '../EditableField.utils'

describe('Children', () => {
  test('Renders as many EditableFields as passed', () => {
    const { container } = render(
      <EditableFieldComposite>
        <EditableField name="city" />
        <EditableField name="country" />
      </EditableFieldComposite>
    )

    const el = container.querySelectorAll(
      `.${EDITABLEFIELD_CLASSNAMES.component}`
    )

    expect(el.length).toBe(2)
  })

  test('Sets inline mode on EditableFields', () => {
    const { container } = render(
      <EditableFieldComposite>
        <EditableField name="city" />
        <EditableField name="country" />
      </EditableFieldComposite>
    )

    const el = container.querySelectorAll(`.${STATES_CLASSNAMES.isInline}`)

    expect(el.length).toBe(2)
  })

  test('onInputFocus still gets executed if passed on an EditableField', () => {
    const spy = jest.fn()

    const { container } = render(
      <EditableFieldComposite>
        <EditableField name="city" onInputFocus={spy} />
        <EditableField name="country" />
      </EditableFieldComposite>
    )

    const input = container.querySelector('input')

    input.focus()

    expect(spy).toHaveBeenCalled()
  })

  test('onInputFocus still gets executed if passed on an EditableField', () => {
    const spy = jest.fn()

    const { container } = render(
      <EditableFieldComposite>
        <EditableField name="city" onInputFocus={spy} />
        <EditableField name="country" />
      </EditableFieldComposite>
    )

    const input = container.querySelector('input')

    input.focus()

    expect(spy).toHaveBeenCalled()
  })

  test('onInputBlur still gets executed if passed on an EditableField', () => {
    const spy = jest.fn()

    const { container } = render(
      <EditableFieldComposite>
        <EditableField name="city" onInputBlur={spy} />
        <EditableField name="country" />
      </EditableFieldComposite>
    )

    const input = container.querySelector('input')

    input.focus()
    input.blur()

    expect(spy).toHaveBeenCalled()
  })

  test('onChange still gets executed if passed on an EditableField', () => {
    const spy = jest.fn()

    const { container } = render(
      <EditableFieldComposite>
        <EditableField name="city" onChange={spy} />
        <EditableField name="country" />
      </EditableFieldComposite>
    )

    const input = container.querySelector('input')

    user.type(input, 'hello')

    expect(spy).toHaveBeenCalled()
  })
})

describe('Composite Mask', () => {
  test('Renders the composed value of the fields as mask', () => {
    const { container } = render(
      <EditableFieldComposite>
        <EditableField name="city" value="Barcelona" />
        <EditableField name="country" value="Spain" />
      </EditableFieldComposite>
    )

    const el = container.querySelector(`.${COMPOSITE_CLASSNAMES.mask}`)
    const maskItems = container.querySelectorAll(
      `.${COMPOSITE_CLASSNAMES.maskItem}`
    )

    expect(el.textContent).toBe(`Barcelona${'\u00a0'}Spain`)
    expect(maskItems.length).toBe(2)
  })

  test('Renders the placeholder if fields have no values as mask', () => {
    const { container } = render(
      <EditableFieldComposite placeholder="Add a place">
        <EditableField name="city" />
        <EditableField name="country" />
      </EditableFieldComposite>
    )

    const el = container.querySelector(`.${COMPOSITE_CLASSNAMES.mask}`)
    const maskPlaceholder = container.querySelectorAll(
      `.${STATES_CLASSNAMES.isPlaceholder}`
    )

    expect(el.textContent).toBe('Add a place')
    expect(maskPlaceholder.length).toBe(1)
  })

  test('Renders fields values as mask even if not all present', () => {
    const { container } = render(
      <EditableFieldComposite placeholder="Add a place">
        <EditableField name="city" value="Barcelona" />
        <EditableField name="country" />
      </EditableFieldComposite>
    )

    const mask = container.querySelector(`.${COMPOSITE_CLASSNAMES.mask}`)
    const maskItems = container.querySelectorAll(
      `.${COMPOSITE_CLASSNAMES.maskItem}`
    )

    expect(mask.textContent).toBe('Barcelona')
    expect(maskItems.length).toBe(1)
  })

  test('Renders fields values as mask even if not all present (2)', () => {
    const { container } = render(
      <EditableFieldComposite placeholder="Add a place">
        <EditableField name="city" />
        <EditableField name="country" value="Spain" />
      </EditableFieldComposite>
    )

    const el = container.querySelector(`.${COMPOSITE_CLASSNAMES.mask}`)

    expect(el.textContent).toBe('Spain')
  })

  test('Renders the composed value of the fields with custom separator as mask', () => {
    const { container } = render(
      <EditableFieldComposite separator=",">
        <EditableField name="city" value="Barcelona" />
        <EditableField name="country" value="Spain" />
      </EditableFieldComposite>
    )

    const el = container.querySelector(`.${COMPOSITE_CLASSNAMES.mask}`)

    expect(el.textContent).toBe(`Barcelona,${'\u00a0'}Spain`)
  })

  test('mask click: placeholder', () => {
    const { container } = render(
      <EditableFieldComposite>
        <EditableField name="city" />
        <EditableField name="country" />
      </EditableFieldComposite>
    )
    const input = container.querySelector('input')
    const mask = container.querySelector(`.${COMPOSITE_CLASSNAMES.maskItem}`)
    const spy = jest.spyOn(input, 'focus')

    user.click(mask)

    expect(spy).toHaveBeenCalled()
  })

  test('mask click: maskItem', () => {
    const { container } = render(
      <EditableFieldComposite>
        <EditableField name="city" value="Barcelona" />
        <EditableField name="country" value="Spain" />
      </EditableFieldComposite>
    )
    const input1 = container.querySelector('input')
    const spy1 = jest.spyOn(input1, 'focus')
    const input2 = container.querySelectorAll('input')[1]
    const spy2 = jest.spyOn(input2, 'focus')
    const maskItem1 = container.querySelector(
      `.${COMPOSITE_CLASSNAMES.maskItem}`
    )
    const maskItem2 = container.querySelectorAll(
      `.${COMPOSITE_CLASSNAMES.maskItem}`
    )[1]

    user.click(maskItem1)
    expect(spy1).toHaveBeenCalled()

    user.click(maskItem2)
    expect(spy2).toHaveBeenCalled()
  })

  test('mask onEnter', () => {
    const { container } = render(
      <EditableFieldComposite>
        <EditableField name="city" value="Barcelona" />
        <EditableField name="country" value="Spain" />
      </EditableFieldComposite>
    )
    const input = container.querySelector('input')
    const spy = jest.spyOn(input, 'focus')
    const mask = container.querySelector(`.${COMPOSITE_CLASSNAMES.mask}`)

    user.type(input, '{Enter}')
    user.type(mask, '{Enter}')

    expect(spy).toHaveBeenCalled()
    expect(
      container
        .querySelector(`.${COMPOSITE_CLASSNAMES.mask}`)
        .getAttribute('tabindex')
    ).toBe(null)
  })

  test('mask onEscape', () => {
    const { container } = render(
      <EditableFieldComposite>
        <EditableField name="city" value="Barcelona" />
        <EditableField name="country" value="Spain" />
      </EditableFieldComposite>
    )
    const input = container.querySelector('input')
    const mask = container.querySelector(`.${COMPOSITE_CLASSNAMES.mask}`)

    user.type(input, '{Enter}')
    user.type(mask, '{Enter}')

    expect(
      container
        .querySelector(`.${COMPOSITE_CLASSNAMES.mask}`)
        .getAttribute('tabindex')
    ).toBe(null)
  })
})

describe('Active Fields', () => {
  test('Sets active fields state on focus', () => {
    const { container } = render(
      <EditableFieldComposite>
        <EditableField name="city" value="Barcelona" />
        <EditableField name="country" value="Spain" />
      </EditableFieldComposite>
    )
    const input = container.querySelector('input')

    input.focus()

    expect(container.querySelector('.has-activeFields')).toBeInTheDocument()
    expect(container.querySelector('.is-active')).toBeInTheDocument()
  })

  test('Sets active fields state to blurred', () => {
    const wrapper = mount(
      <EditableFieldComposite>
        <EditableField name="city" value="Barcelona" />
        <EditableField name="country" value="Spain" />
      </EditableFieldComposite>
    )
    const input = wrapper.find('input').first()

    input.simulate('focus')
    input.simulate('blur')

    expect(wrapper.state('inputState')).toBe('blurred')
  })

  test('Mask should be hidden when active fields state on', () => {
    const { container } = render(
      <EditableFieldComposite>
        <EditableField name="city" value="Barcelona" />
        <EditableField name="country" value="Spain" />
      </EditableFieldComposite>
    )
    const input = container.querySelector('input')

    input.focus()

    expect(
      container
        .querySelector(`.${COMPOSITE_CLASSNAMES.mask}`)
        .classList.contains(STATES_CLASSNAMES.isHidden)
    ).toBeTruthy()
  })

  test('component did update', () => {
    jest.useFakeTimers()

    const wrapper = mount(
      <EditableFieldComposite>
        <EditableField name="city" />
        <EditableField name="country" />
      </EditableFieldComposite>
    )
    const input = wrapper.find('input').first()
    const input2 = wrapper.find('input').at(1)

    input.simulate('focus')

    expect(wrapper.state('hasActiveFields')).toBeTruthy()
    expect(wrapper.state('inputState')).toBe('focused')

    input.simulate('blur')
    expect(wrapper.state('inputState')).toBe('blurred')

    // Run the setTimeout in component did update
    jest.runAllTimers()

    expect(wrapper.state('hasActiveFields')).toBeFalsy()
    expect(wrapper.state('inputState')).toBe(null)

    // Focus on 2nd input directly from first input should maintain active state
    input.simulate('focus')
    input2.simulate('focus')
    jest.runAllTimers()

    expect(wrapper.state('hasActiveFields')).toBeTruthy()
    expect(wrapper.state('inputState')).toBe('focused')
  })
})

describe('Large size', () => {
  test('Sets large size', () => {
    const { container } = render(
      <EditableFieldComposite size="lg">
        <EditableField name="city" value="Barcelona" />
        <EditableField name="country" value="Spain" />
      </EditableFieldComposite>
    )

    expect(
      container.querySelector(`.${STATES_CLASSNAMES.isLarge}`)
    ).toBeInTheDocument()
  })
})

describe('Enter and Escape keypress', () => {
  test('onEnter removes active state', () => {
    const wrapper = mount(
      <EditableFieldComposite>
        <EditableField name="city" />
        <EditableField name="country" />
      </EditableFieldComposite>
    )

    const input = wrapper.find('input').first()
    input.simulate('keydown', { key: 'Enter' })

    expect(wrapper.state('inputState')).toBe(null)
    expect(wrapper.state('hasActiveFields')).toBeFalsy()
  })

  test('onEnter sets mask tabindex', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <EditableFieldComposite>
        <EditableField name="city" onEnter={spy} />
        <EditableField name="country" />
      </EditableFieldComposite>
    )

    const input = wrapper.find('input').first()

    input.simulate('keydown', { key: 'Enter' })

    expect(
      wrapper
        .find(`.${COMPOSITE_CLASSNAMES.mask}`)
        .first()
        .getDOMNode()
        .getAttribute('tabindex')
    ).toBe('0')

    expect(spy).toHaveBeenCalled()
  })

  test('onEscape sets mask tabindex', () => {
    const spy = jest.fn()

    const wrapper = mount(
      <EditableFieldComposite>
        <EditableField name="city" onEscape={spy} />
        <EditableField name="country" />
      </EditableFieldComposite>
    )

    const input = wrapper.find('input').first()
    input.simulate('keydown', { key: 'Escape' })

    expect(
      wrapper
        .find(`.${COMPOSITE_CLASSNAMES.mask}`)
        .first()
        .getDOMNode()
        .getAttribute('tabindex')
    ).toBe('0')

    expect(spy).toHaveBeenCalled()
  })
})
