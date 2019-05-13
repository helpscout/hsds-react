import * as React from 'react'
import { cy } from '@helpscout/cyan'
import ActionSelect from '../ActionSelect'

cy.useFakeTimers()

const mockItems = [
  {
    value: 'Derek',
  },
  {
    value: 'Hansel',
  },
  {
    value: 'Mugatu',
  },
]

describe('className', () => {
  test('Has default className', () => {
    const wrapper = cy.render(<ActionSelect />)

    expect(wrapper.hasClass('c-ActionSelect')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = cy.render(<ActionSelect className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    cy.render(<ActionSelect data-cy="BlueBlueBlue" />)
    const el = cy.getByCy('BlueBlueBlue')

    expect(el.exists()).toBeTruthy()
  })
})

describe('SelectDropdown', () => {
  test('Renders a SelectDropdown with items', () => {
    cy.render(<ActionSelect items={mockItems} isOpen={true} />)

    const el = cy.getByCy('DropdownItem')

    expect(el).toHaveLength(3)
    expect(el.first().text()).toBe('Derek')
  })

  test('Renders a SelectDropdown with a selected item', () => {
    cy.render(<ActionSelect items={mockItems} selectedItem={mockItems[1]} />)

    cy.getByCy('DropdownTrigger').click()

    const el = cy.getByCy('DropdownItem').filter('.is-active')

    expect(el.exists()).toBeTruthy()
    expect(el.text()).toBe('Hansel')
  })
})

describe('Focus', () => {
  test('Can refocuses trigger on close, by default', () => {
    const spy = jest.fn()
    cy.render(<ActionSelect items={mockItems} onFocus={spy} />)

    cy.getByCy('DropdownTrigger').click()

    expect(spy).not.toHaveBeenCalled()

    cy.type('{esc}')

    expect(spy).toHaveBeenCalled()
  })

  test('Can not trigger on close, with custom shouldRefocusOnClose', () => {
    const spy = jest.fn()
    const shouldRefocusOnClose = () => false

    cy.render(
      <ActionSelect
        items={mockItems}
        isOpen={true}
        onFocus={spy}
        shouldRefocusOnClose={shouldRefocusOnClose}
      />
    )

    cy.type('{esc}')

    expect(spy).not.toHaveBeenCalled()
  })

  test('Autofocuses node within children on select, by default', () => {
    const spy = jest.fn()

    cy.render(
      <ActionSelect items={mockItems} isOpen={true}>
        <input onFocus={spy} />
      </ActionSelect>
    )

    expect(spy).not.toHaveBeenCalled()

    cy
      .getByCy('DropdownItem')
      .first()
      .click()

    expect(spy).toHaveBeenCalled()
  })

  test('Does not autofocus node within children on select, if specified', () => {
    const spy = jest.fn()

    cy.render(
      <ActionSelect
        items={mockItems}
        isOpen={true}
        isAutoFocusNodeOnSelect={false}
      >
        <input onFocus={spy} />
      </ActionSelect>
    )

    cy
      .getByCy('DropdownItem')
      .first()
      .click()

    expect(spy).not.toHaveBeenCalled()
  })
})

describe('Resize', () => {
  test('Resizes content when child updates', () => {
    const spy = jest.fn()
    const Small = () => <div className="ChildContent" />
    const Big = () => <div className="OtherContent" />

    const wrapper = cy.render(
      <ActionSelect
        items={mockItems}
        isOpen={true}
        isAutoFocusNodeOnSelect={false}
        onResize={spy}
      >
        <Small />
      </ActionSelect>
    )

    expect(spy).toHaveBeenCalledTimes(1)

    wrapper.setProps({ children: <Big /> })

    expect(spy).toHaveBeenCalledTimes(3)
  })

  test('Resizes content height to auto when child is removed', () => {
    const spy = jest.fn()
    const Small = () => <div className="ChildContent" />

    const wrapper = cy.render(
      <ActionSelect
        items={mockItems}
        isOpen={true}
        isAutoFocusNodeOnSelect={false}
        onResize={spy}
      >
        <Small />
      </ActionSelect>
    )
  })
})
