import React from 'react'
import styled from 'styled-components'
import EditableField from '.'
import { EditableFieldComposite } from '.'

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

export const ContainerUI = styled('div')`
  width: 300px;
  padding: 20px;
  background-color: white;
  margin: 10px auto;
  border: 1px solid rgba(155, 155, 195, 0.4);
  border-radius: 3px;
`

// Passing value as props example

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

// On commit example

const PAINT_OPTIONS = ['Acrylics', 'Oil', 'Pastels', 'Watercolour', 'Other']

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

// stories.add('On Commit', () => <OnCommitApp />)
