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

storiesOf('Form', module).add('default', () => (
  <ContainerUI>
    <Form
      actionDirection="left"
      primaryButtonText="Save"
      secondaryButtonText="Cancel"
      seriousButtonText="Delete"
      onFormSubmit={handleFormSubmit}
    >
      <FormGroup>
        <FormLabel label="Site Name">
          <Input value="Dashing Dash" />
        </FormLabel>
      </FormGroup>
    </Form>
  </ContainerUI>
))
