import React from 'react'
import { storiesOf } from '@storybook/react'
import { action as addonAction } from '@storybook/addon-actions'
import styled from '../src/components/styled'
import { Button, Form, FormGroup, FormLabel, Input } from '../src/index'

const action = name => (...args) => {
  addonAction(name)(...args)
  console.log(name, { args })
}

export const ContainerUI = styled('div')`
  form {
    max-width: 60%;
  }
`
const handleFormSubmit = evt => {
  evt.preventDefault()
  console.log('submitted the form!')
}

const handleCancel = () => {
  console.log('cancelling!')
}

const handleDestroy = () => {
  console.log('deleting!')
}

storiesOf('Form', module).add('default', () => (
  <ContainerUI>
    <Form
      actionDirection="left"
      cancelText="Cancel"
      destroyText="Delete"
      onCancel={handleCancel}
      onDestroy={handleDestroy}
      onSave={handleFormSubmit}
      saveText="Save Entry"
    >
      <FormGroup>
        <FormLabel label="Site Name">
          <Input value="Dashing Dash" />
        </FormLabel>
      </FormGroup>
    </Form>
  </ContainerUI>
))
