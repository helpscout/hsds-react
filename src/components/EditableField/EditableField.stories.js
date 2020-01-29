import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withAktiv } from '../../utilities/storybook'
import EditableField from '.'
import { EditableFieldComposite } from '.'

const stories = storiesOf('EditableField', module)
  .addParameters({
    options: { showPanel: true, enableShortcuts: false, isFullscreen: false },
    a11y: { element: 'c-EditableField' },
  })
  .addDecorator(withAktiv)

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

stories.add('Text', () => (
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
))

stories.add('Text large', () => (
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
))

stories.add('Floating Labels', () => (
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
))

stories.add('Text Multiple', () => (
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
))

stories.add('Text Multiple Large', () => (
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
))

stories.add('Email Multiple', () => (
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
))

stories.add('Url', () => (
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
))

stories.add('Number', () => (
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
))

stories.add('With options', () => (
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
))

stories.add('With options large', () => (
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
))

stories.add('With options multiple', () => (
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
))

stories.add('Disabled', () => (
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
))

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

stories.add('Validation', () => <ValidationApp />)

stories.add('Key Events', () => (
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
      onKeyUp={action('onKeyUp')}
    />
  </ContainerUI>
))

class ValuePropsApp extends React.Component {
  state = {
    value: BARCELONA,
    multiValue: ['barcelona', 'atlas'],
    compositeValue: ['Johnny', 'Cash'],
  }

  render() {
    return (
      <ContainerUI
        onSubmit={e => {
          e.preventDefault()
        }}
      >
        <h2>Single value field</h2>
        <EditableField
          label="Team"
          name="team"
          placeholder="Add a sports team name"
          type="text"
          value={this.state.value}
        />

        <button
          onClick={() => {
            this.setState({ value: BARCELONA })
          }}
        >
          Barcelona
        </button>
        <button
          onClick={() => {
            this.setState({ value: ARSENAL })
          }}
        >
          Arsenal
        </button>
        <button
          onClick={() => {
            this.setState({ value: ATLAS })
          }}
        >
          Atlas
        </button>
        <button
          onClick={() => {
            if (!this.state.loop) {
              const interval = setInterval(() => {
                this.setState({
                  value: { ...ATLAS, disabled: !this.state.value.disabled },
                })
              }, 500)
              this.setState({ loop: interval })
            } else {
              clearInterval(this.state.loop)
              this.setState({ loop: null })
            }
          }}
        >
          Atlas enabling/disabling loop{' '}
          {this.state.loop ? '(click again to turn off)' : ''}
        </button>
        <pre>
          <code>{JSON.stringify(this.state.value, null, 2)}</code>
        </pre>
        <br />
        <h2>Multiple value fields</h2>
        <EditableField
          label="Team"
          name="team"
          placeholder="Add a sports team name"
          type="text"
          value={this.state.multiValue}
        />

        <button
          onClick={() => {
            this.setState({
              multiValue: ['barcelona', 'atlas', 'arsenal'],
            })
          }}
        >
          3 teams
        </button>
        <button
          onClick={() => {
            this.setState({
              multiValue: ['barcelona', 'atlas'],
            })
          }}
        >
          2 teams
        </button>
        <button
          onClick={() => {
            this.setState({ multiValue: [ATLAS] })
          }}
        >
          1 team
        </button>
        <button
          onClick={() => {
            this.setState({ multiValue: [] })
          }}
        >
          No teams
        </button>
        <pre>
          <code>{JSON.stringify(this.state.multiValue, null, 2)}</code>
        </pre>
        <br />
        <h2>Composite Fields</h2>
        <EditableFieldComposite placeholder="Add a name">
          <EditableField
            label="First Name"
            name="first_name"
            type="text"
            placeholder="First Name"
            value={this.state.compositeValue[0]}
          />
          <EditableField
            label="Last Name"
            name="last_name"
            type="text"
            placeholder="Last Name"
            value={this.state.compositeValue[1]}
          />
        </EditableFieldComposite>
        <br />
        <button
          onClick={() => {
            this.setState({ compositeValue: ['George', 'Harrison'] })
          }}
        >
          George Harrison
        </button>
        <button
          onClick={() => {
            this.setState({ compositeValue: ['Johhny', 'Cash'] })
          }}
        >
          Johhny Cash
        </button>
        <pre>
          <code>{JSON.stringify(this.state.compositeValue, null, 2)}</code>
        </pre>
      </ContainerUI>
    )
  }
}

stories.add('Value from props', () => <ValuePropsApp />)

class OnCommitApp extends React.PureComponent {
  state = {
    passed: null,
  }

  render() {
    return (
      <ContainerUI
        onSubmit={e => {
          e.preventDefault()
        }}
      >
        <EditableField
          label="Teams (individual fields disabled)"
          name="teams"
          type="text"
          placeholder="Add a team name"
          value={[
            BARCELONA,
            { ...ARSENAL, disabled: false },
            { ...ATLAS, disabled: false },
          ]}
          onCommit={passed => {
            this.setState({ commit: passed })
          }}
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
          onCommit={passed => {
            this.setState({ commit: passed })
          }}
        />
        <h3>Data passed to onCommit: </h3>
        <pre>
          <code>
            {this.state.commit
              ? JSON.stringify(this.state.commit, null, 2)
              : ''}
          </code>
        </pre>
      </ContainerUI>
    )
  }
}

stories.add('On Commit', () => <OnCommitApp />)
