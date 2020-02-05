import React from 'react'
import { withAktiv } from '../../utilities/storybook'
import { ContainerUI } from './EditableField.stories'
import EditableField from '.'
import { EditableFieldComposite } from '.'

// const stories = storiesOf('Components/EditableFieldComposite', module)
// .addParameters({
//   options: { showPanel: false, enableShortcuts: false, isFullscreen: false },
// })
// .addDecorator(withAktiv);
export default {
  component: EditableFieldComposite,
  title: 'Components/Forms/EditableFieldComposite',
}

export const Default = () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableFieldComposite placeholder="Add a name">
      <EditableField
        label="First Name"
        name="first_name"
        type="text"
        placeholder="First Name"
        value="Johnny"
        validate={validateFieldValue}
      />
      <EditableField
        label="Last Name"
        name="last_name"
        type="text"
        placeholder="Last Name"
        value="Cash"
        validate={validateFieldValue}
      />
    </EditableFieldComposite>
  </ContainerUI>
)

Default.story = {
  name: 'default',
}

export const Empty = () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableFieldComposite placeholder="Add a pet">
      <EditableField
        label="Animal"
        name="animal"
        type="text"
        placeholder="Animal"
      />
      <EditableField label="Name" name="name" type="text" placeholder="name" />
    </EditableFieldComposite>
  </ContainerUI>
)

Empty.story = {
  name: 'empty',
}

export const WithCustomSeparator = () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableFieldComposite placeholder="Add a place" separator=",">
      <EditableField
        label="City"
        name="city"
        type="text"
        placeholder="City"
        value="Barcelona"
        onInputFocus={() => {
          console.log('execute!')
        }}
      />
      <EditableField
        label="Country"
        name="country"
        type="text"
        placeholder="Country"
        value="Spain"
      />
    </EditableFieldComposite>
  </ContainerUI>
)

WithCustomSeparator.story = {
  name: 'with custom separator',
}

export const Large = () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableFieldComposite placeholder="Add a name" size="lg">
      <EditableField
        label="First Name"
        name="first_name"
        type="text"
        placeholder="First Name"
        value="Johnny"
        onInputFocus={() => {
          console.log('execute!')
        }}
      />
      <EditableField
        label="Last Name"
        name="last_name"
        type="text"
        placeholder="Last Name"
        value="Cash"
      />
    </EditableFieldComposite>
  </ContainerUI>
)

Large.story = {
  name: 'large',
}

function validateFieldValue(payload) {
  console.log('validating')

  const { name, value } = payload
  let isValid = value !== 'off' && value !== 'other' && value !== 'warn'

  return new Promise(resolve => {
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
  })
}
