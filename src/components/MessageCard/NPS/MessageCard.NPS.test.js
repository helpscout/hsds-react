import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'

import { NPSMessageCard } from './MessageCard.NPS'
import { useMessageCardContext } from '../utils/MessageCard.context'
import userEvent from '@testing-library/user-event'
import { HIDE_CONTENT_ANIMATION_NAME } from './MessageCard.NPS.styles'

describe('className', () => {
  test('Has default className', () => {
    const { container } = render(<NPSMessageCard />)

    expect(messageCard(container)).toBeInTheDocument()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const { container } = render(<NPSMessageCard className={customClassName} />)

    expect(messageCard(container)).toHaveClass(customClassName)
  })
})

describe('Mobile', () => {
  test('Should not have mobile styles by default', () => {
    const { container } = render(<NPSMessageCard />)

    expect(messageCard(container)).not.toHaveClass('is-mobile')
  })

  test('Should have mobile styles if specified', () => {
    const { container } = render(<NPSMessageCard isMobile />)

    expect(messageCard(container)).toHaveClass('is-mobile')
  })
})

describe('Box shadow', () => {
  test('Should remove the box shadow', () => {
    const { container } = render(<NPSMessageCard isWithBoxShadow={false} />)

    expect(messageCard(container)).not.toHaveClass('is-with-box-shadow')
  })
  test('Should add the box shadow', () => {
    const { container } = render(<NPSMessageCard isWithBoxShadow />)

    expect(messageCard(container)).toHaveClass('is-with-box-shadow')
  })
})

describe('Align', () => {
  test('Has default alignment of right', () => {
    const { container } = render(<NPSMessageCard />)

    expect(messageCard(container)).toHaveClass('is-align-right')
  })

  test('Can change alignment styles, if specified', () => {
    const { container } = render(<NPSMessageCard align="left" />)

    expect(messageCard(container)).toHaveClass('is-align-left')
  })
})

describe('Visibility', () => {
  jest.useFakeTimers()

  test('Should be visible by default', () => {
    const onShowSpy = jest.fn()
    const { container } = render(<NPSMessageCard onShow={onShowSpy} />)

    expect(cardWrapper(container)).not.toBeVisible()
    expect(onShowSpy).not.toHaveBeenCalled()

    act(() => {
      jest.runAllTimers()
    })

    expect(cardWrapper(container)).toBeVisible()
    expect(onShowSpy).toHaveBeenCalled()
  })
})

describe('Animation', () => {
  test('Should have no animation by default', () => {
    const { container } = render(<NPSMessageCard />)

    expect(cardWrapper(container)).toHaveStyle({ transition: 'none' })
  })

  test('Should have animation if withAnimation is true', () => {
    const { container } = render(<NPSMessageCard withAnimation />)

    expect(cardWrapper(container)).toHaveStyle({
      transition: 'all 300ms ease-in-out',
    })
  })
})

describe('Question', () => {
  test('Does not render question if is not passed down as a prop', () => {
    const { container } = render(<NPSMessageCard />)

    expect(messageQuestion(container)).not.toBeInTheDocument()
  })

  test('Renders body if it is passed down as a prop', () => {
    const { container } = render(<NPSMessageCard question="Santa!" />)

    expect(messageQuestion(container)).toHaveTextContent('Santa!')
  })

  test('Renders html in body', () => {
    const { container } = render(
      <NPSMessageCard question="<span>Santa!</span>" />
    )

    expect(
      container.querySelector(
        '[data-cy="beacon-nps-message-question-content"] span'
      )
    ).toHaveTextContent('Santa!')
  })
})

describe('Powered by link', () => {
  test('Should set provided link under Powered by text ', () => {
    render(<NPSMessageCard poweredLink="https://example.helpscout.com/docs" />)

    expect(screen.getByRole('link', 'Powered by Help Scout')).toHaveAttribute(
      'href',
      'https://example.helpscout.com/docs'
    )
  })
})

describe('Question variables', () => {
  const variables = [
    {
      id: 'customer.firstName',
      display: 'First Name',
    },
  ]

  it('should replace existing variables in question text', () => {
    const question = `<p>Hi {%customer.firstName,fallback=there%}</p>`

    render(<NPSMessageCard question={question} variables={variables} />)

    expect(screen.getByText('there')).toBeInTheDocument()
  })

  it('should replace existing variables in question text, when also having new line character', () => {
    const question = `Hi\n{%customer.firstName,fallback=there%}`

    render(<NPSMessageCard question={question} variables={variables} />)

    expect(screen.getByText('there')).toBeInTheDocument()
  })

  it('should NOT replace variable if none provided', () => {
    const question = `<p>Hi {%customer.firstName,fallback=there%}</p>`

    render(<NPSMessageCard question={question} />)

    expect(
      screen.getByText('Hi {%customer.firstName,fallback=there%}')
    ).toBeInTheDocument()
  })
})

describe('Action', () => {
  test('Does not render action if is not passed down as a prop', () => {
    const { container } = render(<NPSMessageCard />)

    expect(
      container.querySelector('[data-cy="beacon-nps-message-action-wrapper"]')
    ).not.toBeInTheDocument()
  })

  test('Renders action if it is passed down as a prop', () => {
    const action = () => <div>Click here</div>
    const { container } = render(<NPSMessageCard action={action} />)

    expect(
      container.querySelector('[data-cy="beacon-nps-message-action-wrapper"]')
    ).toHaveTextContent('Click here')
  })
})

describe('Transitions handlers', () => {
  const ContextExample = () => {
    const {
      onSelectionWithComment,
      onSuccessfulSubmit,
      canShowConfirmationMessage,
    } = useMessageCardContext()
    return (
      <div>
        <button onClick={() => onSelectionWithComment()}>Select</button>
        <button onClick={() => onSuccessfulSubmit()}>Submit</button>
        {canShowConfirmationMessage && <div>Show confirmation</div>}
      </div>
    )
  }

  beforeEach(() => {})

  it('should set initial Message height on mount', () => {
    mockInitialHeight(400)
    const action = () => <ContextExample />
    const { container } = render(
      <NPSMessageCard question="Example question" action={action} />
    )

    act(() => {
      jest.runAllTimers()
    })

    expect(container.querySelector('.c-NPSMessageCard')).toHaveStyle({
      height: '400px',
    })
  })

  it('should NOT set initial Message height on mount when animations disabled', () => {
    mockInitialHeight(400)
    const action = () => <ContextExample />
    const { container } = render(
      <NPSMessageCard
        question="Example question"
        action={action}
        withContentAnimations={false}
      />
    )
    act(() => {
      jest.runAllTimers()
    })

    expect(container.querySelector('.c-NPSMessageCard')).not.toHaveStyle({
      height: '400px',
    })
  })

  it('should expand height when select callback called', () => {
    mockInitialHeight()
    mockScrollHeight(600)
    const action = () => <ContextExample />
    const { container } = render(
      <NPSMessageCard question="Example question" action={action} />
    )

    userEvent.click(screen.getByRole('button', { name: 'Select' }))
    act(() => {
      jest.runAllTimers()
    })

    expect(container.querySelector('.c-NPSMessageCard')).toHaveStyle({
      height: '642px',
    })
  })

  it('should NOT expand height when select callback called, but disabled animations', () => {
    mockInitialHeight()
    mockScrollHeight(600)
    const action = () => <ContextExample />
    const { container } = render(
      <NPSMessageCard
        question="Example question"
        action={action}
        withContentAnimations={false}
      />
    )

    userEvent.click(screen.getByRole('button', { name: 'Select' }))
    act(() => {
      jest.runAllTimers()
    })

    expect(container.querySelector('.c-NPSMessageCard')).not.toHaveStyle({
      height: '642px',
    })
  })

  it('should hide question when entered confirmed state (hide content animation finished)', () => {
    const action = () => <ContextExample />
    const { container } = render(
      <NPSMessageCard question="Example question" action={action} />
    )

    userEvent.click(screen.getByRole('button', { name: 'Submit' }))

    expect(screen.queryByText('Example question')).toBeInTheDocument()

    fireHideAnimationEnd(container)

    expect(screen.queryByText('Example question')).not.toBeInTheDocument()
  })

  it('should have canShowConfirmationMessage set to false by default', () => {
    const action = () => <ContextExample />
    render(<NPSMessageCard question="Example question" action={action} />)

    expect(screen.queryByText('Show confirmation')).not.toBeInTheDocument()
  })

  it('should have canShowConfirmationMessage set to true by default when disabled animations', () => {
    const action = () => <ContextExample />
    render(
      <NPSMessageCard
        question="Example question"
        action={action}
        withContentAnimations={false}
      />
    )

    expect(screen.queryByText('Show confirmation')).toBeInTheDocument()
  })

  it('should have canShowConfirmationMessage set to true when reached confirmed state', () => {
    const action = () => <ContextExample />
    const { container } = render(
      <NPSMessageCard question="Example question" action={action} />
    )

    userEvent.click(screen.getByRole('button', { name: 'Submit' }))

    expect(screen.queryByText('Show confirmation')).not.toBeInTheDocument()
    fireHideAnimationEnd(container)

    expect(screen.queryByText('Show confirmation')).toBeInTheDocument()
  })

  function fireHideAnimationEnd(container) {
    const event = new Event('animationend')
    Object.assign(event, { animationName: HIDE_CONTENT_ANIMATION_NAME })
    fireEvent(container.querySelector('.nps-content'), event)
  }

  function mockInitialHeight(height = 400) {
    Element.prototype.getBoundingClientRect = () => ({
      height,
    })
  }

  function mockScrollHeight(height = 600) {
    jest
      .spyOn(Element.prototype, 'scrollHeight', 'get')
      .mockImplementation(() => height)
  }
})

function messageCard(container) {
  return container.querySelector('.c-NPSMessageCard')
}

function cardWrapper(container) {
  return container.querySelector('.c-MessageCardWrapper')
}

function messageQuestion(container) {
  return container.querySelector(
    '[data-cy="beacon-nps-message-question-content"]'
  )
}
