import React from 'react'
import PropTypes from 'prop-types'
import { cy } from '@helpscout/cyan'
import Button from '../../Button'
import Modal from '../index'

cy.useFakeTimers()

describe('Modal', () => {
  describe('Rendering', () => {
    test('Does not render content by default', () => {
      cy.render(
        <Modal>
          <div className="buddy">Santa!</div>
        </Modal>
      )

      expect(cy.get('.buddy').exists()).toBeFalsy()
    })

    test('Can be rendered open', () => {
      cy.render(
        <Modal isOpen>
          <div className="buddy">Santa!</div>
        </Modal>
      )

      expect(cy.get('.buddy').exists()).toBeTruthy()
    })
  })

  describe('Trigger', () => {
    test('Can render with a Button trigger', () => {
      cy.render(<Modal trigger={<Button>Click</Button>} />)

      expect(cy.get('button').text()).toBe('Click')
    })

    test('Can open by clicking the trigger', () => {
      cy.render(
        <Modal trigger={<Button>Click</Button>}>
          <div className="buddy">Santa!</div>
        </Modal>
      )

      cy.get('button').click()

      expect(cy.get('.buddy').exists()).toBeTruthy()
      expect(cy.get('.buddy').html()).toContain('Santa!')
    })

    test('Refocuses the trigger on close', () => {
      const spy = jest.fn()
      cy.render(
        <Modal isOpen trigger={<Button onFocus={spy}>Click</Button>}>
          <div className="buddy">Santa!</div>
        </Modal>
      )

      cy.type('{esc}')

      expect(spy).toHaveBeenCalled()
    })
  })

  describe('Opening/Closing', () => {
    test('Can be closed by clicking the overlay', () => {
      cy.render(
        <Modal isOpen>
          <div className="buddy">Santa!</div>
        </Modal>
      )

      cy.getByCy('Overlay').click()

      expect(cy.get('.buddy').exists()).toBeFalsy()
    })

    test('Can be closed by pressing {esc}', () => {
      cy.render(
        <Modal isOpen>
          <div className="buddy">Santa!</div>
        </Modal>
      )

      cy.type('{esc}')

      expect(cy.get('.buddy').exists()).toBeFalsy()
    })

    test('Can be closed by clicking the Modal CloseButton', () => {
      cy.render(
        <Modal isOpen>
          <div className="buddy">Santa!</div>
        </Modal>
      )

      cy.getByCy('CloseButton').click()

      expect(cy.get('.buddy').exists()).toBeFalsy()
    })
  })

  describe('Nesting', () => {
    test('Can open nested Modals', () => {
      cy.render(
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

      expect(cy.get('.first').exists()).toBeTruthy()
      expect(cy.get('.second').exists()).toBeFalsy()

      cy.get('.trigger').click()

      // 1st modal should stay open
      expect(cy.get('.first').exists()).toBeTruthy()
      // 2nd modal should now open
      expect(cy.get('.second').exists()).toBeTruthy()
      expect(cy.get('.second').text()).toContain('throne of lies')
    })

    test('Pressing {esc} closes Modals in order', () => {
      cy.render(
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
      cy.get('.trigger-for-second').click()
      cy.get('.trigger-for-third').click()

      // Make sure all modals are open
      expect(cy.get('.modal-content').length).toBe(3)

      cy.type('{esc}')
      expect(cy.get('.modal-content').length).toBe(2)
      expect(cy.get('.third').exists()).toBeFalsy()

      cy.type('{esc}')
      expect(cy.get('.modal-content').length).toBe(1)
      expect(cy.get('.second').exists()).toBeFalsy()

      cy.type('{esc}')
      expect(cy.get('.modal-content').length).toBe(0)
    })
  })
})
