import React from 'react'
import { render, waitFor } from '@testing-library/react'
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
  test('Renders a SelectDropdown with items', async () => {
    const { getByRole, getAllByRole } = render(
      <ActionSelect items={mockItems} isOpen={true} />
    )

    const toggler = getByRole('button')

    user.click(toggler)

    await waitFor(() => {
      const items = getAllByRole('option')

      expect(items).toHaveLength(3)
      expect(items[0].textContent).toBe('Derek')
    })
  })

  test('Renders a SelectDropdown with a selected item', async () => {
    const { getByRole, getAllByRole } = render(
      <ActionSelect items={mockItems} selectedItem={mockItems[1]} />
    )

    user.click(getByRole('button'))

    await waitFor(() => {
      const selectedItem = getAllByRole('option').filter(item =>
        item.classList.contains('is-selected')
      )

      expect(selectedItem.length).toBeTruthy()
      expect(selectedItem[0].textContent).toBe('Hansel')
    })
  })
})

describe('Open/Close', () => {
  test('onOpen/onClose callbacks works', async () => {
    const openSpy = jest.fn()
    const closeSpy = jest.fn()
    const { getByRole } = render(
      <ActionSelect onOpen={openSpy} onClose={closeSpy} />
    )

    user.click(getByRole('button'))

    await waitFor(() => {
      expect(openSpy).toHaveBeenCalled()
    })

    user.click(getByRole('button'))

    await waitFor(() => {
      expect(closeSpy).toHaveBeenCalled()
    })
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
