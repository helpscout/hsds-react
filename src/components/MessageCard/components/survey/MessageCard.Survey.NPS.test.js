import React from 'react'
import { act, render, screen } from '@testing-library/react'
import { MessageCardSurvey } from './MessageCard.Survey'
import { MessageCardSurveyNPS } from './MessageCard.Survey.NPS'
import userEvent from '@testing-library/user-event'

describe('NPS survey action', () => {
  jest.useFakeTimers()

  it('should render scores 0-10', () => {
    render(
      <MessageCardSurvey>
        <MessageCardSurveyNPS />
      </MessageCardSurvey>
    )

    expect(screen.getByRole('button', { name: '0' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '6' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '7' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '8' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '9' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument()
  })

  it('should render detractor and promoter texts', () => {
    render(
      <MessageCardSurvey>
        <MessageCardSurveyNPS detractor="Do not like" promoter="Amazing" />
      </MessageCardSurvey>
    )

    expect(screen.getByText('Do not like')).toBeInTheDocument()
    expect(screen.getByText('Amazing')).toBeInTheDocument()
  })

  it('should allow to select score', () => {
    render(
      <MessageCardSurvey>
        <MessageCardSurveyNPS />
      </MessageCardSurvey>
    )

    const score3 = screen.getByRole('button', { name: '3' })

    userEvent.click(score3)

    expect(score3).toHaveClass('is-selected')
  })

  it('should set hidden class on scores when selected and with feedback form', () => {
    const { container } = render(
      <MessageCardSurvey withFeedbackForm>
        <MessageCardSurveyNPS />
      </MessageCardSurvey>
    )

    expect(container.querySelector('.is-hidden')).not.toBeInTheDocument()

    userEvent.click(screen.getByRole('button', { name: '3' }))

    expect(container.querySelector('.is-hidden')).toBeInTheDocument()
  })

  it('should NOT set hidden class on scores when selected and without feedback form', () => {
    const { container } = render(
      <MessageCardSurvey withFeedbackForm={false}>
        <MessageCardSurveyNPS />
      </MessageCardSurvey>
    )

    expect(container.querySelector('.is-hidden')).not.toBeInTheDocument()

    userEvent.click(screen.getByRole('button', { name: '3' }))

    expect(container.querySelector('.is-hidden')).not.toBeInTheDocument()
  })
})
