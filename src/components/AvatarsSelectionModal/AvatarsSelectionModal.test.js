import React from 'react'
import { render, screen } from '@testing-library/react'
import AvatarsSelectionModal from './AvatarsSelectionModal'
import userEvent from '@testing-library/user-event'

describe('AvatarsSelectionModal', () => {
  const exampleUsers = [
    {
      id: 1,
      fullName: 'John Doe',
      photo: 'https://example.com',
      role: 'account owner',
    },
    {
      id: 2,
      fullName: 'Alice Doe',
      photo: 'https://example.com',
      role: 'administrator',
    },
    {
      id: 3,
      fullName: 'Bob Smith',
      photo: 'https://example.com',
      role: 'user',
    },
  ]

  it('should not render modal when is not opened', () => {
    renderComponent({ isOpen: false })

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('should render modal when is opened', () => {
    renderComponent({ isOpen: true })

    expect(
      screen.getByRole('dialog', { name: 'Choose up to 5 photos' })
    ).toBeInTheDocument()
  })

  it('should show empty body when no avatars', () => {
    renderComponent({ users: [] })

    expect(screen.getByText('No one matches your search.')).toBeInTheDocument()
  })

  it('should render provided user', () => {
    const users = [exampleUsers[0]]
    renderComponent({ users })

    expect(screen.getByLabelText('John Doe account owner')).toBeInTheDocument()
    expect(screen.getByText('Account Owner')).toBeInTheDocument()
  })

  it('should render all users', () => {
    renderComponent({ users: exampleUsers })

    expect(screen.getAllByRole('checkbox')).toHaveLength(3)
    expect(
      screen.getByTestId('avatars-users-count-description')
    ).toHaveTextContent(
      "Showing 3 users with photos and access to the Beacon's Mailbox"
    )
  })

  it('should allow to filter list', async () => {
    renderComponent({ users: exampleUsers })

    await userEvent.type(screen.getByRole('textbox'), 'john doe')

    expect(screen.getAllByRole('checkbox')).toHaveLength(1)
  })

  it('should call onClose when cancel clicked', async () => {
    const onClose = jest.fn()
    renderComponent({ users: exampleUsers, onClose })

    userEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(onClose).toHaveBeenCalled()
  })

  it('should have confirm button disabled when no avatar selected', async () => {
    renderComponent({ users: exampleUsers })

    expect(screen.getByRole('button', { name: 'Add photos' })).toBeDisabled()
  })

  it('should have pre-selected avatars', async () => {
    renderComponent({ users: exampleUsers, initiallySelectedUsers: [2] })

    expect(
      screen.getByRole('checkbox', {
        name: /Alice Doe/,
      })
    ).toBeChecked()
  })

  describe('multi select', () => {
    it('should have proper title for multi select, based on selection limit', () => {
      renderComponent({ users: exampleUsers, selectionLimit: 4 })

      expect(
        screen.getByRole('dialog', { name: 'Choose up to 4 photos' })
      ).toBeInTheDocument()
      expect(screen.getByText('Choose up to 4 photos')).toBeInTheDocument()
    })

    it('should allow to select avatar', () => {
      renderComponent({ users: exampleUsers })

      const avatar = screen.getByRole('checkbox', {
        name: /John Doe/,
      })

      userEvent.click(avatar)

      expect(avatar).toBeChecked()
    })

    it('should allow to select avatars up to limit', () => {
      renderComponent({ users: exampleUsers, selectionLimit: 2 })

      const johnDoe = screen.getByRole('checkbox', {
        name: /John Doe/,
      })
      const aliceDoe = screen.getByRole('checkbox', {
        name: /Alice Doe/,
      })

      userEvent.click(johnDoe)
      userEvent.click(aliceDoe)

      const bobSmith = screen.getByRole('checkbox', {
        name: /Bob Smith/,
      })

      expect(aliceDoe).toBeChecked()
      expect(bobSmith).toBeDisabled()
    })

    it('should call onConfirm and onClose when confirm button clicked', async () => {
      const onConfirm = jest.fn()
      const onClose = jest.fn()
      renderComponent({ users: exampleUsers, onConfirm, onClose })
      userEvent.click(
        screen.getByRole('checkbox', {
          name: /John Doe/,
        })
      )
      userEvent.click(
        screen.getByRole('checkbox', {
          name: /Alice Doe/,
        })
      )

      userEvent.click(screen.getByRole('button', { name: 'Add photos' }))

      expect(onConfirm).toHaveBeenCalledWith([1, 2])
      expect(onClose).toHaveBeenCalled()
    })
  })

  describe('single select', () => {
    it('should have proper title for single select', () => {
      renderComponent({ users: exampleUsers, selectionLimit: 1 })

      expect(
        screen.getByRole('dialog', { name: 'Choose a photo' })
      ).toBeInTheDocument()
      expect(screen.getByText('Choose a photo')).toBeInTheDocument()
    })

    it('should allow to select avatar', () => {
      renderComponent({ users: exampleUsers, selectionLimit: 1 })

      const avatar = screen.getByRole('checkbox', {
        name: /John Doe/,
      })

      userEvent.click(avatar)

      expect(avatar).toBeChecked()
    })

    it('should allow to switch avatar for single select', () => {
      renderComponent({ users: exampleUsers, selectionLimit: 1 })

      const johnDoe = screen.getByRole('checkbox', {
        name: /John Doe/,
      })
      const aliceDoe = screen.getByRole('checkbox', {
        name: /Alice Doe/,
      })

      userEvent.click(johnDoe)
      userEvent.click(aliceDoe)

      expect(johnDoe).not.toBeChecked()
      expect(aliceDoe).toBeChecked()
    })

    it('should call onConfirm when confirm button clicked', async () => {
      const onConfirm = jest.fn()
      renderComponent({ users: exampleUsers, onConfirm, selectionLimit: 1 })
      userEvent.click(
        screen.getByRole('checkbox', {
          name: /Alice Doe/,
        })
      )

      userEvent.click(screen.getByRole('button', { name: 'Add photo' }))

      expect(onConfirm).toHaveBeenCalledWith([2])
    })
  })
})

const renderComponent = ({
  selectionLimit = 5,
  isOpen = true,
  users = [],
  onClose,
  onConfirm,
  initiallySelectedUsers,
} = {}) => {
  return render(
    <AvatarsSelectionModal
      selectionLimit={selectionLimit}
      isOpen={isOpen}
      availableUsers={users}
      onClose={onClose}
      onConfirm={onConfirm}
      initiallySelectedUsers={initiallySelectedUsers}
    />
  )
}
