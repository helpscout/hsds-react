import React from 'react'
import PropTypes from 'prop-types'

import { BlankSlate, CheckMarkCardGridUI } from './UserSelector.css'
import CheckMarkCard from '../../../CheckMarkCard'
import { toStartCase } from '../../../../utilities/strings'

function UserSelector({ setUsers, users = [], value, multiSelectLimit = 5 }) {
  if (!users || users.length === 0) {
    return <BlankSlate>No one matches your search.</BlankSlate>
  }

  return (
    <CheckMarkCardGridUI
      value={value}
      choiceMaxWidth="170px"
      choiceHeight="160px"
      onChange={setUsers}
      multiSelectLimit={multiSelectLimit}
      multiSelect={multiSelectLimit > 1}
    >
      {users.map(user => {
        return (
          <CheckMarkCard
            avatar={user.photo}
            label={user.fullName}
            key={user.id}
            value={user.id}
            aria-label={`${user.fullName} ${user.role}`}
            aria-checked={!!value.find(userId => userId === user.id)}
            subtitle={toStartCase(user.role)}
          />
        )
      })}
    </CheckMarkCardGridUI>
  )
}

UserSelector.propTypes = {
  setUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
  multiSelectLimit: PropTypes.number.isRequired,
}

export default UserSelector
