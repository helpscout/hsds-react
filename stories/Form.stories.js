import React from 'react'
import { storiesOf } from '@storybook/react'
import { action as addonAction } from '@storybook/addon-actions'
import { withKnobs, text } from '@storybook/addon-knobs'
import styled from '../src/components/styled'
import { Form, FormGroup, FormLabel, Input } from '../src/index'
import Readme from '../src/components/Form/docs/Form.md'

const action = name => (...args) => {
  addonAction(name)(...args)
  console.log(name, { args })
}

export const ContainerUI = styled('div')`
  form {
    max-width: 60%;
  }
`

const stories = storiesOf('Form', module)

stories.addDecorator(withKnobs).addParameters({ readme: { sidebar: Readme } })

stories.add('default', () => {
  class SampleForm extends React.Component {
    state = {
      text: 'Sample Text',
    }

    handleChange = value => {
      this.setState({
        text: value,
      })
    }

    handleFormSubmit = evt => {
      evt.preventDefault()
      console.log(`Submitting text: "${this.state.text}"`)
      this.setState({ text: '' })
    }

    handleCancel = () => {
      console.log('cancelling!')
      this.setState({ text: '' })
    }

    handleDestroy = () => {
      console.log('deleting!')
      this.setState({ text: '' })
    }
    render() {
      return (
        <ContainerUI>
          <Form
            actionDirection={text('actionDirection', 'left')}
            cancelText={text('cancelText', 'Cancel')}
            destroyText={text('destroyText', 'Delete')}
            onCancel={this.handleCancel}
            onDestroy={this.handleDestroy}
            onSave={this.handleFormSubmit}
            saveText="Save Entry"
          >
            <FormGroup>
              <FormLabel label="Site Name">
                <Input onChange={this.handleChange} value={this.state.text} />
              </FormLabel>
            </FormGroup>
          </Form>
        </ContainerUI>
      )
    }
  }

  return <SampleForm />
})
