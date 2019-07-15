import * as React from 'react'
import { cy } from '@helpscout/cyan'
import { mount } from 'enzyme'
import { EditableField } from '../EditableField'

cy.useFakeTimers()

describe('className', () => {
  test('Has default className', () => {
    const wrapper = cy.render(<EditableField name="company" />)

    expect(wrapper.hasClass('c-EditableField')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = cy.render(
      <EditableField className={customClassName} name="company" />
    )

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    cy.render(<EditableField data-cy="BlueBlueBlue" name="company" />)
    const el = cy.getByCy('BlueBlueBlue')

    expect(el.exists()).toBeTruthy()
  })
})

describe('Label', () => {
  test('Renders label', () => {
    cy.render(<EditableField name="company" />)
    const el = cy.get('.EditableField__label')

    expect(el.exists()).toBeTruthy()
  })

  test('The label has the correct "for" attribute based of name', () => {
    cy.render(<EditableField name="company" />)
    const el = cy.get('.EditableField__label')
    const forAttr = el.getAttribute('for')

    expect(forAttr).toContain('company')
  })

  test('Renders text based of "label" prop', () => {
    cy.render(<EditableField name="company" label="Company" />)
    const el = cy.get('.EditableField__labelText')

    expect(el.getText()).toBe('Company')
  })

  test('Renders text if "label" prop not provided using "name"', () => {
    cy.render(<EditableField name="company" />)
    const el = cy.get('.EditableField__labelText')

    expect(el.getText()).toBe('company')
  })
})

describe('InnerRef', () => {
  test('Can retrieve innerRef DOM node', () => {
    const spy = jest.fn()
    const wrapper = mount(<EditableField name="company" innerRef={spy} />)
    const o = wrapper
      .find('.c-EditableField')
      .first()
      .getDOMNode()

    expect(spy).toHaveBeenCalledWith(o)
  })
})

describe('Value', () => {
  test('Value should be empty string if no value passed', () => {
    cy.render(<EditableField name="company" />)

    const input = cy.get('input')

    expect(input.getValue()).toBe('')
  })

  test('Value should be empty string if no value passed, placeholder should be present if passed', () => {
    cy.render(<EditableField name="company" placeholder="Add something" />)

    const input = cy.get('input')

    expect(input.getAttribute('placeholder')).toBe('Add something')
  })

  test('Should assign a given value if passed on props', () => {
    cy.render(<EditableField name="company" value="hello" />)

    const input = cy.get('input')

    expect(input.getValue()).toBe('hello')
  })

  test('Should render as many fields as values are passed', () => {
    cy.render(
      <EditableField name="company" value={['hello', 'goodbye', 'hola']} />
    )

    const input = cy.get('input')

    expect(input.length).toBe(3)
  })

  test('Inputs should have different ids when multiple values are passed', () => {
    cy.render(<EditableField name="company" value={['hello', 'goodbye']} />)

    const input0 = cy.get('input').eq(0)
    const input1 = cy.get('input').eq(1)

    expect(input0.getId() !== input1.getId()).toBeTruthy()
  })

  test('Should update correct value on multivalue fields', () => {
    const wrapper: any = mount(
      <EditableField name="company" value={['hello', 'goodbye', 'hola']} />
    )

    const initialValue = wrapper.state('fieldValue')
    const goodbyeFieldName = initialValue[1].id

    const val = wrapper.instance().assignInputValueToFieldValue({
      inputValue: 'howdy',
      name: goodbyeFieldName,
    })

    expect(val).toEqual([
      expect.objectContaining({ value: 'hello' }),
      expect.objectContaining({ value: 'howdy' }),
      expect.objectContaining({ value: 'hola' }),
    ])

    const val2 = wrapper.instance().assignInputValueToFieldValue({
      inputValue: 'howdy',
      name: 'not there',
    })

    expect(val2).toEqual(initialValue)
  })

  test('handleInputKeyDown enter: commits value', () => {
    const wrapper: any = mount(<EditableField name="company" value="hello" />)
    const initialValue = wrapper.state('fieldValue')
    const name = initialValue[0].id

    wrapper.instance().handleInputKeyDown({
      event: {
        key: 'Enter',
        currentTarget: {
          value: 'howdy',
        },
      },
      name,
    })

    expect(wrapper.state('fieldValue')).toEqual([
      {
        id: name,
        value: 'howdy',
      },
    ])
  })

  test('handleInputKeyDown enter: commits value (with options)', () => {
    const wrapper: any = mount(
      <EditableField
        name="company"
        value={[{ option: 'Work', value: '123456789' }]}
        valueOptions={['Home', 'Work', 'Other']}
      />
    )
    const initialValue = wrapper.state('fieldValue')
    const name = initialValue[0].id

    wrapper.instance().handleInputKeyDown({
      event: {
        key: 'Enter',
        currentTarget: {
          value: 'howdy',
        },
      },
      name,
    })

    expect(wrapper.state('fieldValue')).toEqual([
      {
        id: name,
        option: 'Work',
        value: 'howdy',
      },
    ])
  })

  test('handleInputKeyDown enter: empty value (with options)', () => {
    const wrapper: any = mount(
      <EditableField
        name="company"
        value=""
        valueOptions={['Home', 'Work', 'Other']}
      />
    )
    const initialValue = wrapper.state('fieldValue')
    const name = initialValue[0].id

    wrapper.instance().handleInputKeyDown({
      event: {
        key: 'Enter',
        currentTarget: {
          value: 'howdy',
        },
      },
      name,
    })

    expect(wrapper.state('fieldValue')).toEqual([
      {
        id: name,
        option: 'Home',
        value: 'howdy',
      },
    ])
  })

  test('handleInputKeyDown esc: discards value', () => {
    const wrapper: any = mount(<EditableField name="company" value="hello" />)
    const initialValue = wrapper.state('fieldValue')
    const name = initialValue[0].id

    wrapper.instance().handleInputKeyDown({
      event: {
        key: 'Esc',
        currentTarget: {
          value: 'howdy',
        },
      },
      name,
    })

    expect(wrapper.state('fieldValue')).toEqual(initialValue)
  })

  test('Should render add button when multiple values are passed', () => {
    cy.render(
      <EditableField name="company" value={['hello', 'goodbye', 'hola']} />
    )

    const button = cy.get('.EditableField_addButton')
    expect(button.exists()).toBeTruthy()
  })

  test('should add an input field when clicking the add button', () => {
    cy.render(
      <EditableField name="company" value={['hello', 'goodbye', 'hola']} />
    )

    const button = cy.get('.EditableField_addButton')

    expect(cy.get('input').length).toBe(3)
    button.click()
    expect(cy.get('input').length).toBe(4)
  })

  test('should add an input field when clicking the add button (with options)', () => {
    cy.render(
      <EditableField
        name="company"
        value={[{ option: 'Work', value: '123456789' }]}
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    const button = cy.get('.EditableField_addButton')

    expect(cy.get('input').length).toBe(1)
    button.click()
    expect(cy.get('input').length).toBe(2)
    expect(
      cy
        .get('input')
        .eq(1)
        .value()
    ).toBe('')
  })

  test('should not add input field after button was already clicked', () => {
    cy.render(
      <EditableField name="company" value={['hello', 'goodbye', 'hola']} />
    )

    const button = cy.get('.EditableField_addButton')

    expect(cy.get('input').length).toBe(3)
    button.click()
    expect(cy.get('input').length).toBe(4)
    button.click()
    expect(cy.get('input').length).toBe(4)
  })

  test('should remove an input field when clicking the delete action', () => {
    const spy = jest.fn()

    cy.render(
      <EditableField
        name="company"
        value={['hello', 'goodbye', 'hola']}
        onDelete={spy}
      />
    )

    const button = cy.get('.action-delete').eq(0)

    expect(cy.get('input').length).toBe(3)
    button.click()
    expect(cy.get('input').length).toBe(2)

    // Check that "hello" was removed
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        value: [
          expect.objectContaining({ value: 'goodbye' }),
          expect.objectContaining({ value: 'hola' }),
        ],
      })
    )
  })

  test('should remove an input field when clicking the delete action (with options)', () => {
    const spy = jest.fn()
    cy.render(
      <EditableField
        name="company"
        value={[
          { option: 'Work', value: 'work_phone' },
          { option: 'Home', value: 'home_phone' },
        ]}
        valueOptions={['Home', 'Work', 'Other']}
        defaultOption="Home"
        onDelete={spy}
      />
    )

    const button = cy.get('.action-delete').eq(0)

    expect(cy.get('input').length).toBe(2)
    button.click()
    expect(cy.get('input').length).toBe(1)

    // Check that "work" was removed
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        value: [expect.objectContaining({ value: 'home_phone' })],
      })
    )
  })
})

describe('Options', () => {
  test('render options when passed in', () => {
    cy.render(
      <EditableField
        name="company"
        value={{ option: 'Work', value: '123456789' }}
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    expect(cy.getByCy('DropdownTrigger').exists()).toBeTruthy()

    cy.getByCy('DropdownTrigger').click()

    expect(cy.getByCy('DropdownMenu').exists()).toBe(true)
    expect(cy.getByCy('DropdownItem').length).toBe(3)
  })

  test('Option text should be the one in the value', () => {
    cy.render(
      <EditableField
        name="company"
        value={{ option: 'Work', value: '123456789' }}
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    expect(cy.get('.EditableField__selectedOption').getText()).toBe('Work')
  })

  test('Option text should be the default with empty value', () => {
    cy.render(
      <EditableField
        name="company"
        defaultOption="Other"
        value=""
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    expect(cy.get('.EditableField__selectedOption').getText()).toBe('Other')
  })

  test('Option text should be the default with empty value (obj case)', () => {
    cy.render(
      <EditableField
        name="company"
        defaultOption="Other"
        value={{ value: '123456789' }}
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    expect(cy.get('.EditableField__selectedOption').getText()).toBe('Other')
  })

  test('With no value option text should be the default option passed', () => {
    cy.render(
      <EditableField
        name="company"
        defaultOption="Other"
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    expect(cy.get('.EditableField__selectedOption').getText()).toBe('Other')
  })

  test('With no value option text should be the first in the list', () => {
    cy.render(
      <EditableField name="company" valueOptions={['Home', 'Work', 'Other']} />
    )

    expect(cy.get('.EditableField__selectedOption').getText()).toBe('Home')
  })

  test('With no value option text should be default passed in', () => {
    cy.render(
      <EditableField
        name="company"
        defaultOption="Other"
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    expect(cy.get('.EditableField__selectedOption').getText()).toBe('Other')
  })

  test('Change option text when clicking a dropdown item', () => {
    cy.render(
      <EditableField
        name="company"
        value={{ option: 'Work', value: '123456789' }}
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    expect(cy.getByCy('DropdownTrigger').exists()).toBeTruthy()

    cy.getByCy('DropdownTrigger').click()
    cy.getByCy('DropdownItem')
      .first()
      .click()

    expect(cy.get('.EditableField__selectedOption').getText()).toBe('Home')
  })
})

describe('Static Value', () => {
  test('should render the placeholder if no value present', () => {
    cy.render(<EditableField name="company" placeholder="Add something" />)

    expect(cy.get('.EditableField__staticValue').getText()).toBe(
      'Add something'
    )
  })

  test('should render the value if present', () => {
    cy.render(
      <EditableField name="company" value="hello" placeholder="Add something" />
    )

    expect(cy.get('.EditableField__staticValue').getText()).toBe('hello')
  })

  test('should be on top if field not active', () => {
    cy.render(
      <EditableField name="company" value="hello" placeholder="Add something" />
    )

    expect(
      cy.get('.EditableField__staticContent').getComputedStyle('zIndex')
    ).toBe('2')
  })

  test('should be on bottom if field active', () => {
    cy.render(
      <EditableField name="company" value="hello" placeholder="Add something" />
    )

    const input = cy.get('input')

    input.focus()

    expect(
      cy.get('.EditableField__staticContent').getComputedStyle('zIndex')
    ).toBe('1')
  })

  test('static option', () => {
    cy.render(
      <EditableField
        name="company"
        value={{ option: 'Work', value: '123456789' }}
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    expect(cy.get('.EditableField__staticOption').getText()).toBe('Work:')

    cy.getByCy('DropdownTrigger').click()
    cy.getByCy('DropdownItem')
      .first()
      .click()

    expect(cy.get('.EditableField__staticOption').getText()).toBe('Home:')
  })
})

describe('Actions', () => {
  test('should render delete action by default', () => {
    cy.render(<EditableField name="company" value="hello" />)

    expect(cy.get('.EditableField__actions').exists()).toBeTruthy()
    expect(cy.get('.action-delete').exists()).toBeTruthy()
  })

  test('actions should not be focusable', () => {
    cy.render(<EditableField name="company" value="hello" />)

    expect(cy.get('.action-delete').getAttribute('tabindex')).toBe('-1')
  })

  test('should not render delete action if null passed', () => {
    cy.render(<EditableField name="company" value="hello" actions={null} />)

    expect(cy.get('.action-delete').exists()).toBeFalsy()
  })

  test('should render passed actions in props', () => {
    cy.render(
      <EditableField
        name="company"
        value="hello"
        actions={{
          name: 'link',
        }}
      />
    )

    expect(cy.get('.action-delete').exists()).toBeTruthy()
    expect(cy.get('.action-link').exists()).toBeTruthy()
  })

  test('should render passed actions in props (array)', () => {
    cy.render(
      <EditableField
        name="company"
        value="hello"
        actions={[
          {
            name: 'link',
          },
        ]}
      />
    )

    expect(cy.get('.action-delete').exists()).toBeTruthy()
    expect(cy.get('.action-link').exists()).toBeTruthy()
  })

  test('Custom delete action', () => {
    const deleteSpy = jest.fn()

    cy.render(
      <EditableField
        name="company"
        value="hello"
        actions={{
          name: 'delete',
          callback: deleteSpy,
        }}
      />
    )

    const deleteBtn = cy.get('.action-delete')

    deleteBtn.click()

    expect(deleteSpy).toHaveBeenCalled()
  })

  test('should call callback function in action', () => {
    const spy = jest.fn()

    cy.render(
      <EditableField
        name="company"
        value="hello"
        actions={{
          name: 'something',
          callback: spy,
        }}
      />
    )

    cy.get('.action-something').click()

    expect(spy).toHaveBeenCalled()
  })
})

describe('disabled', () => {
  test('should put disabled attr on input', () => {
    cy.render(
      <EditableField
        name="company"
        value={[{ option: 'Work', value: '123456789' }]}
        valueOptions={['Home', 'Work', 'Other']}
        disabled
      />
    )

    expect(cy.get('input').getAttribute('disabled')).toBeDefined()
  })

  test('should put is-disabled classname', () => {
    const wrapper = cy.render(
      <EditableField
        name="company"
        value={[{ option: 'Work', value: '123456789' }]}
        valueOptions={['Home', 'Work', 'Other']}
        disabled
      />
    )

    expect(wrapper.hasClass('is-disabled')).toBeTruthy()
  })

  test('should not render actions', () => {
    cy.render(
      <EditableField
        name="company"
        value={[{ option: 'Work', value: '123456789' }]}
        valueOptions={['Home', 'Work', 'Other']}
        disabled
      />
    )

    expect(cy.get('.EditableField__actions').exists()).toBeFalsy()
    expect(cy.get('.action-delete').exists()).toBeFalsy()
  })

  test('should not render add button', () => {
    cy.render(
      <EditableField
        name="company"
        value={[{ option: 'Work', value: '123456789' }]}
        valueOptions={['Home', 'Work', 'Other']}
        disabled
      />
    )

    const button = cy.get('.EditableField_addButton')
    expect(button.exists()).toBeFalsy()
  })

  test('dropdown trigger should be disabled', () => {
    cy.render(
      <EditableField
        name="company"
        value={[{ option: 'Work', value: '123456789' }]}
        valueOptions={['Home', 'Work', 'Other']}
        disabled
      />
    )

    expect(cy.getByCy('DropdownTrigger').getAttribute('disabled')).toBeDefined()
  })
})

describe('Label click event', () => {
  test('should mark the state when clicking the label', () => {
    const wrapper = mount(
      <EditableField
        name="company"
        value={[{ option: 'Work', value: '123456789' }]}
        valueOptions={['Home', 'Work', 'Other']}
        disabled
      />
    )
    const label = wrapper.find('.EditableField__label').first()

    label.simulate('click')

    expect(wrapper.state('focusedByLabel')).toBeTruthy()
  })
})

describe('Click outside field', () => {
  test('When document.body is clicked, the field is not active (single)', () => {
    const commitSpy = jest.fn()
    const wrapper: any = mount(
      <EditableField name="company" onCommit={commitSpy} />
    )
    // Make document.activeElement something other than document.body
    wrapper
      .find('input')
      .first()
      .getDOMNode()
      .focus()

    wrapper.setState({
      activeField: 'company_67',
      fieldValue: [{ value: '123', id: 'company_67' }],
    })

    wrapper.instance().handleOnDocumentBodyMouseDown({
      target: document.body,
    })

    expect(wrapper.state('activeField')).toBe('')
    expect(commitSpy).toHaveBeenCalled()
  })

  test('When document.body is clicked, the field is not active (multi, no change)', () => {
    const wrapper: any = mount(<EditableField name="company" />)
    // Make document.activeElement something other than document.body
    wrapper
      .find('input')
      .first()
      .getDOMNode()
      .focus()

    wrapper.setState({
      activeField: 'company_67',
      fieldValue: [
        { value: '123', id: 'company_67' },
        { value: '12345', id: 'company_68' },
      ],
    })

    wrapper.instance().handleOnDocumentBodyMouseDown({
      target: document.body,
    })

    expect(wrapper.state('activeField')).toBe('')
  })

  test('When document.body is clicked, the field is not active (multi, empty value, discard)', () => {
    const discardSpy = jest.fn()
    const wrapper: any = mount(
      <EditableField name="company" onDiscard={discardSpy} />
    )
    // Make document.activeElement something other than document.body
    wrapper
      .find('input')
      .first()
      .getDOMNode()
      .focus()

    wrapper.setState({
      activeField: 'company_67',
      fieldValue: [
        { value: '123', id: 'company_67' },
        { value: '', id: 'company_68' },
      ],
    })

    wrapper.instance().handleOnDocumentBodyMouseDown({
      target: document.body,
    })

    expect(wrapper.state('activeField')).toBe('')
    expect(discardSpy).toHaveBeenCalled()
  })

  test('When document.body is clicked, the field is not active (multi, empty value, discard)', () => {
    const commitSpy = jest.fn()
    const wrapper: any = mount(
      <EditableField name="company" onCommit={commitSpy} />
    )
    // Make document.activeElement something other than document.body
    wrapper
      .find('input')
      .first()
      .getDOMNode()
      .focus()

    wrapper.setState({
      activeField: 'company_67',
      fieldValue: [
        { value: '123', id: 'company_67' },
        { value: '12345', id: 'company_68' },
      ],
    })

    wrapper.instance().handleOnDocumentBodyMouseDown({
      target: document.body,
    })

    expect(wrapper.state('activeField')).toBe('')
    expect(commitSpy).toHaveBeenCalled()
  })

  test('When document.body is clicked, if field is not active return', () => {
    const wrapper: any = mount(<EditableField name="company" />)
    // Make document.activeElement something other than document.body
    wrapper
      .find('input')
      .first()
      .getDOMNode()
      .focus()

    wrapper.setState({ activeField: '' })

    const returnValue = wrapper.instance().handleOnDocumentBodyMouseDown({
      target: document.body,
    })

    expect(wrapper.state('activeField')).toBe('')
    expect(returnValue).toBeUndefined()
  })

  test('When document.body is clicked, if no event return', () => {
    const wrapper: any = mount(<EditableField name="company" />)
    // Make document.activeElement something other than document.body
    wrapper
      .find('input')
      .first()
      .getDOMNode()
      .focus()

    wrapper.setState({ activeField: '' })

    const returnValue = wrapper.instance().handleOnDocumentBodyMouseDown()

    expect(wrapper.state('activeField')).toBe('')
    expect(returnValue).toBeUndefined()
  })
})

describe('Events', () => {
  test('onInputFocus', () => {
    const spy = jest.fn()
    cy.render(<EditableField name="company" onInputFocus={spy} />)

    const input = cy.get('input')

    input.focus()

    expect(spy).toHaveBeenCalled()
  })

  test('onInputBlur', () => {
    const spy = jest.fn()
    cy.render(<EditableField name="company" onInputBlur={spy} />)

    const input = cy.get('input')

    input.focus()
    input.blur()

    expect(spy).toHaveBeenCalled()
  })

  test('onInputChange', () => {
    const inputChangeSpy = jest.fn()
    const changeSpy = jest.fn()

    cy.render(
      <EditableField
        name="company"
        onInputChange={inputChangeSpy}
        onChange={changeSpy}
      />
    )

    const input = cy.get('input')

    input.type('a')

    expect(inputChangeSpy).toHaveBeenCalled()
    expect(changeSpy).toHaveBeenCalled()
  })

  test('onChange', () => {
    const spy = jest.fn()

    cy.render(<EditableField name="company" onChange={spy} />)

    const input = cy.get('input')

    input.type('a')

    expect(spy).toHaveBeenCalled()
  })

  test('onAdd', () => {
    const spy = jest.fn()

    cy.render(
      <EditableField
        name="company"
        value={['hello', 'goodbye', 'hola']}
        onAdd={spy}
      />
    )

    const button = cy.get('.EditableField_addButton')

    button.click()
    expect(spy).toHaveBeenCalled()
  })

  test('Pressing Enter: should commit if value changes', () => {
    const onEnterSpy = jest.fn()
    const onCommitSpy = jest.fn()
    const wrapper = mount(
      <EditableField
        name="company"
        value={{ value: '1234567', id: '1' }}
        onEnter={onEnterSpy}
        onCommit={onCommitSpy}
      />
    )

    const input = wrapper.find('input').first()

    // @ts-ignore
    input.getDOMNode().value = '123'

    input.simulate('keydown', { key: 'Enter' })

    expect(onEnterSpy).toHaveBeenCalled()
    expect(onCommitSpy).toHaveBeenCalled()
  })

  test('Pressing Enter: should not commit if value unchanged', () => {
    const onEnterSpy = jest.fn()
    const onCommitSpy = jest.fn()
    const wrapper = mount(
      <EditableField
        name="company"
        value={{ value: '1234567', id: '1' }}
        onEnter={onEnterSpy}
        onCommit={onCommitSpy}
      />
    )

    const input = wrapper.find('input').first()

    // @ts-ignore
    input.getDOMNode().value = '1234567'

    input.simulate('keydown', { key: 'Enter' })

    expect(onEnterSpy).toHaveBeenCalled()
    expect(onCommitSpy).not.toHaveBeenCalled()
  })

  test('Pressing escape', () => {
    const onEscapeSpy = jest.fn()
    const onDiscardSpy = jest.fn()
    const wrapper = mount(
      <EditableField
        name="company"
        onEscape={onEscapeSpy}
        onDiscard={onDiscardSpy}
      />
    )

    wrapper
      .find('input')
      .first()
      .simulate('keydown', { key: 'Escape' })

    expect(onEscapeSpy).toHaveBeenCalled()
    expect(onDiscardSpy).toHaveBeenCalled()
  })

  test('Delete or clear a value', () => {
    const onDeleteSpy = jest.fn()
    const onCommitSpy = jest.fn()

    cy.render(
      <EditableField
        name="company"
        value="hello"
        onDelete={onDeleteSpy}
        onCommit={onCommitSpy}
      />
    )

    const deleteBtn = cy.get('.action-delete')

    deleteBtn.click()

    expect(onDeleteSpy).toHaveBeenCalled()
    expect(onCommitSpy).toHaveBeenCalled()
  })

  test('Focus option', () => {
    const spy = jest.fn()

    cy.render(
      <EditableField
        name="company"
        value={{ option: 'Work', value: '123456789', id: '1' }}
        valueOptions={['Home', 'Work', 'Other']}
        onOptionFocus={spy}
      />
    )

    cy.getByCy('DropdownTrigger').focus()

    expect(spy).toHaveBeenCalled()
  })

  test('Changing option', () => {
    const onOptionChangeSpy = jest.fn()
    const onChangeSpy = jest.fn()
    const onCommitSpy = jest.fn()

    cy.render(
      <EditableField
        name="company"
        value={{ option: 'Work', value: '123456789' }}
        valueOptions={['Home', 'Work', 'Other']}
        onOptionChange={onOptionChangeSpy}
        onChange={onChangeSpy}
        onCommit={onCommitSpy}
      />
    )
    cy.getByCy('DropdownTrigger').click()
    cy.getByCy('DropdownItem')
      .first()
      .click()

    expect(onOptionChangeSpy).toHaveBeenCalled()
    expect(onChangeSpy).toHaveBeenCalled()
    expect(onCommitSpy).toHaveBeenCalled()
  })
})
