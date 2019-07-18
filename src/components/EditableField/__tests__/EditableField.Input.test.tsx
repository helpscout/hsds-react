import * as React from 'react'
import { cy } from '@helpscout/cyan'
import { mount } from 'enzyme'
import { EditableFieldInput } from '../EditableField.Input'

describe('Should component update', () => {
  test('fieldValue', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const wrapper: any = mount(
      <EditableFieldInput name="greeting" fieldValue={val} />
    )
    const actualProps = wrapper.props()
    const actualState = wrapper.state()

    expect(
      wrapper.instance().shouldComponentUpdate(
        {
          ...actualProps,
          fieldValue: {
            value: 'hello',
            id: 'greeting_0',
          },
        },
        actualState
      )
    ).toBeFalsy()

    expect(
      wrapper.instance().shouldComponentUpdate(
        {
          ...actualProps,
          fieldValue: {
            value: 'hola',
            id: 'greeting_0',
          },
        },
        actualState
      )
    ).toBeTruthy()
  })

  test('isActive', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const wrapper: any = mount(
      <EditableFieldInput name="greeting" fieldValue={val} isActive />
    )
    const actualProps = wrapper.props()
    const actualState = wrapper.state()

    expect(
      wrapper.instance().shouldComponentUpdate(
        {
          ...actualProps,
          isActive: true,
        },
        actualState
      )
    ).toBeFalsy()

    expect(
      wrapper.instance().shouldComponentUpdate(
        {
          ...actualProps,
          isActive: false,
        },
        actualState
      )
    ).toBeTruthy()
  })
})

describe('calculateFieldWidth', () => {
  test('is active and without actions', () => {
    const val = {
      value: 'hello my old friend',
      id: 'greeting_0',
    }
    cy.render(<EditableFieldInput name="greeting" fieldValue={val} isActive />)

    const field = cy.get('.c-EditableFieldInput')

    expect(field.getComputedStyle('width')).toBe('100%')
  })

  test('not active and without actions', () => {
    const val = {
      value: 'hello my old friend',
      id: 'greeting_0',
    }
    cy.render(
      <EditableFieldInput name="greeting" fieldValue={val} isActive={false} />
    )

    const field = cy.get('.c-EditableFieldInput')

    expect(field.getComputedStyle('width')).toContain('px')
  })

  test('with actions and active', () => {
    const val = {
      value: 'hello my old friend',
      id: 'greeting_0',
    }
    cy.render(
      <EditableFieldInput
        name="greeting"
        fieldValue={val}
        isActive
        actions={[{ name: 'act' }]}
      />
    )

    const field = cy.get('.c-EditableFieldInput')

    expect(field.getComputedStyle('width')).toBe('100%')
  })

  test('with actions and not active', () => {
    const val = {
      value: 'hello my old friend',
      id: 'greeting_0',
    }
    cy.render(
      <EditableFieldInput
        name="greeting"
        fieldValue={val}
        isActive={false}
        actions={[{ name: 'act' }]}
      />
    )

    const field = cy.get('.c-EditableFieldInput')

    expect(field.getComputedStyle('width')).toContain('px')
  })
})

describe('email type', () => {
  test('should truncate', () => {
    const val = {
      value: 'email@somethingcool.com',
      id: 'email_0',
    }

    cy.render(<EditableFieldInput type="email" name="email" fieldValue={val} />)

    expect(cy.get('.TruncatedWithSplitter').exists()).toBeTruthy()
    expect(cy.get('.TruncateFirstChunk').exists()).toBeTruthy()
    expect(cy.get('.TruncateSplitterChunk').exists()).toBeTruthy()
    expect(cy.get('.TruncateSecondChunk').exists()).toBeTruthy()
    expect(cy.get('.TruncateFirstChunk').text()).toBe('email')
    expect(cy.get('.TruncateSplitterChunk').text()).toBe('@')
    expect(cy.get('.TruncateSecondChunk').text()).toBe('somethingcool.com')
  })
})
