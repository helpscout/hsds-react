import React from 'react'
import { storiesOf } from '@storybook/react'
import { Emoticon } from './Emoticon'

const font =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

const stories = storiesOf('Emoticon', module)

class Play extends React.Component {
  state = {
    size: 'lg',
    isActive: true,
  }

  render() {
    return (
      <div style={{ fontFamily: font }}>
        <button
          onClick={() => {
            this.setState({ isActive: !this.state.isActive })
          }}
        >
          {this.state.isActive ? 'turn off' : 'turn on'}
        </button>

        <select
          onChange={e => {
            this.setState({ size: e.target.value })
          }}
        >
          <option value="lg" selected={this.state.size === 'lg'}>
            Large
          </option>
          <option value="md" selected={this.state.size === 'md'}>
            Medium
          </option>
          <option value="sm" selected={this.state.size === 'sm'}>
            Small
          </option>
        </select>

        <br />
        <br />

        <div>
          <Emoticon
            isActive={this.state.isActive}
            size={this.state.size}
            name="reaction-happy"
          />
          <br />
          <Emoticon
            isActive={this.state.isActive}
            size={this.state.size}
            name="reaction-okay"
          />
          <br />
          <Emoticon
            isActive={this.state.isActive}
            size={this.state.size}
            name="reaction-sad"
          />
        </div>
      </div>
    )
  }
}
stories.add('Default', () => <Play />)
stories.add('All Variants', () => (
  <div style={{ fontFamily: font }}>
    <div style={{ margin: '10px 0 25px' }}>
      <h4>Sizes</h4>
      <span style={{ marginLeft: '10px' }}>Large:</span>
      <Emoticon size="lg" name="reaction-sad" />
      <br />
      <span style={{ marginLeft: '10px' }}>Medium:</span>
      <Emoticon size="md" name="reaction-sad" />
      <br />
      <span style={{ marginLeft: '10px' }}>Small:</span>
      <Emoticon size="sm" name="reaction-sad" />
    </div>
    <div style={{ margin: '10px 0 25px' }}>
      <h4>Active</h4>
      <span style={{ marginLeft: '10px' }}>On:</span>
      <Emoticon size="lg" name="reaction-sad" isActive />
      <br />
      <span style={{ marginLeft: '10px' }}>Off:</span>
      <Emoticon size="lg" name="reaction-sad" isActive={false} />
    </div>
    <div style={{ margin: '10px 0 25px' }}>
      <h4>"Unclickable"</h4>
      <Emoticon size="lg" name="reaction-sad" clickable={false} />
    </div>
    <div style={{ margin: '10px 0 25px' }}>
      <h4>Disabled</h4>
      <Emoticon size="lg" name="reaction-sad" isDisabled />
    </div>
    <div style={{ margin: '10px 0 25px' }}>
      <h4>Inline</h4>
      <Emoticon size="lg" name="reaction-sad" inline />
      <Emoticon size="lg" name="reaction-happy" inline />
    </div>
  </div>
))
