import React from 'react'
import { storiesOf } from '@storybook/react'
import { Emoji, EmojiPicker, Text } from '../src/index.js'

const stories = storiesOf('EmojiPicker', module)

class Wrapper extends React.Component {
  constructor () {
    super()
    this.state = { emoji: null }
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick (emoji) {
    console.log(emoji)
    this.setState({
      emoji
    })
  }

  render () {
    const { emoji } = this.state
    const handleOnClick = this.handleOnClick

    const emojiMarkup = emoji ? (
      <Emoji emoji={emoji} size={20} />
    ) : null

    return (
      <div>
        <EmojiPicker onClick={handleOnClick} />
        <br />
        <div>
          <Text>Selected:</Text><br />
          <Text>{emojiMarkup}</Text>
        </div>
      </div>
    )
  }
}

stories.add('default', () => (
  <Wrapper />
))
