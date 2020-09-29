import React from 'react'
import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
import ActionSelect from './ActionSelect'

jest.useFakeTimers()

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

describe('SelectDropdown', () => {
  test('Renders a SelectDropdown with items', () => {
    const { getAllByRole } = render(
      <ActionSelect items={mockItems} isOpen={true} />
    )

    const items = getAllByRole('option')

    expect(items).toHaveLength(3)
    expect(items[0].textContent).toBe('Derek')
  })

  test('Renders a SelectDropdown with a selected item', () => {
    const { getByRole, getAllByRole } = render(
      <ActionSelect items={mockItems} selectedItem={mockItems[1]} />
    )

    user.click(getByRole('button'))

    const selectedItem = getAllByRole('option').filter(item =>
      item.classList.contains('is-active')
    )

    expect(selectedItem.length).toBeTruthy()
    expect(selectedItem[0].textContent).toBe('Hansel')
  })
})

describe('Focus', () => {
  test('Can refocuses trigger on close, by default', () => {
    const spy = jest.fn()
    const { container, getByRole } = render(
      <ActionSelect items={mockItems} onFocus={spy} />
    )

    user.click(getByRole('button'))
    user.type(container, '{esc}')

    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('Can not trigger on close, with custom shouldRefocusOnClose', () => {
    const spy = jest.fn()
    const shouldRefocusOnClose = () => false

    const { container } = render(
      <ActionSelect
        items={mockItems}
        isOpen={true}
        onFocus={spy}
        shouldRefocusOnClose={shouldRefocusOnClose}
      />
    )

    user.type(container, '{esc}')

    expect(spy).not.toHaveBeenCalled()
  })
})

describe('Open/Close', () => {
  test('onOpen callback works', () => {
    const spy = jest.fn()
    const { getByRole } = render(<ActionSelect onOpen={spy} />)

    user.click(getByRole('button'))

    expect(spy).toHaveBeenCalled()
  })

  test('onClose callback works', () => {
    const spy = jest.fn()
    const { getByRole } = render(<ActionSelect onClose={spy} isOpen />)

    user.click(getByRole('button'))

    expect(spy).toHaveBeenCalled()
  })
})

describe('Resize', () => {
  test("Don't resize content if the selectedItem is the same", () => {
    const spy = jest.fn()

    const { rerender } = render(
      <ActionSelect
        items={mockItems}
        isOpen={true}
        isAutoFocusNodeOnSelect={false}
        selectedItem={mockItems[1]}
        onResize={spy}
      />
    )

    rerender(
      <ActionSelect
        items={mockItems}
        isOpen={true}
        isAutoFocusNodeOnSelect={false}
        selectedItem={mockItems[1]}
        onResize={spy}
      />
    )

    expect(spy).toHaveBeenCalledTimes(0)
  })
})
