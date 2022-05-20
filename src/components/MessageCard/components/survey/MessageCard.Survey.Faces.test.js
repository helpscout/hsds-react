import React from 'react'
import { render, screen } from '@testing-library/react'
import { MessageCardSurveyFaces } from './MessageCard.Survey.Faces'
import { SurveyContext } from '../../utils/MessageCard.Survey.context'
import userEvent from '@testing-library/user-event'

describe('MessageCard.Survey.Faces', () => {
  test('should render all three reaction faces by default', () => {
    render(<MessageCardSurveyFaces />)

    expect(screen.getAllByRole('button')).toHaveLength(3)
    expect(queryButtonByName('happy face')).toBeInTheDocument()
    expect(queryButtonByName('okay face')).toBeInTheDocument()
    expect(queryButtonByName('sad face')).toBeInTheDocument()
  })

  test('should only render the faces passed in the faces prop', () => {
    render(<MessageCardSurveyFaces faces={['sad', 'happy']} />)

    expect(screen.getAllByRole('button')).toHaveLength(2)

    expect(queryButtonByName('sad face')).toBeInTheDocument()
    expect(queryButtonByName('happy face')).toBeInTheDocument()
    expect(queryButtonByName('okay face')).not.toBeInTheDocument()
  })

  test('should call the onSelection callback from the SurveyContext when a face is selected', () => {
    const onSelection = jest.fn()
    const contextValue = {
      onSelection,
      selected: null,
    }

    render(
      <SurveyContext.Provider value={contextValue}>
        <MessageCardSurveyFaces />
      </SurveyContext.Provider>
    )

    expect(onSelection).not.toHaveBeenCalled()

    userEvent.click(queryButtonByName('okay face'))

    expect(onSelection).toHaveBeenCalledWith('okay')
  })

  function queryButtonByName(name) {
    return screen.queryByRole('button', { name })
  }
})
