import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveyContext } from '../../utils/MessageCard.Survey.context'
import userEvent from '@testing-library/user-event'
import { MessageCardSurveyMultipleChoice } from './MessageCard.Survey.MultipleChoice'

describe('MessageCard.Survey.MultipleChoice', () => {
  test('should render provided choices', () => {
    render(
      <MessageCardSurveyMultipleChoice
        choices={[
          { id: '1', text: 'first' },
          { id: '2', text: 'second' },
          { id: '3', text: 'third' },
        ]}
      />
    )

    expect(screen.getAllByRole('radio')).toHaveLength(3)
    expect(queryRadioByName('first')).toBeInTheDocument()
    expect(queryRadioByName('second')).toBeInTheDocument()
    expect(queryRadioByName('third')).toBeInTheDocument()
  })

  test('should call the onSelection callback from the SurveyContext when an option is selected', () => {
    const onSelection = jest.fn()
    const contextValue = {
      onSelection,
      selected: null,
    }

    render(
      <SurveyContext.Provider value={contextValue}>
        <MessageCardSurveyMultipleChoice
          choices={[
            { id: '1', text: 'first' },
            { id: '2', text: 'second' },
            { id: '3', text: 'third' },
          ]}
        />
      </SurveyContext.Provider>
    )

    expect(onSelection).not.toHaveBeenCalled()

    userEvent.click(queryRadioByName('second'))

    expect(onSelection).toHaveBeenCalledWith('2')
  })

  function queryRadioByName(name) {
    return screen.queryByRole('radio', { name })
  }
})
