import React from 'react'
import { render, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import EmojiPicker from './index'
import EmojiItem from './EmojiPicker.Item'

jest.useFakeTimers()

describe('renderTrigger', () => {
  test('Has default trigger component', () => {
    const { container } = render(<EmojiPicker />)
    const trigger = container.querySelector('.c-EmojiPickerTrigger')

    expect(trigger).toBeInTheDocument()
  })

  test('Can render custom trigger', () => {
    const { container } = render(
      <EmojiPicker
        renderTrigger={() => (
          <span className="custom-trigger">Custom Trigger</span>
        )}
      />
    )
    const defaultTrigger = container.querySelector('.c-EmojiPickerTrigger')
    const customTrigger = container.querySelector('.custom-trigger')

    expect(defaultTrigger).toBe(null)
    expect(customTrigger).toBeInTheDocument()
  })
})

describe('Menu/Item', () => {
  test('Renders an Emoji correctly within a Menu/Item', () => {
    const { getByRole, getAllByRole } = render(<EmojiPicker isOpen={true} />)

    expect(getByRole('listbox')).toBeInTheDocument()
    expect(getAllByRole('option').length).toBeTruthy()
    expect(
      getAllByRole('option')[0].querySelector('.c-EmojiPickerView')
    ).toBeInTheDocument()
  })
})

describe('onOpen', () => {
  it('should handle onOpen event', async () => {
    const onOpenSpy = jest.fn()
    const { container, queryByRole, getByRole } = render(
      <EmojiPicker onOpen={onOpenSpy} />
    )
    const trigger = container.querySelector('.c-EmojiPickerTrigger')

    expect(queryByRole('listbox')).toBe(null)

    user.click(trigger)

    await waitFor(() => {
      expect(getByRole('listbox')).toBeInTheDocument()
      expect(onOpenSpy).toHaveBeenCalled()
    })
  })
})

describe('onClose', () => {
  it('should handle onOpen event', async () => {
    const onCloseSpy = jest.fn()
    const { container, queryByRole, getByRole } = render(
      <EmojiPicker onClose={onCloseSpy} isOpen={true} />
    )

    expect(getByRole('listbox')).toBeInTheDocument()

    user.type(container, '{esc}')

    await waitFor(() => {
      expect(queryByRole('listbox')).toBe(null)
      expect(onCloseSpy).toHaveBeenCalled()
    })
  })
})

describe('render EmojiItem', () => {
  test('has default content', () => {
    const { container } = render(<EmojiItem />)
    expect(container.querySelector('.c-EmojiPickerItem')).toBeInTheDocument()
  })
})
