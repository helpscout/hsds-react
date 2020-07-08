import React from 'react'
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

jest.useFakeTimers()

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

  test('email type should have input text type', () => {
    cy.render(<EditableField type="email" name="company" />)
    const el = cy.get('input')

    expect(el.getAttribute('type')).toBe('text')
  })

  test('password type should have input password type', () => {
    cy.render(<EditableField type="password" name="company" />)
    const el = cy.get('input')

    expect(el.getAttribute('type')).toBe('password')
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

describe('ref', () => {
  test('Can retrieve ref DOM node', () => {
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

  test('Should change a given value if passed on props', () => {
    const wrapper = cy.render(<EditableField name="company" value="hello" />)

    expect(cy.get('input').getValue()).toBe('hello')

    wrapper.setProps({ value: 'hola' })

    expect(cy.get('input').getValue()).toBe('hola')
  })

  test('Should assign an empty value if passed empty array on props', () => {
    cy.render(<EditableField name="company" value={[]} />)

    const input = cy.get('input')

    expect(input.getValue()).toBe('')
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
    const wrapper = mount(
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

  test('handleInputKeyPress', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <EditableField name="company" value="hello" onInputKeyPress={spy} />
    )
    const initialValue = wrapper.state('fieldValue')
    const name = initialValue[0].id
    const event = {
      key: 'J',
      currentTarget: {
        value: 'howdy',
      },
    }
    wrapper.instance().handleInputKeyPress({
      event,
      name,
    })
    expect(spy).toHaveBeenCalledWith({ event, name, value: initialValue })
  })

  test('handleInputKeyUp', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <EditableField name="company" value="hello" onInputKeyUp={spy} />
    )
    const initialValue = wrapper.state('fieldValue')
    const name = initialValue[0].id
    const event = {
      key: 'J',
      currentTarget: {
        value: 'howdy',
      },
    }
    wrapper.instance().handleInputKeyUp({
      event,
      name,
    })
    expect(spy).toHaveBeenCalledWith({ event, name, value: initialValue })
  })

  test('handleInputKeyDown', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <EditableField name="company" value="hello" onInputKeyDown={spy} />
    )
    const initialValue = wrapper.state('fieldValue')
    const name = initialValue[0].id
    const event = {
      key: 'J',
      currentTarget: {
        value: 'howdy',
      },
    }
    wrapper.instance().handleInputKeyDown({
      event,
      name,
    })
    expect(spy).toHaveBeenCalledWith({ event, name, value: initialValue })
  })

  test('handleInputKeyDown enter: commits value', done => {
    const wrapper = mount(<EditableField name="company" value="hello" />)
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

    const f = flushPromises()
    jest.runAllTimers()

    f.then(() => {
      wrapper.update()

      expect(wrapper.state('fieldValue')).toEqual([
        {
          id: name,
          value: 'howdy',
          validated: true,
        },
      ])
      done()
    }).catch(done)
  })

  test('handleInputKeyDown enter: commits value (with options)', done => {
    const wrapper = mount(
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

    const f = flushPromises()
    jest.runAllTimers()

    f.then(() => {
      wrapper.update()

      expect(wrapper.state('fieldValue')).toEqual([
        {
          id: name,
          option: 'Work',
          value: 'howdy',
          validated: true,
        },
      ])
      done()
    }).catch(done)
  })

  test('handleInputKeyDown enter: empty value (with options)', done => {
    const wrapper = mount(
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

    const f = flushPromises()
    jest.runAllTimers()

    f.then(() => {
      wrapper.update()

      expect(wrapper.state('fieldValue')).toEqual([
        {
          id: name,
          option: 'Home',
          value: 'howdy',
          validated: true,
        },
      ])
      done()
    }).catch(done)
  })

  test('handleInputKeyDown esc: discards value', () => {
    const wrapper = mount(<EditableField name="company" value="hello" />)
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
    expect(cy.get('input').eq(1).value()).toBe('')
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
    cy.getByCy('DropdownItem').first().click()

    expect(cy.get(`.${INPUT_CLASSNAMES.selectedOption}`).getText()).toBe('Home')
  })

  test('Should change a given value if passed on props with options', () => {
    const wrapper = cy.render(
      <EditableField
        name="company"
        value={{ option: 'Work', value: '11111', id: '001' }}
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    expect(cy.get(`.${INPUT_CLASSNAMES.selectedOption}`).getText()).toBe('Work')

    wrapper.setProps({ value: { option: 'Home', value: '888888', id: '001' } })

    expect(cy.get(`.${INPUT_CLASSNAMES.selectedOption}`).getText()).toBe('Home')
  })

  test('Should change a given value if passed on props with options (default option)', () => {
    const wrapper = cy.render(
      <EditableField
        name="company"
        defaultOption="Other"
        value={{ value: '11111', id: '001' }}
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    expect(cy.get(`.${INPUT_CLASSNAMES.selectedOption}`).getText()).toBe(
      'Other'
    )

    wrapper.setProps({ value: { option: 'Home', value: '888888', id: '001' } })

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
    cy.getByCy('DropdownItem').first().click()

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

    wrapper.find('input').first().simulate('keydown', { key: 'Escape' })

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

  test('Blur option', () => {
    const spy = jest.fn()

    cy.render(
      <EditableField
        name="company"
        value={{ option: 'Work', value: '123456789', id: '1' }}
        valueOptions={['Home', 'Work', 'Other']}
        onOptionBlur={spy}
      />
    )

    cy.getByCy('DropdownTrigger').focus()
    cy.getByCy('DropdownTrigger').blur()

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
    cy.getByCy('DropdownItem').first().click()

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

    input.getDOMNode().value = '1234567'

    input.simulate('keydown', { key: 'Enter' })

    expect(onEnterSpy).toHaveBeenCalled()
    expect(onCommitSpy).not.toHaveBeenCalled()
  })

  test('Pressing Enter: should not commit if value invalid', done => {
    const onEnterSpy = jest.fn()
    const onCommitSpy = jest.fn()
    const wrapper = mount(
      <EditableField
        name="company"
        value={{ value: '1234567', id: '1' }}
        onEnter={onEnterSpy}
        onCommit={onCommitSpy}
        validate={({ name, value }) =>
          Promise.resolve({
            isValid: false,
            name,
            value,
            type: 'error',
            message: 'That is definitely not right',
          })
        }
      />
    )

    const input = wrapper.find('input').first()

    input.getDOMNode().value = '8888'

    input.simulate('keydown', { key: 'Enter' })

    const f = flushPromises()
    jest.runAllTimers()

    f.then(() => {
      expect(onEnterSpy).toHaveBeenCalled()
      expect(onCommitSpy).not.toHaveBeenCalled()
      done()
    }).catch(done)
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

    input.getDOMNode().value = '123'
    input.simulate('keydown', { key: 'Enter' })

    flushPromises().then(() => {
      wrapper.update()

      expect(onEnterSpy).toHaveBeenCalled()
      expect(onCommitSpy).toHaveBeenCalled()
    })
  })

  test('Pressing Enter: should update props on validation resolved', done => {
    const wrapper = mount(
      <EditableField
        name="company"
        value={{ value: '123456', id: '1' }}
        validate={({ name, value }) =>
          Promise.resolve({
            isValid: true,
            name: 'company',
            type: 'default',
            updatedProps: { _id: 7 },
            value: '123',
          })
        }
      />
    )
    const input = wrapper.find('input').first()

    input.getDOMNode().value = '123'
    input.simulate('keydown', { key: 'Enter' })

    const f = flushPromises()
    jest.runAllTimers()

    f.then(() => {
      expect(wrapper.state('fieldValue')).toEqual([
        {
          _id: 7,
          id: '1',
          validated: true,
          value: '123',
        },
      ])
      done()
    }).catch(done)
  })

  test('Pressing Enter: should update props on validation resolved', () => {
    const wrapper = mount(
      <EditableField
        name="company"
        value={{ value: '123456', id: '1' }}
        validate={({ name, value }) =>
          Promise.resolve({
            isValid: true,
            name: 'company',
            type: 'default',
            updatedProps: { _id: 7 },
            value: '123',
          })
        }
      />
    )
    const input = wrapper.find('input').first()

    input.getDOMNode().value = '123'
    input.simulate('keydown', { key: 'Enter' })

    const f = flushPromises()
    jest.runAllTimers()

    f.then(() => {
      expect(wrapper.state('value')).toEqual('123')
      expect(wrapper.state('_id')).toEqual(7)
    })
  })
})

describe('should component update', () => {
  test('value', () => {
    const wrapper = mount(<EditableField name="greeting" value="hello" />)
    const actualProps = wrapper.props()
    const actualState = wrapper.state()
    const newPropsSame = {
      ...actualProps,
      value: 'hello',
    }
    const newPropsChanged = {
      ...actualProps,
      value: 'hola',
    }

    expect(
      wrapper.instance().shouldComponentUpdate(newPropsSame, actualState)
    ).toBeFalsy()

    expect(
      wrapper.instance().shouldComponentUpdate(newPropsChanged, actualState)
    ).toBeTruthy()
  })

  test('fieldValue', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const wrapper = mount(<EditableField name="greeting" value={val} />)
    const actualProps = wrapper.props()
    const actualState = wrapper.state()
    const newStateSame = {
      ...actualState,
    }
    const newStateChanged = {
      fieldValue: [],
    }

    expect(
      wrapper.instance().shouldComponentUpdate(actualProps, newStateSame)
    ).toBeFalsy()

    expect(
      wrapper.instance().shouldComponentUpdate(actualProps, newStateChanged)
    ).toBeTruthy()
  })

  test('disabled', () => {
    const wrapper = mount(
      <EditableField name="greeting" value="hello" disabled />
    )
    const actualProps = wrapper.props()
    const actualState = wrapper.state()
    const newPropsSame = {
      ...actualProps,
    }
    const newPropsChanged = {
      ...actualProps,
      disabled: false,
    }

    expect(
      wrapper.instance().shouldComponentUpdate(newPropsSame, actualState)
    ).toBeFalsy()

    expect(
      wrapper.instance().shouldComponentUpdate(newPropsChanged, actualState)
    ).toBeTruthy()
  })

  test('activeField', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const wrapper = mount(<EditableField name="greeting" value={val} />)
    const actualProps = wrapper.props()
    const actualState = wrapper.state()
    const newStateSame = {
      ...actualState,
    }
    const newStateChanged = {
      activeField: 'something',
    }

    expect(
      wrapper.instance().shouldComponentUpdate(actualProps, newStateSame)
    ).toBeFalsy()

    expect(
      wrapper.instance().shouldComponentUpdate(actualProps, newStateChanged)
    ).toBeTruthy()
  })

  test('mask tab index', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const wrapper = mount(<EditableField name="greeting" value={val} />)
    const actualProps = wrapper.props()
    const actualState = wrapper.state()
    const newStateSame = {
      ...actualState,
    }
    const newStateChanged = {
      maskTabIndex: 'something',
    }

    expect(
      wrapper.instance().shouldComponentUpdate(actualProps, newStateSame)
    ).toBeFalsy()

    expect(
      wrapper.instance().shouldComponentUpdate(actualProps, newStateChanged)
    ).toBeTruthy()
  })

  test('disabledItem', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const wrapper = mount(<EditableField name="greeting" value={val} />)
    const actualProps = wrapper.props()
    const actualState = wrapper.state()
    const newStateSame = {
      ...actualState,
    }
    const newStateChanged = {
      disabledItem: ['something'],
    }

    expect(
      wrapper.instance().shouldComponentUpdate(actualProps, newStateSame)
    ).toBeFalsy()

    expect(
      wrapper.instance().shouldComponentUpdate(actualProps, newStateChanged)
    ).toBeTruthy()
  })

  test('validationInfo', () => {
    const validationInfo = {
      isValid: false,
      name: 'email',
      value: 'hello',
      type: 'error',
    }
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const wrapper = mount(<EditableField name="greeting" value={val} />)
    const actualProps = wrapper.props()
    const actualState = wrapper.state()
    const newStateSame = {
      ...actualState,
    }
    const newStateChanged = {
      validationInfo,
    }

    expect(
      wrapper.instance().shouldComponentUpdate(actualProps, newStateSame)
    ).toBeFalsy()

    expect(
      wrapper.instance().shouldComponentUpdate(actualProps, newStateChanged)
    ).toBeTruthy()
  })
})

describe('Input Blur', () => {
  test('If unchanged, it should deactivate the field and leave as', () => {
    const blurSpy = jest.fn()

    cy.render(
      <EditableField name="company" value="hello" onInputBlur={blurSpy} />
    )

    cy.get('input').focus()

    expect(cy.get(`.${STATES_CLASSNAMES.isActive}`).exists()).toBeTruthy()

    cy.get('input').clear()
    cy.get('input').type('hello')
    cy.get('input').blur()

    expect(cy.get('input').getValue()).toBe('hello')
    expect(cy.get(`.${STATES_CLASSNAMES.isActive}`).exists()).toBeFalsy()
    expect(blurSpy).toHaveBeenCalled()
  })

  test('If value cleared in single value case, it should deactivate the field and leave as', done => {
    const commitSpy = jest.fn()
    const blurSpy = jest.fn()

    cy.render(
      <EditableField
        name="company"
        value="hello"
        onCommit={commitSpy}
        onInputBlur={blurSpy}
      />
    )

    cy.get('input').focus()

    expect(cy.get(`.${STATES_CLASSNAMES.isActive}`).exists()).toBeTruthy()

    cy.get('input').type('')
    cy.get('input').blur()

    const f = flushPromises()
    jest.runAllTimers()

    f.then(() => {
      expect(cy.get(`.${STATES_CLASSNAMES.isActive}`).exists()).toBeFalsy()
      expect(commitSpy).toHaveBeenCalled()
      expect(blurSpy).toHaveBeenCalled()
      done()
    }).catch(done)
  })

  test('If value cleared in multivalue, it should deactivate the field and remove', done => {
    const commitSpy = jest.fn()
    const blurSpy = jest.fn()
    const discardSpy = jest.fn()

    cy.render(
      <EditableField
        name="company"
        value={['hello', 'hola']}
        onCommit={commitSpy}
        onInputBlur={blurSpy}
        onDiscard={discardSpy}
      />
    )

    cy.get('input').first().focus()

    expect(cy.get(`.${STATES_CLASSNAMES.isActive}`).exists()).toBeTruthy()
    expect(cy.get('input').length).toBe(2)

    cy.get('input').first().type('')
    cy.get('input').first().blur()

    const f = flushPromises()
    jest.runAllTimers()

    f.then(() => {
      expect(cy.get(`.${STATES_CLASSNAMES.isActive}`).exists()).toBeFalsy()
      expect(cy.get('input').length).toBe(1)
      expect(commitSpy).toHaveBeenCalled()
      expect(blurSpy).toHaveBeenCalled()
      expect(discardSpy).toHaveBeenCalled()
      done()
    }).catch(done)
  })

  test('If value cleared in multivalue, it should not remove the only field left', done => {
    const commitSpy = jest.fn()
    const blurSpy = jest.fn()
    const discardSpy = jest.fn()

    cy.render(
      <EditableField
        name="company"
        value={['hello']}
        onCommit={commitSpy}
        onInputBlur={blurSpy}
        onDiscard={discardSpy}
      />
    )

    cy.get('input').first().focus()

    expect(cy.get(`.${STATES_CLASSNAMES.isActive}`).exists()).toBeTruthy()
    expect(cy.get('input').length).toBe(1)

    cy.get('input').first().type('')
    cy.get('input').first().blur()

    const f = flushPromises()
    jest.runAllTimers()

    f.then(() => {
      expect(cy.get(`.${STATES_CLASSNAMES.isActive}`).exists()).toBeFalsy()
      expect(cy.get('input').length).toBe(1)
      expect(commitSpy).toHaveBeenCalled()
      expect(blurSpy).toHaveBeenCalled()
      done()
    }).catch(done)
  })

  test('If value changed and valid, it should commit', done => {
    const commitSpy = jest.fn()
    const blurSpy = jest.fn()

    cy.render(
      <EditableField
        name="company"
        value="hello"
        onCommit={commitSpy}
        onInputBlur={blurSpy}
      />
    )

    cy.get('input').focus()

    expect(cy.get(`.${STATES_CLASSNAMES.isActive}`).exists()).toBeTruthy()

    cy.get('input').type('hola')
    cy.get('input').blur()

    const f = flushPromises()
    jest.runAllTimers()

    f.then(() => {
      expect(cy.get('input').getValue()).toBe('hola')
      expect(cy.get(`.${STATES_CLASSNAMES.isActive}`).exists()).toBeFalsy()
      expect(commitSpy).toHaveBeenCalled()
      expect(blurSpy).toHaveBeenCalled()
      done()
    }).catch(done)
  })

  test('If value changed and invalid, it should not commit', done => {
    const commitSpy = jest.fn()
    const blurSpy = jest.fn()

    cy.render(
      <EditableField
        name="company"
        value="hello"
        onCommit={commitSpy}
        onInputBlur={blurSpy}
        validate={({ name, value }) =>
          Promise.resolve({
            isValid: false,
            name,
            value,
            type: 'error',
            message: 'That is definitely not right',
          })
        }
      />
    )

    cy.get('input').focus()

    expect(cy.get(`.${STATES_CLASSNAMES.isActive}`).exists()).toBeTruthy()

    cy.get('input').type('hola')
    cy.get('input').blur()

    const f = flushPromises()
    jest.runAllTimers()

    f.then(() => {
      expect(cy.get('input').getValue()).toBe('hola')
      expect(commitSpy).not.toHaveBeenCalled()
      expect(blurSpy).toHaveBeenCalled()
      done()
    }).catch(done)
  })

  test('Input blur: should update props on validation resolved', done => {
    const wrapper = mount(
      <EditableField
        name="company"
        value={{ value: '', id: '1' }}
        validate={() => {
          return Promise.resolve({
            isValid: true,
            name: 'company',
            type: 'default',
            updatedProps: { _id: 7 },
            value: '1234567',
          })
        }}
      />
    )
    const input = wrapper.find('input').first()
    input.simulate('focus')

    wrapper.instance().handleInputChange({ name: '1', inputValue: '1234567' })

    input.simulate('blur')
    const f = flushPromises()
    jest.runAllTimers()
    f.then(() => {
      expect(wrapper.state('fieldValue')).toEqual([
        {
          _id: 7,
          id: '1',
          validated: true,
          value: '1234567',
        },
      ])
      done()
    }).catch(done)
  })
})

describe('floating labels', () => {
  test('Adds the floating labels className', () => {
    const wrapper = cy.render(<EditableField name="company" floatingLabels />)

    expect(wrapper.hasClass(STATES_CLASSNAMES.withFloatingLabels)).toBeTruthy()
  })

  test('Label is hidden when floating labels on', () => {
    cy.render(<EditableField name="company" floatingLabels />)

    const el = cy.get(`.${EDITABLEFIELD_CLASSNAMES.label}`)

    expect(el.exists()).toBeFalsy()
  })
})
