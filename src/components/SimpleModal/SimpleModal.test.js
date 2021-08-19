import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import user from '@testing-library/user-event'
import SimpleModal from './'

jest.useFakeTimers()

describe('Show / no show', () => {
  test('should be shown or hidden using show prop using useAnimatedRender under the hood', () => {
    const { queryByTestId, rerender } = render(<SimpleModal />)

    expect(queryByTestId('simple-modal-overlay')).not.toBeInTheDocument()

    rerender(<SimpleModal show />)
    fireEvent.animationEnd(queryByTestId('simple-modal-overlay'))

    expect(queryByTestId('simple-modal-overlay')).toBeInTheDocument()
    expect(
      queryByTestId('simple-modal-overlay').classList.contains('element-in')
    ).toBe(true)
    expect(
      queryByTestId('simple-modal-overlay').querySelector('.SimpleModal')
    ).toBeInTheDocument()
    expect(document.activeElement).toBe(
      queryByTestId('simple-modal-overlay').querySelector('.SimpleModal')
    )

    rerender(<SimpleModal show={false} />)
    fireEvent.animationEnd(queryByTestId('simple-modal-overlay'))

    expect(queryByTestId('simple-modal-overlay')).not.toBeInTheDocument()
  })
  test('should set z-index on overlay', () => {
    const { queryByTestId } = render(<SimpleModal show zIndex={500} />)
    const styles = window.getComputedStyle(
      queryByTestId('simple-modal-overlay')
    )

    expect(styles.getPropertyValue('z-index')).toBe('500')
  })
})

describe('Contents', () => {
  test('Body', () => {
    const { container } = render(
      <SimpleModal show>
        <div className="something"></div>
      </SimpleModal>
    )

    expect(container.querySelector('div.something')).toBeInTheDocument()
  })
})

describe('Closing', () => {
  test('should render close button', () => {
    const { container } = render(<SimpleModal show />)
    const button = container.querySelector('.SimpleModal__CloseButton')

    expect(button).toBeInTheDocument()
  })

  test('should call onClose on close button click', () => {
    const spy = jest.fn()
    const { container } = render(<SimpleModal show onClose={spy} />)

    const button = container.querySelector('.SimpleModal__CloseButton')

    user.click(button)

    expect(spy).toHaveBeenCalled()
  })

  test('should call onClose on escape', () => {
    const spy = jest.fn()
    const { container } = render(<SimpleModal show onClose={spy} />)
    const simpleModal = container.querySelector('.SimpleModal')

    user.type(simpleModal, '{esc}')

    expect(spy).toHaveBeenCalled()
  })

  test('should call onClose on clicking outside modal if set', () => {
    const spy = jest.fn()
    const { container } = render(
      <div className="app">
        <SimpleModal closeOnClickOutside="modal" show onClose={spy} />
      </div>
    )
    const app = container.querySelector('.app')

    user.click(app)

    expect(spy).toHaveBeenCalled()
  })

  test('should call onClose on clicking outside overlay if set', () => {
    const spy = jest.fn()
    const { container } = render(
      <div className="app">
        <section>Something</section>
        <div className="modal-container">
          <SimpleModal closeOnClickOutside="overlay" show onClose={spy} />
        </div>
      </div>
    )
    const section = container.querySelector('section')

    user.click(section)

    expect(spy).toHaveBeenCalled()
  })

  test('should not call onClose on clicking outside if not set', () => {
    const spy = jest.fn()
    const { container } = render(
      <div className="app">
        <SimpleModal show onClose={spy} />
      </div>
    )
    const app = container.querySelector('.app')

    user.click(app)

    expect(spy).not.toHaveBeenCalled()
  })
})
