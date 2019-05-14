import React from 'react'
import { storiesOf } from '@storybook/react'
import ActionSelect from '../src/components/ActionSelect'
import FormGroup from '../src/components/FormGroup'
import Input from '../src/components/Input'
import {
  withKnobs,
  boolean,
  number,
  text,
  select,
} from '@storybook/addon-knobs'

const stories = storiesOf('ActionSelect', module)

stories.add('Default', () => {
  class Example extends React.Component {
    state = {
      value: null,
      values: {
        'open-beacon': {
          text: 'Click for support',
        },
        'search-docs': {
          text: 'Do a search',
          query: '',
        },
      },
    }

    onSelect = value => {
      this.setState({ value })
    }

    onChange = (id, key) => value => {
      this.setState({
        values: {
          ...this.state.values,
          [id]: {
            ...this.state.values[id],
            [key]: value,
          },
        },
      })
    }

    renderContent() {
      switch (this.state.value) {
        case 'open-beacon':
          return (
            <div role="region" aria-label="Open Beacon">
              <FormGroup>
                <Input
                  label="Button text"
                  value={this.state.values['open-beacon'].text}
                  onChange={this.onChange('open-beacon', 'text')}
                />
              </FormGroup>
            </div>
          )
        case 'search-docs':
          return (
            <div>
              <FormGroup>
                <Input
                  label="Button text"
                  value={this.state.values['search-docs'].text}
                  onChange={this.onChange('search-docs', 'text')}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  label="Search query"
                  helpText="Beacon will open to the search results of this query"
                  onChange={this.onChange('search-docs', 'query')}
                  value={this.state.values['search-docs'].query}
                />
              </FormGroup>
            </div>
          )
        default:
          return null
      }
    }

    shouldRefocusOnClose = () => {
      return this.state.value === 'None'
    }

    render() {
      const items = [
        { value: 'None' },
        { value: 'open-beacon', label: 'Open Beacon' },
        { value: 'search-docs', label: 'Search Docs' },
      ]

      return (
        <div style={{ padding: 20, maxWidth: 480, margin: 'auto' }}>
          <ActionSelect
            label="Action Select"
            items={items}
            onSelect={this.onSelect}
            shouldRefocusOnClose={this.shouldRefocusOnClose}
          >
            {this.renderContent()}
          </ActionSelect>
        </div>
      )
    }
  }

  return <Example />
})
