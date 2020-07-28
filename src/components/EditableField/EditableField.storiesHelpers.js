import React from 'react'
import styled from 'styled-components'
import EditableField from '.'

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

export const PHONE_OPTIONS = ['Home', 'Work', 'Other']
export const PAINT_OPTIONS = [
  'Acrylics',
  'Oil',
  'Pastels',
  'Watercolour',
  'Other',
]
export const BARCELONA = {
  value: 'FC Barcelona',
  id: 'TEAM_1',
  someOtherProp: 'the best, Jerry, the best',
}
export const ARSENAL = {
  value: 'Arsenal',
  disabled: true,
  id: 'TEAM_2',
  someOtherProp: 'the best, Jerry, the best',
}
export const ATLAS = {
  value: 'Atlas',
  disabled: true,
  id: 'TEAM_3',
  someOtherProp: 'the best, Jerry, the best',
}

export class ValidationApp extends React.Component {
  state = { timeout: 100 }

  validateFieldValue = payload => {
    console.log('validating')

    const { name, value } = payload
    let isValid = value !== 'off' && value !== 'other' && value !== 'warn'

    return new Promise(resolve => {
      setTimeout(function () {
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
