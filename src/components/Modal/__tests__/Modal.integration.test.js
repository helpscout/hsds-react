import React, { useEffect } from 'react'
import { getByRole, render, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import Button from '../../Button'
import Modal from '../index'
import { MemoryRouter } from 'react-router'

jest.useFakeTimers()

describe('Modal', () => {
  describe('Rendering', () => {
    test('Does not render content by default', () => {
      render(
        <Modal>
          <div className="buddy">Santa!</div>
        </Modal>
      )

      expect(document.querySelector('.buddy')).toBe(null)
    })

    test('Can be rendered open', () => {
      render(
        <Modal isOpen>
          <div className="buddy">Santa!</div>
        </Modal>
      )

      expect(document.querySelector('.buddy')).toBeInTheDocument()
    })
  })

  describe('Trigger', () => {
    test('Can render with a Button trigger', () => {
      const { getByRole } = render(<Modal trigger={<Button>Click</Button>} />)

      expect(getByRole('button').textContent).toBe('Click')
    })

    test('Can open by clicking the trigger', () => {
      const { getByRole } = render(
        <Modal trigger={<Button>Click</Button>}>
          <div className="buddy">Santa!</div>
        </Modal>
      )

      user.click(getByRole('button'))

      expect(document.querySelector('.buddy')).toBeInTheDocument()
      expect(document.querySelector('.buddy').innerHTML).toContain('Santa!')
    })

    test('Refocuses the trigger on close', () => {
      const spy = jest.fn()
      const { getByRole } = render(
        <Modal isOpen trigger={<Button onFocus={spy}>Click</Button>}>
          <div className="buddy">Santa!</div>
        </Modal>
      )

      user.type(getByRole('document'), '{esc}')

      expect(spy).toHaveBeenCalled()
    })
  })

  describe('Opening/Closing', () => {
    test('Can be closed by clicking the overlay', async () => {
      render(
        <Modal isOpen>
          <div className="buddy">Santa!</div>
        </Modal>
      )

      user.click(document.querySelector('.c-ModalOverlay'))

      await waitFor(() => {
        expect(document.querySelector('.buddy')).toBe(null)
      })
    })

    test('Can be closed by pressing {esc}', async () => {
      const { container } = render(
        <Modal isOpen>
          <div className="buddy">Santa!</div>
        </Modal>
      )

      user.type(container, '{esc}')

      await waitFor(() => {
        expect(document.querySelector('.buddy')).toBe(null)
      })
    })

    test('Can be closed by clicking the Modal CloseButton', async () => {
      render(
        <Modal isOpen>
          <div className="buddy">Santa!</div>
        </Modal>
      )

      user.click(document.querySelector('.c-Modal__close button'))

      await waitFor(() => {
        expect(document.querySelector('.buddy')).toBe(null)
      })
    })
  })

  describe('Nesting', () => {
    test('Can open nested Modals', async () => {
      const { container } = render(
        <Modal isOpen>
          <div className="first">
            <p>Son of a nutcracker!</p>
            <Modal trigger={<button className="trigger">Click</button>}>
              <div className="second">
                <p>You sit on a throne of lies.</p>
              </div>
            </Modal>
          </div>
        </Modal>
      )

      expect(document.querySelector('.first')).toBeInTheDocument()
      expect(document.querySelector('.second')).toBe(null)

      user.click(document.querySelector('.trigger'))

      await waitFor(() => {
        // 1st modal should stay open
        expect(document.querySelector('.first')).toBeInTheDocument()
        // 2nd modal should now open
        expect(document.querySelector('.second')).toBeInTheDocument()
        expect(
          document
            .querySelector('.second')
            .textContent.includes('throne of lies')
        ).toBeTruthy()
      })
    })

    test('Pressing {esc} closes Modals in order', async () => {
      const { container, debug } = render(
        <Modal isOpen>
          <div className="modal-content first">
            <p>Son of a nutcracker!</p>

            <Modal
              trigger={<button className="trigger-for-second">Click</button>}
            >
              <div className="modal-content second">
                <p>You sit on a throne of lies.</p>

                <Modal
                  trigger={<button className="trigger-for-third">Click</button>}
                >
                  <div className="modal-content third">
                    <p>Not now, Arctic Puffin!</p>
                  </div>
                </Modal>
              </div>
            </Modal>
          </div>
        </Modal>
      )

      // Open modals
      user.click(document.querySelector('.trigger-for-second'))
      user.click(document.querySelector('.trigger-for-third'))

      await waitFor(() => {
        // Make sure all modals are open
        expect(document.querySelectorAll('.modal-content').length).toBe(3)
      })

      user.type(container, '{esc}')

      await waitFor(() => {
        expect(document.querySelectorAll('.modal-content').length).toBe(2)
        expect(document.querySelector('.third')).toBe(null)
      })
    })
  })

  test('should not recreate component when re-rendering and in Router context', async () => {
    const mountMock = jest.fn()
    const updateMock = jest.fn()
    const TestComponent = ({ flag }) => {
      useEffect(() => {
        mountMock()
      }, [])
      useEffect(() => {
        updateMock()
      }, [flag])

      return <div />
    }

    const { rerender } = render(
      <MemoryRouter>
        <Modal isOpen>
          <TestComponent flag={true} />
        </Modal>
      </MemoryRouter>
    )

    rerender(
      <MemoryRouter>
        <Modal isOpen>
          <TestComponent flag={false} />
        </Modal>
      </MemoryRouter>
    )

    expect(mountMock).toHaveBeenCalledTimes(1)
    expect(updateMock).toHaveBeenCalledTimes(2)
  })
})
