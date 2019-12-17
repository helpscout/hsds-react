import React from 'react'
import { storiesOf } from '@storybook/react'
import RateAction from '.'

const stories = storiesOf('RateAction', module)
const font =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

const SIZES = ['lg', 'md', 'sm']
const REACTIONS_EMOTICONS = ['reaction-happy', 'reaction-okay', 'reaction-sad']

stories.add('Default', () => {
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
})

class Play extends React.Component {
  state = {
    isHappyActive: false,
    isOkayActive: false,
    isSadActive: false,
  }

  render() {
    return (
      <div>
        <div>
          <RateAction
            name="reaction-happy"
            isActive={this.state.isHappyActive}
            onClick={() => {
              this.setState({ isHappyActive: !this.state.isHappyActive })
            }}
          />
          <RateAction
            name="reaction-okay"
            size="md"
            isActive={this.state.isOkayActive}
            onClick={() => {
              this.setState({ isOkayActive: !this.state.isOkayActive })
            }}
          />
          <RateAction
            name="reaction-sad"
            size="sm"
            isActive={this.state.isSadActive}
            onClick={() => {
              this.setState({ isSadActive: !this.state.isSadActive })
            }}
          />
        </div>
      </div>
    )
  }
}
stories.add('Active', () => <Play />)

stories.add('Disabled', () => {
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
})
