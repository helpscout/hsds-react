import React from 'react'
import { render, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import DropList from '../DropList'

describe('renders', () => {
  test('Should render something', () => {
    const { getByText } = render(<DropList />)

    expect(getByText('')).toBeInTheDocument()
  })

  test('Should do something', async () => {
    const { getByRole } = render(<DropList />)

    user.click(getByRole('button'))

    await waitFor(() => {
      expect(true).toBeTruthy()
    })
  })
})
