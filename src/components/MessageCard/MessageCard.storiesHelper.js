import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import NPSMessageCard from './NPS/MessageCard.NPS'
import { boolean, select, text } from '@storybook/addon-knobs'
import { MessageCardSurvey } from './components/survey/MessageCard.Survey'
import { MessageCardSurveyNPS } from './components/survey/MessageCard.Survey.NPS'
import { useEffect, useState } from 'react'
import { getColor, makeBrandColors } from '../../styles/utilities/color'

export const MessageCardStoryWrapperUI = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
`

export function FullNPSExample() {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [maxHeight, setMaxHeight] = useState(false)

  const setMessageMaxHeight = () => {
    window.requestAnimationFrame(() => {
      setMaxHeight(prev => {
        const messageMaxHeight = getMessageMaxHeight()
        if (messageMaxHeight !== prev) {
          return messageMaxHeight
        }
      })
    })
  }

  const getMessageMaxHeight = () => {
    const windowHeight = window.innerHeight
    const marginOffset = 70
    return windowHeight - marginOffset
  }

  useEffect(() => {
    setMessageMaxHeight()
    window.addEventListener('resize', setMessageMaxHeight)

    return () => {
      window.removeEventListener('resize', setMessageMaxHeight)
    }
  }, [])

  const handleSubmit = (data, callback) => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      setIsConfirmed(true)
      callback(true)
    }, 2000)
  }
  return (
    <NPSMessageCard
      key="as-nps"
      in={boolean('show', true)}
      isMobile={boolean('isMobile', false)}
      isWithBoxShadow={boolean('isWithBoxShadow', true)}
      withAnimation={true}
      withContentAnimations={boolean('withContentAnimations', true)}
      align={select('Align', { Right: 'right', Left: 'left' }, 'right')}
      question={text(
        'Question',
        '<p>How likely are you to recommend us to a friend or colleague?</p>'
      )}
      style={{ maxHeight: maxHeight }}
      action={() => (
        <ThemeProvider
          theme={{
            brandColor: makeBrandColors(text('Color', getColor('blue.500'))),
          }}
        >
          <MessageCardSurvey
            withFeedbackForm={boolean('withFeedbackForm', true)}
            feedbackFormText="Tell us why"
            onSubmit={handleSubmit}
            showSpinner={isLoading}
            showConfirmationMessage={isConfirmed}
          >
            <MessageCardSurveyNPS
              detractor={text('Detractor text', 'Not likely')}
              promoter={text('Promoter text', 'Very likely')}
            />
          </MessageCardSurvey>
        </ThemeProvider>
      )}
      poweredLink="/"
    />
  )
}
