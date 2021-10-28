import React from 'react'
import { action } from '@storybook/addon-actions'
import ActionSelect from '.'
import FormGroup from '../FormGroup'
import Checkbox from '../Checkbox'
import Input from '../Input'

export class Example extends React.Component {
  state = {
    value: null,
    values: {
      'open-beacon': {
        text: 'Click for support',
      },
      'search-docs': {
        text: 'Do a search',
        query: '',
        isEnabled: false,
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
            <FormGroup>
              <Checkbox
                label="Enabled"
                onChange={(event, value) => {
                  this.onChange('search-docs', 'isEnabled')(value)
                }}
                checked={this.state.values['search-docs'].isEnabled}
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

  shouldScrollIntoView = item => {
    return item !== 'None'
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
          animationDuration={this.props.animationDuration}
          label="Action Select"
          items={items}
          onAnimationEnd={() => {
            // console.log('onAnimationEnd')
          }}
          onAnimationUpdate={() => {
            // console.log('onAnimationUpdate')
          }}
          onResize={action('onResize')}
          onSelect={this.onSelect}
          shouldScrollIntoView={this.shouldScrollIntoView}
          shouldRefocusOnClose={this.shouldRefocusOnClose}
        >
          {this.renderContent()}
        </ActionSelect>
      </div>
    )
  }
}
