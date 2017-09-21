import React from 'react'
import PropTypes from 'prop-types'
import { emojiIndex, Picker } from 'emoji-mart'
import classNames from '../../utilities/classNames'

export const propTypes = Object.assign(Picker.propTypes, {
  showPreview: PropTypes.bool
})

const defaultProps = {
  color: '#3197d6',
  emoji: 'point_up',
  set: 'apple',
  skin: 1,
  title: 'Pick an emoji',
  showPreview: false
}

const EmojiPicker = props => {
  const {
    className,
    showPreview,
    style,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-EmojiPicker',
    showPreview && 'is-show-preview',
    !showPreview && 'is-hide-preview',
    className
  )

  return (
    <div className={componentClassName} style={style}>
      <Picker {...rest} />
    </div>
  )
}

EmojiPicker.propTypes = propTypes
EmojiPicker.defaultProps = defaultProps
EmojiPicker.Index = emojiIndex

export default EmojiPicker
