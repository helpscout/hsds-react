import React, { useState } from 'react'
import { createSpec, derived, faker } from '@helpscout/helix'
import AvatarsSelectionModal from './AvatarsSelectionModal'
import { number } from '@storybook/addon-knobs'
import Button from '../Button'

const roles = ['administrator', 'account owner', 'user']

const avatarUserSpec = createSpec({
  id: faker.datatype.number(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  fullName: derived(({ firstName, lastName }) => `${firstName} ${lastName}`),
  initials: derived(
    ({ firstName, lastName }) => `${firstName[0]}${lastName[0]}`
  ),
  photo: faker.image.avatar(),
  role: faker.helpers.randomize(roles),
})

const exampleAvatarsUsers = avatarUserSpec.generate(20)

export function DefaultAvatarsSelectionModal() {
  const [opened, setOpened] = useState(false)
  return (
    <>
      <Button onClick={() => setOpened(true)} kind="primary">
        Open modal
      </Button>
      <AvatarsSelectionModal
        isOpen={opened}
        availableUsers={exampleAvatarsUsers}
        selectionLimit={number('selectionLimit', 5)}
        onClose={() => setOpened(false)}
        onConfirm={() => setOpened(false)}
      />
    </>
  )
}

export function SingleSelectionAvatarsSelectionModal() {
  const [opened, setOpened] = useState(false)
  return (
    <>
      <Button onClick={() => setOpened(true)} kind="primary">
        Open modal
      </Button>
      <AvatarsSelectionModal
        isOpen={opened}
        availableUsers={exampleAvatarsUsers}
        selectionLimit={1}
        onClose={() => setOpened(false)}
        onConfirm={() => setOpened(false)}
      />
    </>
  )
}

export function PreSelectedAvatarsSelectionModal() {
  const [opened, setOpened] = useState(false)
  return (
    <>
      <Button onClick={() => setOpened(true)} kind="primary">
        Open modal
      </Button>
      <AvatarsSelectionModal
        isOpen={opened}
        availableUsers={exampleAvatarsUsers}
        selectionLimit={5}
        initiallySelectedUsers={[
          exampleAvatarsUsers[0].id,
          exampleAvatarsUsers[5].id,
        ]}
        onClose={() => setOpened(false)}
        onConfirm={() => setOpened(false)}
      />
    </>
  )
}
