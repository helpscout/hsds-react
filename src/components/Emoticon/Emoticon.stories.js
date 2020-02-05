import React from 'react'
import { Emoticon } from './Emoticon'

export default {
  component: Emoticon,
  title: 'Components/Badges/Emoticon',
}

const font =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

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
export const Default = () => <Play />

const SIZES = ['lg', 'md', 'sm']
const REACTIONS_EMOTICONS = ['reaction-happy', 'reaction-okay', 'reaction-sad']

export const Reactions = () => (
  <div style={{ fontFamily: font }}>
    <div style={{ margin: '0 0 35px' }}>
      <h4>Default</h4>
      {REACTIONS_EMOTICONS.map(iconName => (
        <div style={{ margin: '0 0 15px' }}>
          <span>{iconName}: </span>
          {SIZES.map(size => (
            <Emoticon size={size} name={iconName} inline />
          ))}
        </div>
      ))}
    </div>

    <div style={{ margin: '0 0 35px' }}>
      <h4>Disabled</h4>
      {REACTIONS_EMOTICONS.map(iconName => (
        <div style={{ margin: '0 0 15px' }}>
          <span>{iconName}: </span>
          {SIZES.map(size => (
            <Emoticon size={size} name={iconName} isDisabled inline />
          ))}
        </div>
      ))}
    </div>

    <div style={{ margin: '0 0 35px' }}>
      <h4>Inactive</h4>
      {REACTIONS_EMOTICONS.map(iconName => (
        <div style={{ margin: '0 0 15px' }}>
          <span>{iconName}: </span>
          {SIZES.map(size => (
            <Emoticon size={size} name={iconName} isActive={false} inline />
          ))}
        </div>
      ))}
    </div>
  </div>
)
