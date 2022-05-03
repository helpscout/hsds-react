import React from 'react'
import PropTypes from 'prop-types'
import { RateActionUI, SurveyOptionsUI } from './MessageCard.Survey.css'
import { useSurveyContext } from '../MessageCard.Survey.context'
import { getColor } from '../../../styles/utilities/color'
import { useButtonResizeOnSelection } from '../utils/MessageCard.hooks'

export const MessageCardSurveyFaces = ({
  faces = ['happy', 'okay', 'sad'],
}) => {
  const { onSelection, selected } = useSurveyContext()
  const { buttonSize, handleOnClick } = useButtonResizeOnSelection({
    defaultSize: 'xl',
    selectedSize: 'lg',
    onSelection,
  })

  return (
    <SurveyOptionsUI>
      {faces.map(face => (
        <RateActionUI
          key={face}
          size={buttonSize}
          name={`reaction-${face}`}
          aria-label={`${face} face`}
          isActive={selected === face}
          onClick={() => handleOnClick(face)}
          outlineColor={getColor('grey.600')}
        />
      ))}
    </SurveyOptionsUI>
  )
}

MessageCardSurveyFaces.propTypes = {
  faces: PropTypes.arrayOf(PropTypes.oneOf(['happy', 'okay', 'sad'])),
}
