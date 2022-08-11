import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SurveyContext } from '../../utils/MessageCard.Survey.context'
import { MessageCardSurveyEmoji } from './MessageCard.Survey.Emoji'

describe('MessageCard.Survey.Emoji', () => {
  test('should only render the emojis passed in the emojis prop', () => {
    render(
      <MessageCardSurveyEmoji
        emojis={[
          { id: 'happy', name: 'Happy', unicode: '1f600' },
          { id: 'sad', name: 'Sad', unicode: '1f622' },
        ]}
      />
    )

    expect(screen.getAllByRole('button')).toHaveLength(2)

    expect(queryButtonByName('Happy')).toBeInTheDocument()
    expect(queryButtonByName('Sad')).toBeInTheDocument()
  })

  test('should render a native emoji instead of an image if the native prop is provided', () => {
    render(
      <MessageCardSurveyEmoji
        emojis={[
          { id: 'happy', name: 'Happy', unicode: '1f600' },
          { id: 'sad', name: 'Sad', unicode: '1f622' },
          {
            id: 'grimacing',
            name: 'Grimacing',
            unicode: '1f62c',
            native: '😬',
          },
        ]}
      />
    )

    expect(screen.getAllByRole('button')).toHaveLength(3)

    expect(queryButtonByName('Happy')).toBeInTheDocument()
    expect(queryButtonByName('Sad')).toBeInTheDocument()
    expect(queryButtonByName('Grimacing')).toBeInTheDocument()
    expect(queryButtonByName('Grimacing')).toHaveTextContent('😬')
  })

  test('should call the onSelection callback from the SurveyContext when an emoji is selected', () => {
    const onSelection = jest.fn()
    const contextValue = {
      onSelection,
      selected: null,
    }

    render(
      <SurveyContext.Provider value={contextValue}>
        <MessageCardSurveyEmoji
          emojis={[
            { id: '+1::skin-tone-3', name: 'Thumbs Up', unicode: '1f602' },
            { id: 'sad', name: 'Sad', unicode: '1f622' },
          ]}
        />
      </SurveyContext.Provider>
    )

    expect(onSelection).not.toHaveBeenCalled()

    userEvent.click(queryButtonByName('Thumbs Up'))

    expect(onSelection).toHaveBeenCalledWith('+1::skin-tone-3')
  })

  function queryButtonByName(name) {
    return screen.queryByRole('button', { name })
  }
})
