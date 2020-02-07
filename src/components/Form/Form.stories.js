import React from 'react'
import styled from 'styled-components'
import { text, boolean, object } from '@storybook/addon-knobs'
import { Form, FormGroup, FormLabel, Input } from '../index'

export default {
  component: Form,
  title: 'Components/Forms/Form',
  excludeStories: ['ContainerUI'],
}

export const ContainerUI = styled('div')`
  form {
    max-width: 60%;
  }
`

export const WithSaveCancelDelete = () => {
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
            cancelText="Cancel Changes"
            destroyText="Delete Item"
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
}

WithSaveCancelDelete.story = {
  name: 'with save, cancel and delete buttons',
}

export const WithSaveCancelButtons = () => {
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

    render() {
      return (
        <ContainerUI>
          <Form
            actionDirection={text('actionDirection', 'left')}
            cancelText="Cancel Changes"
            onCancel={this.handleCancel}
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
}

WithSaveCancelButtons.story = {
  name: 'with save and cancel buttons',
}

export const WithSaveDeleteButtons = () => {
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

    handleDestroy = () => {
      console.log('deleting!')
      this.setState({ text: '' })
    }
    render() {
      return (
        <ContainerUI>
          <Form
            actionDirection={text('actionDirection', 'left')}
            destroyText="Delete Item"
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
}
WithSaveDeleteButtons.story = {
  name: 'with save and delete buttons',
}

export const WithOnlySaveButton = () => {
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

    render() {
      return (
        <ContainerUI>
          <Form
            actionDirection={text('actionDirection', 'left')}
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
}
WithOnlySaveButton.story = {
  name: 'with only save button',
}

export const WithUnfocusableButtons = () => {
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

    render() {
      return (
        <ContainerUI>
          <Form
            actionDirection="left"
            actionTabbable={boolean('actionTabbable', false)}
            onCancel={() => console.log('cancel')}
            onDestroy={() => console.log('delete')}
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
}
WithUnfocusableButtons.story = {
  name: 'with unfocusable buttons',
}

export const WithCustomButtonProps = () => {
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
            cancelButtonProps={object('cancelButtonProps', {
              isFocused: true,
            })}
            destroyButtonProps={object('destroyButtonProps', {
              isLoading: true,
            })}
            cancelText="Cancel Changes"
            destroyText="Delete Item"
            onCancel={this.handleCancel}
            onDestroy={this.handleDestroy}
            onSave={this.handleFormSubmit}
            saveButtonProps={object('saveButtonProps', { disabled: true })}
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
}
WithCustomButtonProps.story = {
  name: 'with custom button props',
}
