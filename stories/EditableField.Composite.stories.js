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

stories.add('re-render', () => {
  const people = [
    {
      firstName: 'Johnny',
      lastName: 'Cash',
    },
    {
      firstName: 'Nina',
      lastName: 'Simone',
    },
    {
      firstName: 'Frank',
      lastName: 'Sinatra',
    },
    {
      firstName: 'Nancy',
      lastName: 'Sinatra',
    },
    {
      firstName: 'Django',
      lastName: 'Reinhardt',
    },
  ]
  class StatefulStory extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        index: 0,
      }
    }

    nextPerson = () => {
      this.setState({
        index: this.state.index < people.length - 1 ? this.state.index + 1 : 0,
      })
    }

    render() {
      const person = people[this.state.index]
      return (
        <div>
          <EditableFieldComposite placeholder="Add a name">
            <EditableField
              label="First Name"
              name="first_name"
              type="text"
              placeholder="First Name"
              value={person.firstName}
              validate={validateFieldValue}
            />
            <EditableField
              label="Last Name"
              name="last_name"
              type="text"
              placeholder="Last Name"
              value={person.lastName}
              validate={validateFieldValue}
            />
          </EditableFieldComposite>
          <button onClick={this.nextPerson} type="button">
            Change
          </button>
        </div>
      )
    }
  }

  return <StatefulStory />
})

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
