import React from 'react'
import styled from 'styled-components'
import { action } from '@storybook/addon-actions'
import { withAktiv } from '../../utilities/storybook'
import EditableField from '.'

export default {
  component: EditableField,
  title: 'Components/EditableField',
}

export const ContainerUI = styled('div')`
  width: 300px;
  padding: 20px;
  background-color: white;
  margin: 10px auto;
  border: 1px solid rgba(155, 155, 195, 0.4);
  border-radius: 3px;
`

export const NoteUI = styled('div')`
  width: 100%;
  padding: 20px;
  background-color: rgba(155, 155, 195, 0.1);
  margin: 20px auto;
  border: 1px solid #6bc0ff;
  border-radius: 3px;
  color: rgba(155, 155, 195, 1);

  p {
    margin: 0 0 20px 0;

    &:last-child {
      margin: 0;
    }
  }

  ul {
    padding: 0;
    margin: 0;
    list-style-position: inside;
  }

  li {
    margin-bottom: 10px;
  }

  code {
    border: 1px solid rgba(125, 115, 165, 0.5);
    display: inline-block;
    padding: 2px 3px;
  }
`

const PHONE_OPTIONS = ['Home', 'Work', 'Other']
const PAINT_OPTIONS = ['Acrylics', 'Oil', 'Pastels', 'Watercolour', 'Other']
const BARCELONA = {
  value: 'FC Barcelona',
  id: 'TEAM_1',
  someOtherProp: 'the best, Jerry, the best',
}
const ARSENAL = {
  value: 'Arsenal',
  disabled: true,
  id: 'TEAM_2',
  someOtherProp: 'the best, Jerry, the best',
}
const ATLAS = {
  value: 'Atlas',
  disabled: true,
  id: 'TEAM_3',
  someOtherProp: 'the best, Jerry, the best',
}

export const Default = () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableField
      label="Company"
      name="company"
      placeholder="Add a company name"
      type="text"
    />
    <EditableField
      label="Team"
      name="team"
      placeholder="Add a sports team name"
      type="text"
      value="Atlas"
    />
  </ContainerUI>
)

Default.story = {
  name: 'default',
}

export const TextLarge = () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableField
      label="Team"
      name="team"
      placeholder="Add a sports team name"
      size="lg"
      type="text"
      value="Barcelona FC"
    />
  </ContainerUI>
)

TextLarge.story = {
  name: 'Text large',
}

export const FloatingLabels = () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableField
      label="Company"
      name="company"
      placeholder="Company"
      type="text"
      floatingLabels
    />
    <EditableField
      label="Team"
      name="team"
      placeholder="Sports team"
      type="text"
      value="Atlas"
      floatingLabels
    />
  </ContainerUI>
)

export const TextMultiple = () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableField
      label="Films"
      name="films"
      type="text"
      multipleValues
      placeholder="Add a film name"
    />
    <EditableField
      label="Musicians"
      name="musicians"
      type="text"
      placeholder="Add a musician name"
      value={['George Harrison', 'Neil Young']}
    />
  </ContainerUI>
)

export const TextMultipleLarge = () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableField
      label="Musicians"
      name="musicians"
      type="text"
      placeholder="Add a musician name"
      size="lg"
      value={['George Harrison', 'Neil Young']}
    />
  </ContainerUI>
)

export const EmailMultiple = () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableField
      emphasizeTopValue
      label="Emails"
      name="email"
      placeholder="Add your email"
      type="email"
      value={[
        'a@hello.com',
        'art_vandelay@vandelayindustries.com',
        'john_locke@dharma.org',
        'pennypacker@kramerica.com',
        'this_is_kind_of_long@annoyingemails.com',
        'this_is_kind_of_long@evenmoreannoyingemails.com',
      ]}
    />
  </ContainerUI>
)

export const Url = () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableField
      label="Website"
      name="website"
      placeholder="Add a website address"
      type="url"
      value="http://mysite.net"
      actions={{
        name: 'link',
        callback(obj) {
          console.log('HSDS: EditableFieldApp -> callback -> obj', obj)
        },
      }}
    />
    <EditableField
      label="Website Without Protocol"
      name="website2"
      placeholder="Add a website address"
      type="url"
      value="mysite.net"
      actions={{
        name: 'link',
        callback(obj) {
          console.log('HSDS: EditableFieldApp -> callback -> obj', obj)
        },
      }}
    />
  </ContainerUI>
)

export const Number = () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <NoteUI>
      <p>
        There is no special handling of inputs of type "number", other than
        removing the little up/down buttons that browsers add.
      </p>
      <p>Using the up/down keys and scrolling still work as expected</p>
    </NoteUI>
    <EditableField
      label="Amount"
      name="amount"
      placeholder="Add the amount"
      type="number"
      value="166"
    />
  </ContainerUI>
)

export const WithOptions = () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableField
      label="Mobile Phone"
      name="mobilephone"
      placeholder="Add a mobile phone"
      type="tel"
      valueOptions={PHONE_OPTIONS}
    />

    <EditableField
      label="Phone"
      name="Phone"
      placeholder="Add phone"
      type="tel"
      valueOptions={PHONE_OPTIONS}
      defaultOption={PHONE_OPTIONS[2]}
      value={{ option: 'Work', value: '123456789' }}
    />
  </ContainerUI>
)

WithOptions.story = {
  name: 'With options',
}

export const WithOptionsLarge = () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableField
      label="Phone"
      name="Phone"
      placeholder="Add phone"
      size="lg"
      type="tel"
      valueOptions={PHONE_OPTIONS}
      defaultOption={PHONE_OPTIONS[2]}
      value={{ option: 'Work', value: '123456789' }}
    />
  </ContainerUI>
)

WithOptionsLarge.story = {
  name: 'With options large',
}

export const WithOptionsMultiple = () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableField
      label="Favourite Paint Colour"
      name="paint"
      placeholder="Add a colour"
      type="text"
      valueOptions={PAINT_OPTIONS}
      value={[
        { option: PAINT_OPTIONS[0], value: 'Anthraquinone Blue PB60' },
        { option: PAINT_OPTIONS[3], value: 'Ultramarine Violet' },
        { option: PAINT_OPTIONS[1], value: 'Bismuth Yellow' },
      ]}
    />
  </ContainerUI>
)

WithOptionsMultiple.story = {
  name: 'With options multiple',
}

export const Disabled = () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableField
      label="Film"
      name="film"
      placeholder="Add a film name"
      type="text"
      disabled
    />
    <EditableField
      label="Company"
      name="company"
      placeholder="Add a company name"
      type="text"
      value="Help Scout"
      disabled
    />
    <EditableField
      label="Musicians"
      name="musicians"
      type="text"
      placeholder="Add a musician name"
      value={['George Harrison', 'Neil Young']}
      disabled
    />
    <EditableField
      label="Teams (individual fields disabled)"
      name="teams"
      type="text"
      placeholder="Add a team name"
      value={[ARSENAL, ATLAS, BARCELONA]}
    />
    <EditableField
      label="Phone"
      name="Phone"
      placeholder="Add phone"
      type="tel"
      valueOptions={PHONE_OPTIONS}
      defaultOption={PHONE_OPTIONS[2]}
      value={{ option: 'Work', value: '123456789' }}
      disabled
    />
  </ContainerUI>
)

class ValidationApp extends React.Component {
  state = { timeout: 100 }

  validateFieldValue = payload => {
    console.log('validating')

    const { name, value } = payload
    let isValid = value !== 'off' && value !== 'other' && value !== 'warn'

    return new Promise(resolve => {
      setTimeout(function() {
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
      }, this.state.timeout)
    })
  }

  render() {
    const { timeout } = this.state

    return (
      <ContainerUI
        onSubmit={e => {
          e.preventDefault()
        }}
      >
        <NoteUI>
          Type:
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
          <p>Delay the time it takes for the validation to resolve:</p>
          <label htmlFor="timoeut">
            Timeout:
            <input
              style={{
                marginLeft: '10px',
                width: '70px',
                padding: '3px',
                textAlign: 'right',
                borderRadius: '3px',
                border: '0',
              }}
              type="number"
              value={timeout}
              onChange={event => {
                this.setState({ timeout: event.target.value })
              }}
            />{' '}
            ms
          </label>
        </NoteUI>
        <EditableField
          label="team"
          name="team"
          placeholder="Add a team name"
          type="text"
          value="atlas"
          validate={this.validateFieldValue}
        />
        <EditableField
          label="Musicians"
          name="musicians"
          type="text"
          placeholder="Add a musician name"
          value={['George Harrison', 'Neil Young']}
          validate={this.validateFieldValue}
        />

        <EditableField
          label="Favourite Paint Colour"
          name="paint"
          placeholder="Add a colour"
          type="text"
          valueOptions={PAINT_OPTIONS}
          value={[
            { option: PAINT_OPTIONS[0], value: 'Anthraquinone Blue PB60' },
            { option: PAINT_OPTIONS[3], value: 'Ultramarine Violet' },
            { option: PAINT_OPTIONS[1], value: 'Bismuth Yellow' },
          ]}
          validate={this.validateFieldValue}
        />
      </ContainerUI>
    )
  }
}

export const Validation = () => <ValidationApp />
