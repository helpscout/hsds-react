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

storiesOf('Form', module).add('default', () => (
  <ContainerUI>
    <Form>
      <FormGroup>
        <FormLabel label="Site Name">
          <Input value="Dashing Dash" />
        </FormLabel>
      </FormGroup>

      <Form.Actions
        direction="left"
        primary={
          <Button
            kind="primary"
            size="lg"
            version={2}
            onClick={action('Save Changes')}
          >
            Save Changes
          </Button>
        }
        secondary={
          <Button size="md" version={2} onClick={action('Discard Changes')}>
            Discard Changes
          </Button>
        }
        serious={
          <Button
            state="danger"
            size="md"
            version={2}
            onClick={action('Something Serious')}
          >
            Something serious!
          </Button>
        }
      />
    </Form>
  </ContainerUI>
))
