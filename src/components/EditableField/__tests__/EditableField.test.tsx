import * as React from 'react'
import { cy } from '@helpscout/cyan'
import { mount } from 'enzyme'
import { EditableField } from '../EditableField'
import {
  ACTIONS_CLASSNAMES,
  EDITABLEFIELD_CLASSNAMES,
  INPUT_CLASSNAMES,
  MASK_CLASSNAMES,
  STATES_CLASSNAMES,
} from '../EditableField.utils'

const flushPromises = () => new Promise(setImmediate)

cy.useFakeTimers()

describe('className', () => {
  test('Has default className', () => {
    const wrapper = cy.render(<EditableField name="company" />)

    expect(wrapper.hasClass(EDITABLEFIELD_CLASSNAMES.component)).toBeTruthy()
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
    const el = cy.get(`.${EDITABLEFIELD_CLASSNAMES.label}`)

    expect(el.exists()).toBeTruthy()
  })

  test('The label has the correct "for" attribute based of name', () => {
    cy.render(<EditableField name="company" />)
    const el = cy.get(`.${EDITABLEFIELD_CLASSNAMES.label}`)
    const forAttr = el.getAttribute('for')

    expect(forAttr).toContain('company')
  })

  test('Renders text based of "label" prop', () => {
    cy.render(<EditableField name="company" label="Company" />)
    const el = cy.get(`.${EDITABLEFIELD_CLASSNAMES.labelText}`)

    expect(el.getText()).toBe('Company')
  })

  test('Renders text if "label" prop not provided using "name"', () => {
    cy.render(<EditableField name="company" />)
    const el = cy.get(`.${EDITABLEFIELD_CLASSNAMES.labelText}`)

    expect(el.getText()).toBe('company')
  })
})

describe('InnerRef', () => {
  test('Can retrieve innerRef DOM node', () => {
    const spy = jest.fn()
    const wrapper = mount(<EditableField name="company" innerRef={spy} />)
    const o = wrapper
      .find(`.${EDITABLEFIELD_CLASSNAMES.component}`)
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

  test('handleInputKeyDown enter: commits value', async () => {
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

    await flushPromises()
    wrapper.update()

    expect(wrapper.state('fieldValue')).toEqual([
      {
        id: name,
        value: 'howdy',
        disabled: false,
        validated: true,
      },
    ])
  })

  test('handleInputKeyDown enter: commits value (with options)', async () => {
    const wrapper: any = mount(
      <EditableField
        name="company"
        value={[{ option: 'Work', value: '123456789', id: '' }]}
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

    await flushPromises()
    wrapper.update()

    expect(wrapper.state('fieldValue')).toEqual([
      {
        id: name,
        option: 'Work',
        value: 'howdy',
        disabled: false,
        validated: true,
      },
    ])
  })

  test('handleInputKeyDown enter: empty value (with options)', async () => {
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

    await flushPromises()
    wrapper.update()

    expect(wrapper.state('fieldValue')).toEqual([
      {
        id: name,
        option: 'Home',
        value: 'howdy',
        disabled: false,
        validated: true,
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

    const button = cy.get(`.${EDITABLEFIELD_CLASSNAMES.addButton}`)
    expect(button.exists()).toBeTruthy()
  })

  test('should add an input field when clicking the add button', () => {
    cy.render(
      <EditableField name="company" value={['hello', 'goodbye', 'hola']} />
    )

    const button = cy.get(`.${EDITABLEFIELD_CLASSNAMES.addButton}`)

    expect(cy.get('input').length).toBe(3)
    button.click()
    expect(cy.get('input').length).toBe(4)
  })

  test('should add an input field when clicking the add button (with options)', () => {
    cy.render(
      <EditableField
        name="company"
        value={[{ option: 'Work', value: '123456789', id: '' }]}
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    const button = cy.get(`.${EDITABLEFIELD_CLASSNAMES.addButton}`)

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

    const button = cy.get(`.${EDITABLEFIELD_CLASSNAMES.addButton}`)

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
          { option: 'Work', value: 'work_phone', id: '' },
          { option: 'Home', value: 'home_phone', id: '' },
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
        value={{ option: 'Work', value: '123456789', id: '' }}
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
        value={{ option: 'Work', value: '123456789', id: '' }}
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    expect(cy.get(`.${INPUT_CLASSNAMES.selectedOption}`).getText()).toBe('Work')
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

    expect(cy.get(`.${INPUT_CLASSNAMES.selectedOption}`).getText()).toBe(
      'Other'
    )
  })

  test('Option text should be the default with empty value (obj case)', () => {
    cy.render(
      <EditableField
        name="company"
        defaultOption="Other"
        value={{ value: '123456789', id: '' }}
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    expect(cy.get(`.${INPUT_CLASSNAMES.selectedOption}`).getText()).toBe(
      'Other'
    )
  })

  test('With no value option text should be the default option passed', () => {
    cy.render(
      <EditableField
        name="company"
        defaultOption="Other"
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    expect(cy.get(`.${INPUT_CLASSNAMES.selectedOption}`).getText()).toBe(
      'Other'
    )
  })

  test('With no value option text should be the first in the list', () => {
    cy.render(
      <EditableField name="company" valueOptions={['Home', 'Work', 'Other']} />
    )

    expect(cy.get(`.${INPUT_CLASSNAMES.selectedOption}`).getText()).toBe('Home')
  })

  test('With no value option text should be default passed in', () => {
    cy.render(
      <EditableField
        name="company"
        defaultOption="Other"
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    expect(cy.get(`.${INPUT_CLASSNAMES.selectedOption}`).getText()).toBe(
      'Other'
    )
  })

  test('Change option text when clicking a dropdown item', () => {
    cy.render(
      <EditableField
        name="company"
        value={{ option: 'Work', value: '123456789', id: '' }}
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    expect(cy.getByCy('DropdownTrigger').exists()).toBeTruthy()

    cy.getByCy('DropdownTrigger').click()
    cy.getByCy('DropdownItem')
      .first()
      .click()

    expect(cy.get(`.${INPUT_CLASSNAMES.selectedOption}`).getText()).toBe('Home')
  })
})

describe('Static Value', () => {
  test('should render the placeholder if no value present', () => {
    cy.render(<EditableField name="company" placeholder="Add something" />)

    expect(cy.get(`.${MASK_CLASSNAMES.value}`).getText()).toBe('Add something')
  })

  test('should render the value if present', () => {
    cy.render(
      <EditableField name="company" value="hello" placeholder="Add something" />
    )

    expect(cy.get(`.${MASK_CLASSNAMES.value}`).getText()).toBe('hello')
  })

  test('should emphasize the value if emphasizeTopValue and multivalue enabled', () => {
    cy.render(
      <EditableField
        name="company"
        value={['hello', 'hola']}
        placeholder="Add something"
        emphasizeTopValue
      />
    )

    expect(cy.get('.is-emphasized').exists()).toBeTruthy()
    expect(cy.get('.is-emphasized').getText()).toBe('hello')
    expect(
      cy.get(`.${MASK_CLASSNAMES.value}`).getComputedStyle('fontWeight')
    ).toBe('500')
  })

  test('should be on top if field not active', () => {
    cy.render(
      <EditableField name="company" value="hello" placeholder="Add something" />
    )

    expect(
      cy.get(`.${MASK_CLASSNAMES.component}`).getComputedStyle('zIndex')
    ).toBe('2')
  })

  test('should be on bottom if field active', () => {
    cy.render(
      <EditableField name="company" value="hello" placeholder="Add something" />
    )

    const input = cy.get('input')

    input.focus()

    expect(
      cy.get(`.${MASK_CLASSNAMES.component}`).getComputedStyle('zIndex')
    ).toBe('1')
  })

  test('static option', () => {
    cy.render(
      <EditableField
        name="company"
        value={{ option: 'Work', value: '123456789', id: '' }}
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    expect(cy.get(`.${MASK_CLASSNAMES.option}`).getText()).toBe('Work')

    cy.getByCy('DropdownTrigger').click()
    cy.getByCy('DropdownItem')
      .first()
      .click()

    expect(cy.get(`.${MASK_CLASSNAMES.option}`).getText()).toBe('Home')
  })
})

describe('Actions', () => {
  test('should render delete action by default', () => {
    cy.render(<EditableField name="company" value="hello" />)

    expect(cy.get(`.${ACTIONS_CLASSNAMES.actions}`).exists()).toBeTruthy()
    expect(cy.get('.action-delete').exists()).toBeTruthy()
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
        value={[{ option: 'Work', value: '123456789', id: '' }]}
        valueOptions={['Home', 'Work', 'Other']}
        disabled
      />
    )

    expect(cy.get('input').getAttribute('disabled')).toBeDefined()
  })

  test('should put disabled classname', () => {
    const wrapper = cy.render(
      <EditableField
        name="company"
        value={[{ option: 'Work', value: '123456789', id: '' }]}
        valueOptions={['Home', 'Work', 'Other']}
        disabled
      />
    )

    expect(wrapper.hasClass(STATES_CLASSNAMES.fieldDisabled)).toBeTruthy()
  })

  test('should not render actions', () => {
    cy.render(
      <EditableField
        name="company"
        value={[{ option: 'Work', value: '123456789', id: '' }]}
        valueOptions={['Home', 'Work', 'Other']}
        disabled
      />
    )

    expect(cy.get(`.${ACTIONS_CLASSNAMES.actions}`).exists()).toBeFalsy()
    expect(cy.get('.action-delete').exists()).toBeFalsy()
  })

  test('should not render add button', () => {
    cy.render(
      <EditableField
        name="company"
        value={[{ option: 'Work', value: '123456789', id: '' }]}
        valueOptions={['Home', 'Work', 'Other']}
        disabled
      />
    )

    const button = cy.get(`.${EDITABLEFIELD_CLASSNAMES.addButton}`)
    expect(button.exists()).toBeFalsy()
  })

  test('dropdown trigger should be disabled', () => {
    cy.render(
      <EditableField
        name="company"
        value={[{ option: 'Work', value: '123456789', id: '' }]}
        valueOptions={['Home', 'Work', 'Other']}
        disabled
      />
    )

    expect(cy.getByCy('DropdownTrigger').getAttribute('disabled')).toBeDefined()
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

    const button = cy.get(`.${EDITABLEFIELD_CLASSNAMES.addButton}`)

    button.click()
    expect(spy).toHaveBeenCalled()
  })

  test('onAdd: empty', () => {
    const spy = jest.fn()

    cy.render(
      <EditableField
        name="company"
        value={[
          { id: 'hh_0', value: 'dd' },
          { id: 'hh_1', value: 'fff' },
          { id: 'hh_2', value: '' },
        ]}
        onAdd={spy}
      />
    )

    const button = cy.get(`.${EDITABLEFIELD_CLASSNAMES.addButton}`)

    button.click()
    expect(spy).not.toHaveBeenCalled()
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
        value={{ option: 'Work', value: '123456789', id: '' }}
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

describe('enter press', () => {
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

  test('Pressing Enter: should not commit if value empty', () => {
    const onEnterSpy = jest.fn()
    const onCommitSpy = jest.fn()
    const wrapper = mount(
      <EditableField
        name="company"
        multipleValues
        value="hello"
        onEnter={onEnterSpy}
        onCommit={onCommitSpy}
      />
    )

    const input = wrapper.find('input').first()

    // @ts-ignore
    input.getDOMNode().value = ''

    input.simulate('keydown', { key: 'Enter' })

    expect(onCommitSpy).not.toHaveBeenCalled()
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

    flushPromises().then(() => {
      // @ts-ignore
      input.getDOMNode().value = '123'

      input.simulate('keydown', { key: 'Enter' })

      wrapper.update()

      expect(onEnterSpy).toHaveBeenCalled()
      expect(onCommitSpy).toHaveBeenCalled()
    })
  })
})
