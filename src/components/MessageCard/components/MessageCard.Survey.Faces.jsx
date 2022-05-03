import React from 'react'
import PropTypes from 'prop-types'
import { RateActionUI, SurveyOptionsUI } from './MessageCard.Survey.css'
import { useSurveyContext } from '../MessageCard.Survey.context'
import { getColor } from '../../../styles/utilities/color'

export const MessageCardSurveyFaces = ({
  faces = ['happy', 'okay', 'sad'],
}) => {
  const { onSelection, selected } = useSurveyContext()
  const [emojiSize, setEmojiSize] = React.useState('xl')

  const handleOnClick = id => {
    onSelection(id)
    setTimeout(() => {
      setEmojiSize('lg')
    }, 200)
  }

  return (
    <SurveyOptionsUI>
      {faces.map(face => (
        <RateActionUI
          name={`reaction-${face}`}
          size={emojiSize}
          key={face}
          onClick={() => handleOnClick(face)}
          isActive={selected === face}
          outlineColor={getColor('grey.600')}
        />
      ))}
    </SurveyOptionsUI>
  )
}

MessageCardSurveyFaces.propTypes = {
  faces: PropTypes.arrayOf(PropTypes.oneOf(['happy', 'okay', 'sad'])),
}
