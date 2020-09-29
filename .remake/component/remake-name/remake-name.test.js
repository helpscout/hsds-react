import React from 'react'
import { render, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import <%= name %> from '../<%= name %>'

describe('renders', () => {
  test('Should render something', () => {
    const { getByText } = render(<<%= name %> />)

    expect(getByText('')).toBeInTheDocument()
  })
  
  test('Should do something', async () => {
    const { getByRole } = render(<<%= name %> />)

    user.click(getByRole('button'))

    await waitFor(() => {
      expect(true).toBeTruthy()
    })
  })
})
