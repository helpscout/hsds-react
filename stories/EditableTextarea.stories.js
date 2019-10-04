import React from 'react'
import { storiesOf } from '@storybook/react'
import EditableTextarea from '../src/components/EditableTextarea'

import ReadMe from '../src/components/EditableField/docs/README.md'

import { ContainerUI, NoteUI } from './EditableField.stories'
import { withAktiv } from './utils'

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
      onCommit={({ data }) => {
        console.log('HSDS: data', data)
      }}
    />
    <EditableTextarea
      label="To do"
      value={`Hello don't forget:
  1. To brush your teeth
  2. Pick up some beer
  3. Maybe pick up some wine too
`}
      maxRows={4}
    />
    <EditableTextarea
      label="Jefsum"
      value={`
They're using our own satellites against us.

And the clock is ticking.

Did he just throw my cat out of the window? Yeah, but your scientists were so preoccupied with whether or not they could, they didn't stop to think if they should. Life finds a way.

I was part of something special. Checkmate...

My dad once told me, laugh and the world laughs with you, Cry, and I'll give you something to cry about you little bastard!

Hey, you know how I'm, like, always trying to save the planet? Here's my chance.
`}
      maxRows={10}
    />
  </ContainerUI>
))
