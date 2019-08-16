import React from 'react'
import { storiesOf } from '@storybook/react'
import EditableField from '../src/components/EditableField'
import { EditableFieldComposite } from '../src/components/EditableField'
import ReadMe from '../src/components/EditableField/docs/EditableFieldComposite.md'

import { jsxDecorator } from 'storybook-addon-jsx'
import { withAktiv } from './utils'
import { ContainerUI } from './EditableField.stories'

const stories = storiesOf('EditableField/Composite', module)
  .addParameters({
    options: { showPanel: false, enableShortcuts: false, isFullscreen: false },
    readme: { sidebar: ReadMe },
  })
  .addDecorator(withAktiv)
  .addDecorator(jsxDecorator)

stories.add('default', () => (
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
))

stories.add('empty', () => (
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
))

stories.add('with custom separator', () => (
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
))

stories.add('large', () => (
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
))
