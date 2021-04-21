import React from 'react'
import { render, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { SimpleButton } from '../DropList/DropList.togglers'
import EmojiPicker from './'

jest.useFakeTimers()

describe('Toggler', () => {
  test('Has default toggler component', () => {
    const { container } = render(<EmojiPicker />)
    const toggler = container.querySelector('.c-EmojiPickerToggler')

    expect(toggler).toBeInTheDocument()
  })

  test('Can render custom toggler', () => {
    const { container } = render(
      <EmojiPicker toggler={<SimpleButton text="Custom" />} />
    )
    const defaultToggler = container.querySelector('.c-EmojiPickerToggler')
    const customToggler = container.querySelector('.ButtonToggler')

    expect(defaultToggler).toBe(null)
    expect(customToggler).toBeInTheDocument()
  })
})

describe('Menu/Item', () => {
  test('Renders an Emoji correctly within a Menu/Item', () => {
    const { getByRole, getAllByRole } = render(<EmojiPicker isMenuOpen />)

    expect(getByRole('listbox')).toBeInTheDocument()
    expect(getAllByRole('option').length).toBeTruthy()
    expect(
      getAllByRole('option')[0].querySelector('.c-EmojiPickerView')
    ).toBeInTheDocument()
  })
})

describe('onOpenedStateChange', () => {
  it('should handle open/close event', async () => {
    const onOpenedStateChangeSpy = jest.fn()
    const { container, queryByRole, getByRole } = render(
      <EmojiPicker onOpenedStateChange={onOpenedStateChangeSpy} />
    )
    const toggler = container.querySelector('.c-EmojiPickerToggler')

    expect(queryByRole('listbox')).toBe(null)

    user.click(toggler)

    await waitFor(() => {
      expect(getByRole('listbox')).toBeInTheDocument()
      expect(onOpenedStateChangeSpy).toHaveBeenCalledWith(true)
    })

    user.click(toggler)

    await waitFor(() => {
      expect(queryByRole('listbox')).toBe(null)
      expect(onOpenedStateChangeSpy).toHaveBeenCalledWith(false)
    })
  })
})
