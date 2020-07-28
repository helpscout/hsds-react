import React from 'react'
import {
  ContainerUI,
  NoteUI,
} from '../EditableField/EditableField.storiesHelpers'
import EditableTextarea from '.'

export const ValidationApp = () => (
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
    setTimeout(function () {
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
