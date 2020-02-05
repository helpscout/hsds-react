import React from 'react'
import { ContainerUI, NoteUI } from '../EditableField/EditableField.stories'
import { withAktiv } from '../../utilities/storybook'
import EditableTextarea from '.'

// const stories = storiesOf('Components/EditableTextarea', module)
// .addParameters({
//   options: { showPanel: false, enableShortcuts: false, isFullscreen: false },
//   a11y: { element: 'c-EditableField' },
// })
// .addDecorator(withAktiv);

export default {
  component: EditableTextarea,
  title: 'Components/EditableTextarea',
}

export const Default = () => (
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
)

Default.story = {
  name: 'default',
}

export const FloatingLabels = () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableTextarea
      label="Notes"
      id="notes"
      label="Some notes"
      placeholder="Some notes"
      floatingLabels
    />
    <EditableTextarea
      floatingLabels
      id="todo"
      label="Some todos"
      placeholder="Some todos"
      value={`Hello don't forget:
  1. To brush your teeth
  2. Pick up some beer
  3. Maybe pick up some wine too
`}
      maxRows={4}
    />
  </ContainerUI>
)

FloatingLabels.story = {
  name: 'floating labels',
}

export const Validation = () => (
  <ContainerUI>
    <NoteUI>
      <p>Type:</p>
      <ul>
        <li>
          <strong>"off"</strong> to get the error style
        </li>
        <li>
          <strong>"warn"</strong> to get a warning style
        </li>
        <li>
          <strong>"other"</strong> to get a custom validation style
        </li>
      </ul>
    </NoteUI>
    <EditableTextarea
      label="To do"
      maxRows={4}
      validate={validateFieldValue}
      onCommit={({ data }) => {
        console.log('commit data', data)
      }}
    />
  </ContainerUI>
)

function validateFieldValue(payload) {
  console.log('validating')

  const { name, value } = payload
  let isValid = value !== 'off' && value !== 'other' && value !== 'warn'

  return new Promise(resolve => {
    setTimeout(function() {
      if (isValid) {
        resolve({ isValid, name, value })
      } else {
        if (value === 'off') {
          resolve({
            isValid,
            name,
            value,
            type: 'error',
            message: 'That is definitely not right',
          })
        } else if (value === 'warn') {
          resolve({
            isValid,
            name,
            value,
            type: 'warning',
            message: "That's it, you have been warned",
          })
        } else if (value === 'other') {
          resolve({
            isValid,
            name,
            value,
            type: 'other',
            message: "I don't know what you're talking about, have a trophy",
            color: '#57c28d',
            icon: 'activity',
          })
        }
      }
    }, 500)
  })
}
