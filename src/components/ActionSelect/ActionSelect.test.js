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

describe('DropList', () => {
  test('Renders a DropList with items', async () => {
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

  test('DropList Selection', async () => {
    const onSelectSpy = jest.fn()
    const { getByRole, getAllByRole, getByTestId } = render(
      <ActionSelect
        items={mockItems}
        selectedItem={mockItems[1]}
        onSelect={onSelectSpy}
      />
    )

    user.click(getByRole('button'))

    await waitFor(() => {
      expect(
        getAllByRole('option')[1].classList.contains('is-selected')
      ).toBeTruthy()
      expect(getByTestId('DropList.SelectTagToggler').textContent).toBe(
        'Hansel'
      )

      user.click(getAllByRole('option')[0])
    })

    await waitFor(() => {
      expect(
        getAllByRole('option')[1].classList.contains('is-selected')
      ).toBeFalsy()
      expect(
        getAllByRole('option')[0].classList.contains('is-selected')
      ).toBeTruthy()
      expect(getByTestId('DropList.SelectTagToggler').textContent).toBe('Derek')
      expect(onSelectSpy).toHaveBeenCalledTimes(1)
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
