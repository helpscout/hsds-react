import * as React from 'react'
import { cy } from '@helpscout/cyan'
import { mount } from 'enzyme'
import { EditableTextarea } from '../EditableTextarea'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = cy.render(<EditableTextarea />)

    expect(wrapper.hasClass('c-EditableTextarea')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = cy.render(<EditableTextarea className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    cy.render(<EditableTextarea data-cy="BlueBlueBlue" />)
    const el = cy.getByCy('BlueBlueBlue')

    expect(el.exists()).toBeTruthy()
  })
})

describe('Label', () => {
  test('Renders label', () => {
    cy.render(<EditableTextarea />)
    const el = cy.get('.EditableTextarea__label')

    expect(el.exists()).toBeTruthy()
  })

  test('The label has the correct "for" attribute based of name', () => {
    cy.render(<EditableTextarea id="company" />)
    const el = cy.get('.EditableTextarea__label')
    const forAttr = el.getAttribute('for')

    expect(forAttr).toContain('company')
  })
})

describe('InnerRef', () => {
  test('Can retrieve innerRef DOM node', () => {
    const spy = jest.fn()
    const wrapper = mount(<EditableTextarea id="company" innerRef={spy} />)
    const o = wrapper
      .find('.c-EditableTextarea')
      .first()
      .getDOMNode()

    expect(spy).toHaveBeenCalledWith(o)
  })
})

describe('Value', () => {
  test('Value should be empty string if no value passed', () => {
    cy.render(<EditableTextarea id="company" />)

    const textarea = cy.get('textarea')

    expect(textarea.getValue()).toBe('')
  })

  test('Value should be empty string if no value passed, placeholder should be present if passed', () => {
    cy.render(<EditableTextarea id="company" placeholder="Add something" />)

    const textarea = cy.get('textarea')

    expect(textarea.getAttribute('placeholder')).toBe('Add something')
  })

  test('Should assign a given value if passed on props', () => {
    cy.render(
      <EditableTextarea
        id="company"
        placeholder="Add something"
        value="Some Notes"
      />
    )

    const textarea = cy.get('textarea')

    expect(textarea.getValue()).toBe('Some Notes')
  })

  test('Should change a given value if passed on props', () => {
    const wrapper = cy.render(
      <EditableTextarea
        id="company"
        placeholder="Add something"
        value="hello"
      />
    )

    expect(cy.get('textarea').getValue()).toBe('hello')

    wrapper.setProps({ value: 'hola' })

    expect(cy.get('textarea').getValue()).toBe('hola')
  })

  test('Should not value if value passed on props is the same as initial prop', () => {
    const wrapper = cy.render(
      <EditableTextarea
        id="company"
        placeholder="Add something"
        value="hello"
      />
    )

    expect(cy.get('textarea').getValue()).toBe('hello')

    wrapper.setProps({ value: 'hello' })

    expect(cy.get('textarea').getValue()).toBe('hello')
  })

  test('Should not change value if value passed on props is the same as state', () => {
    const wrapper = mount(
      <EditableTextarea
        id="company"
        placeholder="Add something"
        value="hello"
      />
    )

    expect(
      wrapper
        .find('textarea')
        .first()
        // @ts-ignore
        .getDOMNode().value
    ).toBe('hello')

    wrapper.setState({ value: 'hello' })
    wrapper.setProps({ value: 'hello' })

    expect(
      wrapper
        .find('textarea')
        .first()
        // @ts-ignore
        .getDOMNode().value
    ).toBe('hello')
  })
})

describe('Keydown', () => {
  test('Enter', () => {
    const onEnterSpy = jest.fn()
    const wrapper = mount(
      <EditableTextarea id="company" value="hello" onEnter={onEnterSpy} />
    )

    wrapper
      .find('textarea')
      .first()
      .simulate('keydown', { key: 'Enter' })

    expect(onEnterSpy).toHaveBeenCalled()
  })

  test('Escape', () => {
    const onEscapeSpy = jest.fn()
    const wrapper = mount(
      <EditableTextarea id="company" value="hello" onEscape={onEscapeSpy} />
    )

    wrapper
      .find('textarea')
      .first()
      .simulate('keydown', { key: 'Escape' })

    expect(onEscapeSpy).toHaveBeenCalled()
  })

  test('onChange', () => {
    const spy = jest.fn()

    cy.render(<EditableTextarea id="company" onChange={spy} />)

    const textarea = cy.get('textarea')

    textarea.type('a')

    expect(spy).toHaveBeenCalled()
  })
})

describe('Blur', () => {
  test('should commit', () => {
    const onCommitSpy = jest.fn()

    cy.render(
      <EditableTextarea id="company" value="hello" onCommit={onCommitSpy} />
    )

    cy.get('textarea').blur()

    expect(onCommitSpy).toHaveBeenCalled()
  })
})

describe('Readonly', () => {
  test('should start as readonly', () => {
    const wrapper = mount(<EditableTextarea id="company" />)

    expect(wrapper.state('readOnly')).toBeTruthy()
  })

  test('should toggle readonly', () => {
    const wrapper = mount(<EditableTextarea id="company" />)

    wrapper.find('textarea').simulate('click')
    expect(wrapper.state('readOnly')).toBeFalsy()

    wrapper.find('textarea').simulate('blur')
    expect(wrapper.state('readOnly')).toBeTruthy()
  })
})
