import React from 'react'
import { mount } from 'enzyme'
import { render, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
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

describe('HTML props', () => {
  test('email type should have input text type', () => {
    const { getByLabelText } = render(
      <EditableField type="email" name="company" />
    )

    expect(getByLabelText('company').getAttribute('type')).toBe('text')
  })

  test('password type should have input password type', () => {
    const { getByLabelText } = render(
      <EditableField type="password" name="company" />
    )

    expect(getByLabelText('company').getAttribute('type')).toBe('password')
  })
})

describe('Label', () => {
  test('Renders label', () => {
    const { getByLabelText } = render(<EditableField name="company" />)

    expect(getByLabelText('company')).toBeInTheDocument()
  })

  test('Renders text based of "label" prop', () => {
    const { getByLabelText } = render(
      <EditableField name="company" label="Company" />
    )

    expect(getByLabelText('Company')).toBeInTheDocument()
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
    const { getByLabelText } = render(<EditableField name="company" />)

    expect(getByLabelText('company').value).toBe('')
  })

  test('Value should be empty string if no value passed, placeholder should be present if passed', () => {
    const { getByPlaceholderText } = render(
      <EditableField name="company" placeholder="Add something" />
    )

    expect(getByPlaceholderText('Add something')).toBeInTheDocument()
  })

  test('Should assign a given value if passed on props', () => {
    const { getByLabelText } = render(
      <EditableField name="company" value="hello" />
    )

    expect(getByLabelText('company').value).toBe('hello')
  })

  test('Should change a given value if passed on props', () => {
    const { getByLabelText, rerender } = render(
      <EditableField name="company" value="hello" />
    )

    expect(getByLabelText('company').value).toBe('hello')

    rerender(<EditableField name="company" value="hola" />)

    expect(getByLabelText('company').value).toBe('hola')
  })

  test('Should assign an empty value if passed empty array on props', () => {
    const { getByLabelText } = render(
      <EditableField name="company" value={[]} />
    )

    expect(getByLabelText('company').value).toBe('')
  })

  test('Should render as many fields as values are passed', () => {
    const { container } = render(
      <EditableField name="company" value={['hello', 'goodbye', 'hola']} />
    )

    const input = container.querySelectorAll('input')

    expect(input.length).toBe(3)
  })

  test('Inputs should have different ids when multiple values are passed', () => {
    const { container } = render(
      <EditableField name="company" value={['hello', 'goodbye']} />
    )

    const input0 = container.querySelectorAll('input')[0]
    const input1 = container.querySelectorAll('input')[1]

    expect(input0.id !== input1.id).toBeTruthy()
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

  test('Should render add button when multiple values are passed', () => {
    const { container } = render(
      <EditableField name="company" value={['hello', 'goodbye', 'hola']} />
    )

    expect(
      container.querySelector('button.EditableField__addButton')
    ).toBeInTheDocument()
  })

  test('Should render add button when with custom props', () => {
    const { container } = render(
      <EditableField
        name="company"
        value={['hello', 'goodbye', 'hola']}
        addButtonProps={{ 'aria-label': 'my-label', className: 'custom-class' }}
      />
    )

    expect(
      container.querySelector('button.EditableField__addButton')
    ).toHaveAttribute('aria-label')
    expect(
      container.querySelector('button.EditableField__addButton')
    ).toHaveClass('custom-class')
  })

  test('should add an input field when clicking the add button', async () => {
    const { container } = render(
      <EditableField name="company" value={['hello', 'goodbye', 'hola']} />
    )

    const button = container.querySelector(
      `.${EDITABLEFIELD_CLASSNAMES.addButton}`
    )

    expect(container.querySelectorAll('input').length).toBe(3)
    user.click(button)

    await waitFor(() => {
      expect(container.querySelectorAll('input').length).toBe(4)
    })
  })

  test('should fire custom onclick if passed on the add button', async () => {
    const onClickSpy = jest.fn()
    const { container } = render(
      <EditableField
        name="company"
        value={['hello', 'goodbye', 'hola']}
        addButtonProps={{ onClick: onClickSpy }}
      />
    )

    const button = container.querySelector(
      `.${EDITABLEFIELD_CLASSNAMES.addButton}`
    )

    expect(container.querySelectorAll('input').length).toBe(3)
    user.click(button)

    await waitFor(() => {
      expect(container.querySelectorAll('input').length).toBe(4)
      expect(onClickSpy).toHaveBeenCalled()
    })
  })

  test('should add an input field when clicking the add button (with options)', async () => {
    const { container } = render(
      <EditableField
        name="company"
        value={[{ option: 'Work', value: '123456789', id: '' }]}
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    const button = container.querySelector(
      `.${EDITABLEFIELD_CLASSNAMES.addButton}`
    )

    expect(container.querySelectorAll('input').length).toBe(1)

    user.click(button)

    await waitFor(() => {
      expect(container.querySelectorAll('input').length).toBe(2)
      expect(container.querySelectorAll('input')[1].value).toBe('')
    })
  })

  test('should not add input field after button was already clicked', async () => {
    const { container } = render(
      <EditableField name="company" value={['hello', 'goodbye', 'hola']} />
    )

    const button = container.querySelector(
      `.${EDITABLEFIELD_CLASSNAMES.addButton}`
    )

    expect(container.querySelectorAll('input').length).toBe(3)

    user.click(button)

    await waitFor(() => {
      expect(container.querySelectorAll('input').length).toBe(4)
    })

    user.click(button)

    await waitFor(() => {
      expect(container.querySelectorAll('input').length).toBe(4)
    })
  })

  test('should remove an input field when clicking the delete action', async () => {
    const spy = jest.fn()

    const { container } = render(
      <EditableField
        name="company"
        value={['hello', 'goodbye', 'hola']}
        onDelete={spy}
      />
    )

    const button = container.querySelectorAll('.action-delete')[0]

    expect(container.querySelectorAll('input').length).toBe(3)

    user.click(button)

    await waitFor(() => {
      expect(container.querySelectorAll('input').length).toBe(2)

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
  })

  test('should remove an input field when clicking the delete action (with options)', async () => {
    const spy = jest.fn()

    const { container } = render(
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

    const button = container.querySelectorAll('.action-delete')[0]

    expect(container.querySelectorAll('input').length).toBe(2)

    user.click(button)

    await waitFor(() => {
      expect(container.querySelectorAll('input').length).toBe(1)

      // Check that "work" was removed
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          value: [expect.objectContaining({ value: 'home_phone' })],
        })
      )
    })
  })
})

describe('Options', () => {
  test('render options when passed in', async () => {
    const { container, getAllByRole, getByRole, queryByRole } = render(
      <EditableField
        name="company"
        value={{ option: 'Work', value: '123456789', id: '' }}
        valueOptions={['Home', 'Work', 'Other']}
      />
    )
    const button = container.querySelector(
      `.${INPUT_CLASSNAMES.optionsTrigger}`
    )

    expect(queryByRole('listbox')).toBe(null)

    user.click(button)

    await waitFor(() => {
      expect(getByRole('listbox')).toBeInTheDocument()
      expect(getAllByRole('option').length).toBe(3)
    })
  })

  test('Option text should be the one in the value', () => {
    const { container } = render(
      <EditableField
        name="company"
        value={{ option: 'Work', value: '123456789', id: '' }}
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    expect(
      container.querySelector(`.${INPUT_CLASSNAMES.selectedOption}`).textContent
    ).toBe('Work')
  })

  test('Option text should be the default with empty value', () => {
    const { container } = render(
      <EditableField
        name="company"
        defaultOption="Other"
        value=""
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    expect(
      container.querySelector(`.${INPUT_CLASSNAMES.selectedOption}`).textContent
    ).toBe('Other')
  })

  test('Option text should be the default with empty value (obj case)', () => {
    const { container } = render(
      <EditableField
        name="company"
        defaultOption="Other"
        value={{ value: '123456789', id: '' }}
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    expect(
      container.querySelector(`.${INPUT_CLASSNAMES.selectedOption}`).textContent
    ).toBe('Other')
  })

  test('With no value option text should be the default option passed', () => {
    const { container } = render(
      <EditableField
        name="company"
        defaultOption="Other"
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    expect(
      container.querySelector(`.${INPUT_CLASSNAMES.selectedOption}`).textContent
    ).toBe('Other')
  })

  test('With no value option text should be the first in the list', () => {
    const { container } = render(
      <EditableField name="company" valueOptions={['Home', 'Work', 'Other']} />
    )

    expect(
      container.querySelector(`.${INPUT_CLASSNAMES.selectedOption}`).textContent
    ).toBe('Home')
  })

  test('With no value option text should be default passed in', () => {
    const { container } = render(
      <EditableField
        name="company"
        defaultOption="Other"
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    expect(
      container.querySelector(`.${INPUT_CLASSNAMES.selectedOption}`).textContent
    ).toBe('Other')
  })

  test('Change option text when clicking a dropdown item', async () => {
    const { getAllByRole, container } = render(
      <EditableField
        name="company"
        value={{ option: 'Work', value: '123456789', id: '' }}
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    const button = container.querySelector(
      `.${INPUT_CLASSNAMES.optionsTrigger}`
    )

    user.click(button)
    user.click(getAllByRole('option')[0])

    await waitFor(() => {
      expect(
        container.querySelector(`.${INPUT_CLASSNAMES.selectedOption}`)
          .textContent
      ).toBe('Home')
    })
  })

  test('Should change a given value if passed on props with options', () => {
    const { container, rerender } = render(
      <EditableField
        name="company"
        value={{ option: 'Work', value: '11111', id: '001' }}
        valueOptions={['Home', 'Work', 'Other']}
      />
    )
    expect(
      container.querySelector(`.${INPUT_CLASSNAMES.selectedOption}`).textContent
    ).toBe('Work')

    rerender(
      <EditableField value={{ option: 'Home', value: '888888', id: '001' }} />
    )

    expect(
      container.querySelector(`.${INPUT_CLASSNAMES.selectedOption}`).textContent
    ).toBe('Home')
  })

  test('Should change a given value if passed on props with options (default option)', () => {
    const { container, rerender } = render(
      <EditableField
        name="company"
        defaultOption="Other"
        value={{ value: '11111', id: '001' }}
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    expect(
      container.querySelector(`.${INPUT_CLASSNAMES.selectedOption}`).textContent
    ).toBe('Other')

    rerender(
      <EditableField value={{ option: 'Home', value: '888888', id: '001' }} />
    )

    expect(
      container.querySelector(`.${INPUT_CLASSNAMES.selectedOption}`).textContent
    ).toBe('Home')
  })
})

describe('Static Value', () => {
  test('should render the placeholder if no value present', () => {
    const { container } = render(
      <EditableField name="company" placeholder="Add something" />
    )

    expect(
      container.querySelector(`.${MASK_CLASSNAMES.value}`).textContent
    ).toBe('Add something')
  })

  test('should render the value if present', () => {
    const { container } = render(
      <EditableField name="company" value="hello" placeholder="Add something" />
    )

    expect(
      container.querySelector(`.${MASK_CLASSNAMES.value}`).textContent
    ).toBe('hello')
  })

  test('should emphasize the value if emphasizeTopValue and multivalue enabled', () => {
    const { container } = render(
      <EditableField
        name="company"
        value={['hello', 'hola']}
        placeholder="Add something"
        emphasizeTopValue
      />
    )

    expect(container.querySelector('.is-emphasized').textContent).toBe('hello')
    expect(
      window.getComputedStyle(
        container.querySelector(`.${MASK_CLASSNAMES.value}`)
      ).fontWeight
    ).toBe('500')
  })

  test('should be on top if field not active', () => {
    const { container } = render(
      <EditableField name="company" value="hello" placeholder="Add something" />
    )

    expect(
      window.getComputedStyle(
        container.querySelector(`.${MASK_CLASSNAMES.component}`)
      ).zIndex
    ).toBe('2')
  })

  test('should be on bottom if field active', () => {
    const { container, getByLabelText } = render(
      <EditableField name="company" value="hello" placeholder="Add something" />
    )

    const input = getByLabelText('company')

    input.focus()

    expect(
      window.getComputedStyle(
        container.querySelector(`.${MASK_CLASSNAMES.component}`)
      ).zIndex
    ).toBe('1')
  })

  test('static option', () => {
    const { container, getAllByRole } = render(
      <EditableField
        name="company"
        value={{ option: 'Work', value: '123456789', id: '' }}
        valueOptions={['Home', 'Work', 'Other']}
      />
    )

    expect(
      container.querySelector(`.${MASK_CLASSNAMES.option}`).textContent
    ).toBe('Work')

    user.click(container.querySelector(`.${INPUT_CLASSNAMES.optionsTrigger}`))
    user.click(getAllByRole('option')[0])

    expect(
      container.querySelector(`.${MASK_CLASSNAMES.option}`).textContent
    ).toBe('Home')
  })
})

describe('Actions', () => {
  test('should render delete action by default', () => {
    const { container } = render(<EditableField name="company" value="hello" />)

    expect(
      container.querySelector(`.${ACTIONS_CLASSNAMES.actions}`)
    ).toBeTruthy()
    expect(container.querySelector('.action-delete')).toBeTruthy()
  })

  test('should not render delete action if null passed', () => {
    const { container } = render(
      <EditableField name="company" value="hello" actions={null} />
    )

    expect(container.querySelector('.action-delete')).toBeFalsy()
  })

  test('should render passed actions in props', () => {
    const { container } = render(
      <EditableField
        name="company"
        value="hello"
        actions={{
          name: 'link',
        }}
      />
    )

    expect(container.querySelector('.action-delete')).toBeTruthy()
    expect(container.querySelector('.action-link')).toBeTruthy()
  })

  test('should render passed actions in props (array)', () => {
    const { container } = render(
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

    expect(container.querySelector('.action-delete')).toBeTruthy()
    expect(container.querySelector('.action-link')).toBeTruthy()
  })

  test('Custom delete action', () => {
    const deleteSpy = jest.fn()

    const { container } = render(
      <EditableField
        name="company"
        value="hello"
        actions={{
          name: 'delete',
          callback: deleteSpy,
        }}
      />
    )

    const deleteBtn = container.querySelector('.action-delete')

    user.click(deleteBtn)

    expect(deleteSpy).toHaveBeenCalled()
  })

  test('should call callback function in action', () => {
    const spy = jest.fn()

    const { container } = render(
      <EditableField
        name="company"
        value="hello"
        actions={{
          name: 'something',
          callback: spy,
        }}
      />
    )

    user.click(container.querySelector('.action-something'))

    expect(spy).toHaveBeenCalled()
  })
})

describe('disabled', () => {
  test('should put disabled attr on input', () => {
    const { container } = render(
      <EditableField
        name="company"
        value={[{ option: 'Work', value: '123456789', id: '' }]}
        valueOptions={['Home', 'Work', 'Other']}
        disabled
      />
    )

    expect(
      container.querySelector('input').getAttribute('disabled')
    ).toBeDefined()
  })

  test('should put disabled classname', () => {
    const { container } = render(
      <EditableField
        name="company"
        value={[{ option: 'Work', value: '123456789', id: '' }]}
        valueOptions={['Home', 'Work', 'Other']}
        disabled
      />
    )

    expect(
      container.querySelector(`.${STATES_CLASSNAMES.fieldDisabled}`)
    ).toBeTruthy()
  })

  test('should not render actions', () => {
    const { container } = render(
      <EditableField
        name="company"
        value={[{ option: 'Work', value: '123456789', id: '' }]}
        valueOptions={['Home', 'Work', 'Other']}
        disabled
      />
    )

    expect(
      container.querySelector(`.${ACTIONS_CLASSNAMES.actions}`)
    ).toBeFalsy()
    expect(container.querySelector('.action-delete')).toBeFalsy()
  })

  test('should not render add button', () => {
    const { container } = render(
      <EditableField
        name="company"
        value={[{ option: 'Work', value: '123456789', id: '' }]}
        valueOptions={['Home', 'Work', 'Other']}
        disabled
      />
    )

    const button = container.querySelector(
      `.${EDITABLEFIELD_CLASSNAMES.addButton}`
    )
    expect(button).toBeFalsy()
  })

  test('dropdown trigger should be disabled', () => {
    const { container } = render(
      <EditableField
        name="company"
        value={[{ option: 'Work', value: '123456789', id: '' }]}
        valueOptions={['Home', 'Work', 'Other']}
        disabled
      />
    )

    expect(
      container
        .querySelector(`.${INPUT_CLASSNAMES.optionsTrigger}`)
        .getAttribute('disabled')
    ).toBeDefined()
  })
})

describe('Events', () => {
  test('onInputFocus', () => {
    const spy = jest.fn()
    const { container } = render(
      <EditableField name="company" onInputFocus={spy} />
    )

    const input = container.querySelector('input')

    input.focus()

    expect(spy).toHaveBeenCalled()
  })

  test('onInputBlur', () => {
    const spy = jest.fn()
    const { container } = render(
      <EditableField name="company" onInputBlur={spy} />
    )

    const input = container.querySelector('input')

    input.focus()
    input.blur()

    expect(spy).toHaveBeenCalled()
  })

  test('onChange', () => {
    const spy = jest.fn()

    const { container } = render(
      <EditableField name="company" onChange={spy} />
    )

    const input = container.querySelector('input')

    user.type(input, 'a')

    expect(spy).toHaveBeenCalled()
  })

  test('onAdd', () => {
    const spy = jest.fn()

    const { container } = render(
      <EditableField
        name="company"
        value={['hello', 'goodbye', 'hola']}
        onAdd={spy}
      />
    )

    const button = container.querySelector(
      `.${EDITABLEFIELD_CLASSNAMES.addButton}`
    )

    user.click(button)

    expect(spy).toHaveBeenCalled()
  })

  test('onAdd: empty', () => {
    const spy = jest.fn()

    const { container } = render(
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

    const button = container.querySelector(
      `.${EDITABLEFIELD_CLASSNAMES.addButton}`
    )

    user.click(button)

    expect(spy).not.toHaveBeenCalled()
  })

  test('Pressing escape', () => {
    const onEscapeSpy = jest.fn()
    const onDiscardSpy = jest.fn()
    const { getByLabelText } = render(
      <EditableField
        name="company"
        onEscape={onEscapeSpy}
        onDiscard={onDiscardSpy}
      />
    )

    user.type(getByLabelText('company'), '{esc}')

    expect(onEscapeSpy).toHaveBeenCalled()
    expect(onDiscardSpy).toHaveBeenCalled()
  })

  test('Delete or clear a value', () => {
    const onDeleteSpy = jest.fn()
    const onCommitSpy = jest.fn()

    const { container } = render(
      <EditableField
        name="company"
        value="hello"
        onDelete={onDeleteSpy}
        onCommit={onCommitSpy}
      />
    )

    const deleteBtn = container.querySelector('.action-delete')

    user.click(deleteBtn)

    expect(onDeleteSpy).toHaveBeenCalled()
    expect(onCommitSpy).toHaveBeenCalled()
  })

  test('Focus option', () => {
    const spy = jest.fn()

    const { container } = render(
      <EditableField
        name="company"
        value={{ option: 'Work', value: '123456789', id: '1' }}
        valueOptions={['Home', 'Work', 'Other']}
        onOptionFocus={spy}
      />
    )

    container.querySelector(`.${INPUT_CLASSNAMES.optionsTrigger}`).focus()

    expect(spy).toHaveBeenCalled()
  })

  test('Changing option', () => {
    const onOptionChangeSpy = jest.fn()
    const onChangeSpy = jest.fn()
    const onCommitSpy = jest.fn()

    const { container, getAllByRole } = render(
      <EditableField
        name="company"
        value={{ option: 'Work', value: '123456789', id: '' }}
        valueOptions={['Home', 'Work', 'Other']}
        onOptionChange={onOptionChangeSpy}
        onChange={onChangeSpy}
        onCommit={onCommitSpy}
      />
    )

    user.click(container.querySelector(`.${INPUT_CLASSNAMES.optionsTrigger}`))
    user.click(getAllByRole('option')[0])

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

    f.then(d => {
      expect(wrapper.state('value')).toEqual('123')
      expect(wrapper.state('_id')).toEqual(7)
    }).catch(e => {
      // console.log('HS: e', e)
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
    const { container, getByLabelText } = render(
      <EditableField name="company" value="hello" onInputBlur={blurSpy} />
    )
    const input = getByLabelText('company')

    input.focus()

    expect(
      container.querySelector(`.${STATES_CLASSNAMES.isActive}`)
    ).toBeTruthy()

    user.clear(input)
    user.type(input, 'hello')
    input.blur()

    expect(input.value).toBe('hello')
    expect(
      container.querySelector(`.${STATES_CLASSNAMES.isActive}`)
    ).toBeFalsy()
    expect(blurSpy).toHaveBeenCalled()
  })

  test('If value cleared in single value case, it should deactivate the field and leave as', async () => {
    const commitSpy = jest.fn()
    const blurSpy = jest.fn()

    const { container, getByLabelText } = render(
      <EditableField
        name="company"
        value="hello"
        onCommit={commitSpy}
        onInputBlur={blurSpy}
      />
    )

    const input = getByLabelText('company')

    input.focus()

    expect(
      container.querySelector(`.${STATES_CLASSNAMES.isActive}`)
    ).toBeTruthy()

    user.clear(input)
    input.blur()

    await waitFor(() => {
      expect(
        container.querySelector(`.${STATES_CLASSNAMES.isActive}`)
      ).toBeFalsy()
      expect(commitSpy).toHaveBeenCalled()
      expect(blurSpy).toHaveBeenCalled()
    })
  })

  test('If value cleared in multivalue, it should deactivate the field and remove', async () => {
    const commitSpy = jest.fn()
    const blurSpy = jest.fn()
    const discardSpy = jest.fn()

    const { container } = render(
      <EditableField
        name="company"
        value={['hello', 'hola']}
        onCommit={commitSpy}
        onInputBlur={blurSpy}
        onDiscard={discardSpy}
      />
    )

    const input = container.querySelectorAll('input')[0]

    input.focus()

    expect(
      container.querySelector(`.${STATES_CLASSNAMES.isActive}`)
    ).toBeTruthy()
    expect(container.querySelectorAll('input').length).toBe(2)

    user.clear(input)
    input.blur()

    await waitFor(() => {
      expect(
        container.querySelector(`.${STATES_CLASSNAMES.isActive}`)
      ).toBeFalsy()
      expect(container.querySelectorAll('input').length).toBe(1)
      expect(commitSpy).toHaveBeenCalled()
      expect(blurSpy).toHaveBeenCalled()
      expect(discardSpy).toHaveBeenCalled()
    })
  })

  test('If value cleared in multivalue, it should not remove the only field left', async () => {
    const commitSpy = jest.fn()
    const blurSpy = jest.fn()
    const discardSpy = jest.fn()

    const { container } = render(
      <EditableField
        name="company"
        value={['hello']}
        onCommit={commitSpy}
        onInputBlur={blurSpy}
        onDiscard={discardSpy}
      />
    )

    const input = container.querySelectorAll('input')[0]

    input.focus()

    expect(
      container.querySelector(`.${STATES_CLASSNAMES.isActive}`)
    ).toBeTruthy()
    expect(container.querySelectorAll('input').length).toBe(1)

    user.clear(input)
    input.blur()

    await waitFor(() => {
      expect(
        container.querySelector(`.${STATES_CLASSNAMES.isActive}`)
      ).toBeFalsy()
      expect(container.querySelectorAll('input').length).toBe(1)
      expect(commitSpy).toHaveBeenCalled()
      expect(blurSpy).toHaveBeenCalled()
    })
  })

  test('If value changed and valid, it should commit', async () => {
    const commitSpy = jest.fn()
    const blurSpy = jest.fn()

    const { container } = render(
      <EditableField
        name="company"
        value="hello"
        onCommit={commitSpy}
        onInputBlur={blurSpy}
      />
    )

    const input = container.querySelector('input')

    input.focus()

    expect(
      container.querySelector(`.${STATES_CLASSNAMES.isActive}`)
    ).toBeTruthy()

    user.clear(input)
    user.type(input, 'hola')
    input.blur()

    await waitFor(() => {
      expect(input.value).toBe('hola')
      expect(
        container.querySelector(`.${STATES_CLASSNAMES.isActive}`)
      ).toBeFalsy()
      expect(commitSpy).toHaveBeenCalled()
      expect(blurSpy).toHaveBeenCalled()
    })
  })

  test('If value changed and invalid, it should not commit', async () => {
    const commitSpy = jest.fn()
    const blurSpy = jest.fn()

    const { container } = render(
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

    const input = container.querySelector('input')

    input.focus()

    expect(
      container.querySelector(`.${STATES_CLASSNAMES.isActive}`)
    ).toBeTruthy()

    user.clear(input)
    user.type(input, 'hola')
    input.blur()

    await waitFor(() => {
      expect(input.value).toBe('hola')
      expect(commitSpy).not.toHaveBeenCalled()
      expect(blurSpy).toHaveBeenCalled()
    })
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
    const { container } = render(
      <EditableField name="company" floatingLabels />
    )

    expect(
      container.querySelector(`.${STATES_CLASSNAMES.withFloatingLabels}`)
    ).toBeTruthy()
  })

  test('Label is hidden when floating labels on', () => {
    const { container } = render(
      <EditableField name="company" floatingLabels />
    )

    const el = container.querySelector(`.${EDITABLEFIELD_CLASSNAMES.label}`)

    expect(el).toBeFalsy()
  })
})
