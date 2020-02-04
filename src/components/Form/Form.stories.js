import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import styled from 'styled-components'
import { Form, FormGroup, FormLabel, Input } from '../index'

export const ContainerUI = styled('div')`
  form {
    max-width: 60%;
  }
`

const stories = storiesOf('Deleted/Form', module)

stories.addDecorator(withKnobs)

stories.add('with save, cancel and delete buttons', () => {
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
})

stories.add('with save and cancel buttons', () => {
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
})

stories.add('with save and delete buttons', () => {
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
})

stories.add('with only save button', () => {
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
})

stories.add('with unfocusable buttons', () => {
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
})
