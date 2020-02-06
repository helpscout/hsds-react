import React from 'react'
import RateAction from '.'

export default {
  component: RateAction,
  title: 'Components/Badges/RateAction',
}

const font =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

const SIZES = ['lg', 'md', 'sm']
const REACTIONS_EMOTICONS = ['reaction-happy', 'reaction-okay', 'reaction-sad']

export const Default = () => {
  return (
    <div style={{ fontFamily: font }}>
      <h4>Default</h4>
      {REACTIONS_EMOTICONS.map(iconName => (
        <div style={{ margin: '0 0 15px' }}>
          <span>{iconName}: </span>
          {SIZES.map(size => (
            <RateAction size={size} name={iconName} />
          ))}
        </div>
      ))}
    </div>
  )
}

stories.add('withBorder', () => {
  return (
    <div style={{ fontFamily: font }}>
      <h4>Default</h4>
      {REACTIONS_EMOTICONS.map(iconName => (
        <div style={{ margin: '0 0 15px', clear: 'both' }}>
          <span style={{ float: 'left', marginRight: 20 }}>{iconName}: </span>
          {SIZES.map(size => (
            <div
              style={{
                height: 64,
                float: 'left',
                verticalAlign: 'middle',
                display: 'table-cell',
                marginLeft: 32,
              }}
            >
              <RateAction size={size} name={iconName} withBorder={true} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
})

class Play extends React.Component {
  state = {
    activeReaction: null,
  }

  render() {
    return (
      <div>
        <div style={{ margin: '0 0 20px' }}>
          <select
            onChange={e => {
              this.setState({ activeReaction: e.target.value })
            }}
          >
            <option value="" selected={this.state.activeReaction == null}>
              Choose one...
            </option>
            <option
              value="happy"
              selected={this.state.activeReaction === 'happy'}
            >
              happy
            </option>
            <option
              value="okay"
              selected={this.state.activeReaction === 'okay'}
            >
              okay
            </option>
            <option value="sad" selected={this.state.activeReaction === 'sad'}>
              sad
            </option>
          </select>
        </div>
        <div>
          <RateAction
            name="reaction-happy"
            style={{ margin: '0 15px 0 0' }}
            isActive={this.state.activeReaction === 'happy'}
            onClick={() => {
              this.setState({ activeReaction: 'happy' })
            }}
          />
          <RateAction
            name="reaction-okay"
            style={{ margin: '0 15px 0 0' }}
            isActive={this.state.activeReaction === 'okay'}
            onClick={() => {
              this.setState({ activeReaction: 'okay' })
            }}
          />
          <RateAction
            name="reaction-sad"
            style={{ margin: '0 15px 0 0' }}
            isActive={this.state.activeReaction === 'sad'}
            onClick={() => {
              this.setState({ activeReaction: 'sad' })
            }}
          />
        </div>
      </div>
    )
  }
}
export const Active = () => <Play />

export const Disabled = () => {
  return (
    <div style={{ fontFamily: font }}>
      {REACTIONS_EMOTICONS.map(iconName => (
        <div style={{ margin: '0 0 15px' }}>
          <span>{iconName}: </span>
          {SIZES.map(size => (
            <RateAction size={size} name={iconName} disabled />
          ))}
        </div>
      ))}
    </div>
  )
}
