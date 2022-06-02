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

  test('Makes droplist toggler enabled by default', async () => {
    const { getByRole } = render(<ActionSelect items={mockItems} />)

    await waitFor(() => expect(getByRole('button')).not.toBeDisabled())
  })

  test('Makes droplist toggler disabled', async () => {
    const { getByRole } = render(<ActionSelect items={mockItems} disabled />)

    await waitFor(() => expect(getByRole('button')).toBeDisabled())
  })

  test('Wraps disabled droplist toggler with a span for proper tooltip handling', async () => {
    const { getByRole } = render(
      <ActionSelect items={mockItems} disabled withTooltip />
    )

    await waitFor(() => {
      expect(getByRole('button').parentElement).toHaveClass('TooltipTrigger')
      expect(getByRole('button').parentElement.nodeName).toEqual('SPAN')
    })
  })

  test('Does not wrap enabled droplist toggler with a span when tooltip enabled', async () => {
    const { getByRole } = render(<ActionSelect items={mockItems} withTooltip />)

    await waitFor(() => {
      expect(getByRole('button')).toHaveClass('TooltipTrigger')
      expect(getByRole('button').parentElement.nodeName).not.toEqual('SPAN')
    })
  })

  test('Marks droplist toggler with an error', async () => {
    const { getByRole } = render(
      <ActionSelect items={mockItems} error="Some error" />
    )

    await waitFor(() => expect(getByRole('button')).toHaveClass('is-error'))
  })

  test('Provides ID to the toggler', async () => {
    const { getByRole } = render(<ActionSelect items={mockItems} id="123" />)

    await waitFor(() =>
      expect(getByRole('button')).toHaveAttribute('id', '123')
    )
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
