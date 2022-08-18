import React from 'react'
import { render, act, screen, fireEvent } from '@testing-library/react'
import MessageCard from './MessageCard'
import { ThumbsSurvey } from './MessageCard.Survey.variants'
import { MessageCardButton as Button } from './MessageCard.Button'
import userEvent from '@testing-library/user-event'
import { makeBrandColors } from '../../styles/utilities/color'
import { ThemeProvider } from 'styled-components'

describe('className', () => {
  test('Has default className', () => {
    const { container } = render(<MessageCard />)

    expect(messageCard(container)).toBeInTheDocument()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const { container } = render(<MessageCard className={customClassName} />)

    expect(messageCard(container)).toHaveClass(customClassName)
  })
})

describe('Mobile', () => {
  test('Should not have mobile styles by default', () => {
    const { container } = render(<MessageCard />)

    expect(messageCard(container)).not.toHaveClass('is-mobile')
  })

  test('Should have mobile styles if specified', () => {
    const { container } = render(<MessageCard isMobile />)

    expect(messageCard(container)).toHaveClass('is-mobile')
  })
})

describe('Align', () => {
  test('Has default alignment of right', () => {
    const { container } = render(<MessageCard />)

    expect(messageCard(container)).toHaveClass('is-align-right')
  })

  test('Can change alignment styles, if specified', () => {
    const { container } = render(<MessageCard align="left" />)

    expect(messageCard(container)).toHaveClass('is-align-left')
  })
})

describe('Visibility', () => {
  jest.useFakeTimers()

  test('Should be visible by default if there is no image', () => {
    const onShowSpy = jest.fn()
    const { container } = render(<MessageCard onShow={onShowSpy} />)

    expect(cardWrapper(container)).not.toBeVisible()
    expect(onShowSpy).not.toHaveBeenCalled()

    act(() => {
      jest.runAllTimers()
    })

    expect(cardWrapper(container)).toBeVisible()
    expect(onShowSpy).toHaveBeenCalled()
  })

  test('Should not be visible by default if there is an image, but become visible when image loads', () => {
    const onShowSpy = jest.fn()
    const { container } = render(
      <MessageCard
        image={{ url: 'https://path.to/image.png' }}
        onShow={onShowSpy}
      />
    )

    expect(cardWrapper(container)).not.toBeVisible()
    expect(onShowSpy).not.toHaveBeenCalled()

    act(() => {
      jest.runAllTimers()
    })

    expect(cardWrapper(container)).not.toBeVisible()
    expect(onShowSpy).not.toHaveBeenCalled()

    fireEvent.load(screen.getByRole('img'))

    act(() => {
      jest.runAllTimers()
    })

    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(cardWrapper(container)).toBeVisible()
    expect(onShowSpy).toHaveBeenCalled()
  })

  test('Should become visible without image if image fails to load', () => {
    const onShowSpy = jest.fn()
    const { container } = render(
      <MessageCard
        image={{ url: 'https://path.to/image.png' }}
        onShow={onShowSpy}
      />
    )

    expect(cardWrapper(container)).not.toBeVisible()
    expect(onShowSpy).not.toHaveBeenCalled()

    act(() => {
      jest.runAllTimers()
    })

    expect(cardWrapper(container)).not.toBeVisible()
    expect(onShowSpy).not.toHaveBeenCalled()

    fireEvent.error(screen.getByRole('img'))

    act(() => {
      jest.runAllTimers()
    })

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(cardWrapper(container)).toBeVisible()
    expect(onShowSpy).toHaveBeenCalled()
  })
})

describe('Animation', () => {
  test('Should have no animation by default', () => {
    const { container } = render(<MessageCard />)

    expect(cardWrapper(container)).toHaveStyle({ transition: 'none' })
  })

  test('Should have animation if withAnimation is true', () => {
    const { container } = render(<MessageCard withAnimation />)

    expect(cardWrapper(container)).toHaveStyle({
      transition: 'all 300ms ease-in-out',
    })
  })
})

describe('Body', () => {
  test('Does not render body if is not passed down as a prop', () => {
    const { container } = render(<MessageCard />)

    expect(messageBody(container)).not.toBeInTheDocument()
  })

  test('Renders body if it is passed down as a prop', () => {
    const { container } = render(<MessageCard body="Santa!" />)

    expect(messageBody(container)).toHaveTextContent('Santa!')
  })

  test('Renders html in body', () => {
    const { container } = render(<MessageCard body="<span>Santa!</span>" />)

    expect(
      container.querySelector('[data-cy="beacon-message-body-content"] span')
    ).toHaveTextContent('Santa!')
  })

  test('Renders new line without html in body', () => {
    const body = 'this is a new line\nwith another line'
    const { container } = render(<MessageCard body={body} />)

    expect(
      container.querySelector('[data-cy="beacon-message-body-content"] br')
    ).toBeInTheDocument()
  })

  test('Accepts a custom onBodyClick callback', () => {
    const body = 'some text with a <a href="#">link</a> in it'
    const callback = jest.fn()
    const { container } = render(
      <MessageCard body={body} onBodyClick={callback} />
    )

    userEvent.click(messageCard(container))
    expect(callback).not.toHaveBeenCalled()

    userEvent.click(messageBody(container))
    expect(callback).toHaveBeenCalled()
  })
})

describe('Body variables', () => {
  const variables = [
    {
      id: 'customer.firstName',
      display: 'First Name',
    },
  ]

  it('should replace existing variables in body text', () => {
    const body = `<p>Hi {%customer.firstName,fallback=there%}</p>`

    render(<MessageCard body={body} variables={variables} />)

    expect(screen.getByText('there')).toBeInTheDocument()
  })

  it('should replace existing variables in body text, when also having new line character', () => {
    const body = `Hi\n{%customer.firstName,fallback=there%}`

    render(<MessageCard body={body} variables={variables} />)

    expect(screen.getByText('there')).toBeInTheDocument()
  })

  it('should NOT replace variable if none provided', () => {
    const body = `<p>Hi {%customer.firstName,fallback=there%}</p>`

    render(<MessageCard body={body} />)

    expect(
      screen.getByText('Hi {%customer.firstName,fallback=there%}')
    ).toBeInTheDocument()
  })
})

describe('Title', () => {
  test('Does not render title if is not passed down as a prop', () => {
    const { container } = render(<MessageCard />)

    expect(messageTitle(container)).not.toBeInTheDocument()
  })

  test('Renders title if it is passed down as a prop', () => {
    const { container } = render(<MessageCard title="Santa!" />)

    expect(messageTitle(container)).toHaveTextContent('Santa!')
  })

  function messageTitle(container) {
    return container.querySelector('[data-cy="beacon-message-title"]')
  }
})

describe('Subtitle', () => {
  test('Does not render subtitle if is not passed down as a prop', () => {
    const { container } = render(<MessageCard />)

    expect(messageSubtitle(container)).not.toBeInTheDocument()
  })

  test('Renders subtitle if it is passed down as a prop', () => {
    const { container } = render(<MessageCard subtitle="Santa!" />)

    expect(messageSubtitle(container)).toHaveTextContent('Santa!')
  })

  function messageSubtitle(container) {
    return container.querySelector('[data-cy="beacon-message-subtitle"]')
  }
})

describe('image', () => {
  test('Does not render image if is not passed down as a prop', () => {
    render(<MessageCard />)

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  test('Renders image if it is passed down as a prop', () => {
    render(<MessageCard image={{ url: 'https://path.to/image.png' }} />)

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://path.to/image.png'
    )
  })

  test('Sets size of image when provided', () => {
    render(
      <MessageCard
        image={{
          url: 'https://path.to/image.png',
          width: '100',
          height: '200',
        }}
      />
    )

    expect(screen.getByRole('img')).toHaveStyle({ width: '100px' })
    expect(screen.getByRole('img')).toHaveStyle({ height: '200px' })
  })

  test('Scales size of image when larger than fits and width is bigger', () => {
    render(
      <MessageCard
        image={{
          url: 'https://path.to/image.png',
          width: '800',
          height: '300',
        }}
      />
    )

    expect(screen.getByRole('img')).toHaveStyle({ width: '258px' })
    expect(screen.getByRole('img')).toHaveStyle({ height: '96.75px' })
  })

  test('Scales size of image when larger than fits and height is bigger', () => {
    render(
      <MessageCard
        image={{
          url: 'https://path.to/image.png',
          width: '300',
          height: '800',
        }}
      />
    )

    expect(screen.getByRole('img')).toHaveStyle({ width: '96.75px' })
    expect(screen.getByRole('img')).toHaveStyle({ height: '258px' })
  })

  test('Sets default size of image when not provided', () => {
    render(<MessageCard image={{ url: 'https://path.to/image.png' }} />)

    expect(screen.getByRole('img')).toHaveStyle({ width: '100%' })
    expect(screen.getByRole('img')).toHaveStyle({ height: 'auto' })
  })

  test('Sets provided alt text', () => {
    render(
      <MessageCard
        image={{ url: 'https://path.to/image.png', altText: 'Alt text' }}
      />
    )

    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Alt text')
  })

  test('Sets default alt text', () => {
    render(<MessageCard image={{ url: 'https://path.to/image.png' }} />)

    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Message image')
  })
})

describe('video', () => {
  jest.useFakeTimers()
  test('Does not render video if is not passed down as a prop', () => {
    const { container } = render(<MessageCard />)

    expect(container.querySelector('iframe')).not.toBeInTheDocument()
  })

  test('Renders video if it is passed down as a prop', () => {
    const { container } = render(
      <MessageCard video={{ html: '<div><iframe/></div>' }} />
    )

    expect(container.querySelector('iframe')).toBeInTheDocument()
  })

  test('Adds title to the video iframe if it is missing', () => {
    const { container } = render(
      <MessageCard video={{ html: '<div><iframe/></div>' }} />
    )

    expect(container.querySelector('iframe')).toHaveAttribute(
      'title',
      'Message video'
    )
  })

  test('Does not add title to the video iframe if it has one already', () => {
    const { container } = render(
      <MessageCard video={{ html: '<div><iframe title="existing"/></div>' }} />
    )

    expect(container.querySelector('iframe')).toHaveAttribute(
      'title',
      'existing'
    )
  })

  test('Should be visible by default if there is no video', () => {
    const onShowSpy = jest.fn()
    const { container } = render(<MessageCard onShow={onShowSpy} />)

    expect(cardWrapper(container)).not.toBeVisible()
    expect(onShowSpy).not.toHaveBeenCalled()

    act(() => {
      jest.runAllTimers()
    })

    expect(cardWrapper(container)).toBeVisible()
    expect(onShowSpy).toHaveBeenCalled()
  })

  test('Should not be visible by default if there is a video, but become visible when video loads', () => {
    const onShowSpy = jest.fn()
    const { container } = render(
      <MessageCard
        video={{ html: '<div><iframe/></div>' }}
        onShow={onShowSpy}
      />
    )

    expect(cardWrapper(container)).not.toBeVisible()
    expect(onShowSpy).not.toHaveBeenCalled()

    act(() => {
      jest.runAllTimers()
    })

    expect(cardWrapper(container)).not.toBeVisible()
    expect(onShowSpy).not.toHaveBeenCalled()

    fireEvent.load(container.querySelector('iframe'))

    act(() => {
      jest.runAllTimers()
    })

    expect(cardWrapper(container)).toBeVisible()
    expect(onShowSpy).toHaveBeenCalled()
  })
})

describe('Action', () => {
  test('Does not render action if is not passed down as a prop', () => {
    const { container } = render(<MessageCard />)

    expect(
      container.querySelector('[data-cy="beacon-message-cta-wrapper"]')
    ).not.toBeInTheDocument()
  })

  test('Renders action if it is passed down as a prop', () => {
    const action = () => <div>Click here</div>
    const { container } = render(<MessageCard action={action} />)

    expect(
      container.querySelector('[data-cy="beacon-message-cta-wrapper"]')
    ).toHaveTextContent('Click here')
  })

  test('Should remove the box shadow', () => {
    const { container } = render(<MessageCard isWithBoxShadow={false} />)

    expect(messageCard(container)).not.toHaveClass('is-with-box-shadow')
  })
})

describe('UrlAttachmentImage', () => {
  test('Does not render if url not provided', () => {
    render(<MessageCard.UrlAttachmentImage />)

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  test('Renders image when url provided', () => {
    render(<MessageCard.UrlAttachmentImage url="https://example.com" />)

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://example.com'
    )
  })

  test('Allows to provide alt text', () => {
    render(
      <MessageCard.UrlAttachmentImage
        url="https://example.com"
        altText="My alt text"
      />
    )

    expect(screen.getByRole('img')).toHaveAttribute('alt', 'My alt text')
  })
})

describe('Message Button', () => {
  test('Can render children', () => {
    const children = 'Hello world'
    render(<Button>{children}</Button>)

    expect(screen.getByRole('button', { name: children })).toBeInTheDocument()
  })

  test('Can accept custom onClick callback', () => {
    const callback = jest.fn()
    render(<Button onClick={callback}>Click Me</Button>)

    userEvent.click(screen.getByRole('button'))

    expect(callback).toHaveBeenCalled()
  })
})

describe('Surveys', () => {
  jest.useFakeTimers()

  test('Renders a feedback form after selection if withFeedbackForm is set', () => {
    const formLabel = 'Tell us more...'

    render(
      <MessageCard.Survey withFeedbackForm feedbackFormText={formLabel}>
        <ThumbsSurvey />
      </MessageCard.Survey>
    )

    expect(screen.queryByLabelText(formLabel)).not.toBeInTheDocument()

    userEvent.click(screen.getByRole('button', { name: 'thumbs-up' }))

    expect(screen.queryByLabelText(formLabel)).toBeInTheDocument()
  })

  test('Renders a feedback form by default if isTextOnlySurvey is set', () => {
    const onSubmit = jest.fn()
    const formLabel = 'Tell us more...'

    render(
      <MessageCard.Survey
        isTextOnlySurvey
        feedbackFormText={formLabel}
        onSubmit={onSubmit}
      />
    )

    expect(screen.queryByLabelText(formLabel)).toBeInTheDocument()

    userEvent.type(screen.getByLabelText(formLabel), 'Great question')
    userEvent.click(screen.getByRole('button', { name: 'Send' }))

    expect(onSubmit).toHaveBeenCalledWith({
      feedback: 'Great question',
      selected: null,
    })
  })

  test('Renders a feedback form delayed after selection if withShowFeedbackFormDelay is set', () => {
    const formLabel = 'Tell us more...'

    render(
      <MessageCard.Survey
        withFeedbackForm
        withShowFeedbackFormDelay
        feedbackFormText={formLabel}
      >
        <ThumbsSurvey />
      </MessageCard.Survey>
    )

    expect(screen.queryByLabelText(formLabel)).not.toBeInTheDocument()
    userEvent.click(screen.getByRole('button', { name: 'thumbs-up' }))
    expect(screen.queryByLabelText(formLabel)).not.toBeInTheDocument()

    act(() => {
      jest.runAllTimers()
    })

    expect(screen.queryByLabelText(formLabel)).toBeInTheDocument()
  })

  test('Calls the onSubmit callback when submitting the feedback form', () => {
    const formLabel = 'Tell us more...'
    const onSubmit = jest.fn()

    render(
      <MessageCard.Survey
        withFeedbackForm
        feedbackFormText={formLabel}
        onSubmit={onSubmit}
      >
        <ThumbsSurvey />
      </MessageCard.Survey>
    )

    userEvent.click(screen.getByRole('button', { name: 'thumbs-down' }))
    userEvent.type(screen.getByLabelText(formLabel), 'Did not like it')
    userEvent.click(screen.getByRole('button', { name: 'Send' }))

    expect(onSubmit).toHaveBeenCalledWith({
      feedback: 'Did not like it',
      selected: 'thumbs-down',
    })
  })

  test('Calls the onSubmit callback right away if withFeedbackForm is not set', () => {
    const onSubmit = jest.fn()

    render(
      <MessageCard.Survey onSubmit={onSubmit}>
        <ThumbsSurvey />
      </MessageCard.Survey>
    )

    userEvent.click(screen.getByRole('button', { name: 'thumbs-up' }))

    expect(onSubmit).toHaveBeenCalledWith({
      selected: 'thumbs-up',
    })
  })

  test('Shows the feedback form before submit if forceFeedbackForm is set', () => {
    const formLabel = 'Tell us more...'

    render(
      <MessageCard.Survey forceFeedbackForm feedbackFormText={formLabel}>
        <ThumbsSurvey />
      </MessageCard.Survey>
    )

    expect(screen.queryByLabelText(formLabel)).toBeInTheDocument()
  })
})

function messageCard(container) {
  return container.querySelector('.c-MessageCard')
}

function cardWrapper(container) {
  return container.querySelector('.c-MessageCardWrapper')
}

function messageBody(container) {
  return container.querySelector('[data-cy="beacon-message-body-content"]')
}
