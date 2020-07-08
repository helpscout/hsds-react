import React from 'react'
import { cy } from '@helpscout/cyan'
import { mount } from 'enzyme'
import { EditableFieldComposite } from '../'
import { EditableField } from '../EditableField'
import {
  COMPOSITE_CLASSNAMES,
  EDITABLEFIELD_CLASSNAMES,
  STATES_CLASSNAMES,
} from '../EditableField.utils'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = cy.render(<EditableFieldComposite />)

    expect(wrapper.hasClass(COMPOSITE_CLASSNAMES.component)).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = cy.render(
      <EditableFieldComposite className={customClassName} />
    )

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders as many EditableFields as passed', () => {
    cy.render(
      <EditableFieldComposite>
        <EditableField name="city" />
        <EditableField name="country" />
      </EditableFieldComposite>
    )

    const el = cy.get(`.${EDITABLEFIELD_CLASSNAMES.component}`)

    expect(el.length).toBe(2)
  })

  test('Sets inline mode on EditableFields', () => {
    cy.render(
      <EditableFieldComposite>
        <EditableField name="city" />
        <EditableField name="country" />
      </EditableFieldComposite>
    )

    const el = cy.get(`.${STATES_CLASSNAMES.isInline}`)

    expect(el.length).toBe(2)
  })

  test('onInputFocus still gets executed if passed on an EditableField', () => {
    const spy = jest.fn()

    const wrapper = cy.render(
      <EditableFieldComposite>
        <EditableField name="city" onInputFocus={spy} />
        <EditableField name="country" />
      </EditableFieldComposite>
    )

    const input = wrapper.find('input').first()

    input.focus()

    expect(spy).toHaveBeenCalled()
  })

  test('onInputFocus still gets executed if passed on an EditableField', () => {
    const spy = jest.fn()

    const wrapper = cy.render(
      <EditableFieldComposite>
        <EditableField name="city" onInputFocus={spy} />
        <EditableField name="country" />
      </EditableFieldComposite>
    )

    const input = wrapper.find('input').first()

    input.focus()

    expect(spy).toHaveBeenCalled()
  })

  test('onInputBlur still gets executed if passed on an EditableField', () => {
    const spy = jest.fn()

    const wrapper = cy.render(
      <EditableFieldComposite>
        <EditableField name="city" onInputBlur={spy} />
        <EditableField name="country" />
      </EditableFieldComposite>
    )

    const input = wrapper.find('input').first()

    input.blur()

    expect(spy).toHaveBeenCalled()
  })

  test('onChange still gets executed if passed on an EditableField', () => {
    const spy = jest.fn()

    const wrapper = cy.render(
      <EditableFieldComposite>
        <EditableField name="city" onChange={spy} />
        <EditableField name="country" />
      </EditableFieldComposite>
    )

    const input = wrapper.find('input').first()
    input.type('hello')

    expect(spy).toHaveBeenCalled()
  })
})

describe('Composite Mask', () => {
  test('Renders the composed value of the fields as mask', () => {
    cy.render(
      <EditableFieldComposite>
        <EditableField name="city" value="Barcelona" />
        <EditableField name="country" value="Spain" />
      </EditableFieldComposite>
    )

    const el = cy.get(`.${COMPOSITE_CLASSNAMES.mask}`)
    const maskItems = cy.get(`.${COMPOSITE_CLASSNAMES.maskItem}`)

    expect(el.text()).toBe(`Barcelona${'\u00a0'}Spain`)
    expect(maskItems.length).toBe(2)
  })

  test('Renders the placeholder if fields have no values as mask', () => {
    cy.render(
      <EditableFieldComposite placeholder="Add a place">
        <EditableField name="city" />
        <EditableField name="country" />
      </EditableFieldComposite>
    )

    const el = cy.get(`.${COMPOSITE_CLASSNAMES.mask}`)
    const maskPlaceholder = cy.get(`.${STATES_CLASSNAMES.isPlaceholder}`)

    expect(el.text()).toBe('Add a place')
    expect(maskPlaceholder.length).toBe(1)
  })

  test('Renders fields values as mask even if not all present', () => {
    cy.render(
      <EditableFieldComposite placeholder="Add a place">
        <EditableField name="city" value="Barcelona" />
        <EditableField name="country" />
      </EditableFieldComposite>
    )

    const mask = cy.get(`.${COMPOSITE_CLASSNAMES.mask}`)
    const maskItems = cy.get(`.${COMPOSITE_CLASSNAMES.maskItem}`)

    expect(mask.text()).toBe('Barcelona')
    expect(maskItems.length).toBe(1)
  })

  test('Renders fields values as mask even if not all present (2)', () => {
    cy.render(
      <EditableFieldComposite placeholder="Add a place">
        <EditableField name="city" />
        <EditableField name="country" value="Spain" />
      </EditableFieldComposite>
    )

    const el = cy.get(`.${COMPOSITE_CLASSNAMES.mask}`)

    expect(el.text()).toBe('Spain')
  })

  test('Renders the composed value of the fields with custom separator as mask', () => {
    cy.render(
      <EditableFieldComposite separator=",">
        <EditableField name="city" value="Barcelona" />
        <EditableField name="country" value="Spain" />
      </EditableFieldComposite>
    )

    const el = cy.get(`.${COMPOSITE_CLASSNAMES.mask}`)

    expect(el.text()).toBe(`Barcelona,${'\u00a0'}Spain`)
  })

  test('mask click: placeholder', () => {
    const wrapper = mount(
      <EditableFieldComposite>
        <EditableField name="city" />
        <EditableField name="country" />
      </EditableFieldComposite>
    )
    const input = wrapper.find('input').first().instance()
    const mask = wrapper.find(`.${COMPOSITE_CLASSNAMES.maskItem}`).first()
    const spy = jest.spyOn(input, 'focus')

    mask.simulate('click')

    expect(spy).toHaveBeenCalled()
  })

  test('mask click: maskItem', () => {
    const wrapper = mount(
      <EditableFieldComposite>
        <EditableField name="city" value="Barcelona" />
        <EditableField name="country" value="Spain" />
      </EditableFieldComposite>
    )
    const input1 = wrapper.find('input').first().instance()
    const spy1 = jest.spyOn(input1, 'focus')
    const input2 = wrapper.find('input').at(1).instance()
    const spy2 = jest.spyOn(input2, 'focus')
    const maskItem1 = wrapper.find(`.${COMPOSITE_CLASSNAMES.maskItem}`).first()
    const maskItem2 = wrapper.find(`.${COMPOSITE_CLASSNAMES.maskItem}`).at(1)

    maskItem1.simulate('click')
    expect(spy1).toHaveBeenCalled()

    maskItem2.simulate('click')
    expect(spy2).toHaveBeenCalled()
  })

  test('mask onEnter', () => {
    const wrapper = mount(
      <EditableFieldComposite>
        <EditableField name="city" value="Barcelona" />
        <EditableField name="country" value="Spain" />
      </EditableFieldComposite>
    )
    const input = wrapper.find('input').first()
    const inputNode = input.instance()
    const spy = jest.spyOn(inputNode, 'focus')
    const mask = wrapper.find(`.${COMPOSITE_CLASSNAMES.mask}`).first()

    input.simulate('keydown', { key: 'Enter' })
    mask.simulate('keydown', { key: 'Enter' })

    expect(spy).toHaveBeenCalled()
    expect(
      wrapper
        .find(`.${COMPOSITE_CLASSNAMES.mask}`)
        .first()
        .getDOMNode()
        .getAttribute('tabindex')
    ).toBe(null)
  })

  test('mask onEscape', () => {
    const wrapper = mount(
      <EditableFieldComposite>
        <EditableField name="city" value="Barcelona" />
        <EditableField name="country" value="Spain" />
      </EditableFieldComposite>
    )
    const input = wrapper.find('input').first()
    const mask = wrapper.find(`.${COMPOSITE_CLASSNAMES.mask}`).first()

    input.simulate('keydown', { key: 'Enter' })
    mask.simulate('keydown', { key: 'Escape' })

    expect(
      wrapper
        .find(`.${COMPOSITE_CLASSNAMES.mask}`)
        .first()
        .getDOMNode()
        .getAttribute('tabindex')
    ).toBe(null)
  })
})

describe('Active Fields', () => {
  test('Sets active fields state on focus', () => {
    const wrapper = mount(
      <EditableFieldComposite>
        <EditableField name="city" value="Barcelona" />
        <EditableField name="country" value="Spain" />
      </EditableFieldComposite>
    )
    const input = wrapper.find('input').first()

    input.simulate('focus')

    expect(wrapper.state('inputState')).toBe('focused')
    expect(wrapper.state('hasActiveFields')).toBeTruthy()
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
    const wrapper = mount(
      <EditableFieldComposite>
        <EditableField name="city" value="Barcelona" />
        <EditableField name="country" value="Spain" />
      </EditableFieldComposite>
    )
    const input = wrapper.find('input').first()

    input.simulate('focus')

    expect(
      wrapper
        .find(`.${COMPOSITE_CLASSNAMES.mask}`)
        .first()
        .hasClass(STATES_CLASSNAMES.isHidden)
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
    const wrapper = cy.render(
      <EditableFieldComposite size="lg">
        <EditableField name="city" value="Barcelona" />
        <EditableField name="country" value="Spain" />
      </EditableFieldComposite>
    )

    expect(wrapper.hasClass(STATES_CLASSNAMES.isLarge)).toBeTruthy()
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
