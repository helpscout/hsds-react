import React from 'react'
import { storiesOf } from '@storybook/react'
import EditableTextarea from '../src/components/EditableTextarea'

import ReadMe from '../src/components/EditableField/docs/README.md'

import { ContainerUI, NoteUI } from './EditableField.stories'
import { withAktiv } from './utils'
import EditableField from '../src/components/EditableField'

const stories = storiesOf('EditableTextarea', module)
  .addParameters({
    options: { showPanel: false, enableShortcuts: false, isFullscreen: false },
    readme: { sidebar: ReadMe },
    a11y: { element: 'c-EditableField' },
  })
  .addDecorator(withAktiv)

stories.add('default', () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <NoteUI>
      <ul>
        <li>
          Use <code>Enter</code> to save the note
        </li>
        <li>
          Use <code>Shift + Enter</code> to add line breaks
        </li>
        <li>
          Use <code>Escape</code> to discard changes
        </li>
      </ul>
    </NoteUI>
    <EditableTextarea
      value={`Hello don't forget:
  1. To brush your teeth
  2. Pick up some beer
  3. Maybe pick up some wine too
`}
      maxRows={3}
    />
    <EditableTextarea />
  </ContainerUI>
))
