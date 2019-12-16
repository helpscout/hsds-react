import React from 'react'
import { storiesOf } from '@storybook/react'
import { Emoticon } from './Emoticon'
import EMOTICONS from './Emoticon.icons'

import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import { withArtboard } from '@helpscout/artboard'

const stories = storiesOf('Emoticon', module)
stories.addDecorator(
  withArtboard({
    id: 'hsds-emoticon',
    width: 100,
    height: 100,
    withCenterGuides: false,
  })
)
stories.addDecorator(withKnobs)
class Play extends React.Component {
  state = {
    size: 'lg',
    isActive: true,
  }

  render() {
    return (
      <div>
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
