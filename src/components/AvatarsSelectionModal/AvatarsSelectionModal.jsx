import {
  ModalTitleTextUI,
  ModalTitleUI,
  ModalUI,
  UserCountTextUI,
} from './AvatarsSelectionModal.css'
import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import UserSelector from './components/UserSelector'
import useFilteredUsers from './hooks/useFilteredUsers'
import Input from '../Input'
import Icon from '../Icon'
import Text from '../Text'
import { noop } from '../../utilities/other'

function AvatarsSelectionModal({
  availableUsers = [],
  onConfirm = noop,
  onClose = noop,
  isOpen = false,
  initiallySelectedUsers = [],
  selectionLimit,
}) {
  const [selectedUsers, setNewUsers] = useState([])
  const { searchBarProps, filteredItems } = useFilteredUsers(
    availableUsers,
    'fullName'
  )

  useEffect(() => {
    if (initiallySelectedUsers.length) {
      setNewUsers(initiallySelectedUsers)
    }
  }, [initiallySelectedUsers, isOpen])

  const handleOnChangeSelectedAvatars = () => {
    onConfirm(selectedUsers)
    onClose()
  }

  const handleSelectingNewUser = newUsers => {
    if (Array.isArray(newUsers)) {
      setNewUsers(newUsers)
    } else {
      setNewUsers([newUsers])
    }
  }

  const title =
    selectionLimit === 1
      ? 'Choose a photo'
      : `Choose up to ${selectionLimit} photos`

  const modalTitle = (
    <ModalTitleUI>
      <ModalTitleTextUI>{title}</ModalTitleTextUI>
      <Input
        {...searchBarProps}
        autocomplete="off"
        inlineSuffix={<Icon name="search-medium" size="24" />}
        name="quick-search"
        placeholder="Quick Search"
        tabindex="0"
        width="286px"
        aria-label="Search Users"
      />
    </ModalTitleUI>
  )

  const modalCopy =
    filteredItems.length !== 0 ? (
      <Text shade="muted" data-testid="avatars-users-count-description">
        Showing{' '}
        <UserCountTextUI weight={500} shade="default">
          {filteredItems.length} users
        </UserCountTextUI>{' '}
        with photos and access to the Beacon&#39;s Mailbox
      </Text>
    ) : null

  return (
    <ModalUI
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      version={2}
      aria-label={title}
    >
      <ModalUI.Body version={2}>
        {modalCopy}
        <UserSelector
          setUsers={handleSelectingNewUser}
          users={filteredItems}
          value={selectedUsers}
          multiSelectLimit={selectionLimit}
        />
      </ModalUI.Body>
      <ModalUI.ActionFooter
        primaryButtonDisabled={!selectedUsers.length}
        onPrimaryClick={handleOnChangeSelectedAvatars}
        primaryButtonText={selectionLimit === 1 ? 'Add photo' : 'Add photos'}
        onCancel={onClose}
      />
    </ModalUI>
  )
}

AvatarsSelectionModal.propTypes = {
  /** List of available users with avatars to display */
  availableUsers: PropTypes.arrayOf(
    PropTypes.shape({
      fullName: PropTypes.string,
      id: PropTypes.number,
      photo: PropTypes.string,
      role: PropTypes.string,
    })
  ),
  /** List of users id for avatars to be pre-selected */
  initiallySelectedUsers: PropTypes.arrayOf(PropTypes.number),
  /** Indicates if modal is opened */
  isOpen: PropTypes.bool,
  /** Callback when confirm button is clicked */
  onConfirm: PropTypes.func,
  /** Callback when modal is closed */
  onClose: PropTypes.func,
  /** Limit of how many avatars can be selected. */
  selectionLimit: PropTypes.number.isRequired,
}

export default AvatarsSelectionModal
