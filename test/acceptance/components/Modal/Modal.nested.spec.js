import React from 'react'
import { Button, Input, Modal, Portal } from '../../../../src/index'
import Keys from '../../../../src/constants/Keys'
import { wait, waitForSelectors } from '../../test-helpers'

const simulateKeyPress = keyCode => {
  const event = new Event('keyup')
  event.keyCode = keyCode

  document.dispatchEvent(event)
}

class NestedModalComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      showModal: false,
      value: '',
    }
    this.handleOnButtonClick = this.handleOnButtonClick.bind(this)
    this.handleOnInputChange = this.handleOnInputChange.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.handleOnModalOpen = this.handleOnModalOpen.bind(this)
    this.handleOnModalClose = this.handleOnModalClose.bind(this)
  }

  handleOnButtonClick() {
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  handleOnInputChange(value) {
    this.setState({
      value,
    })
  }

  handleOnModalOpen() {
    const inputNode = document.querySelector('input')
    if (inputNode) {
      inputNode.focus()
    }
  }

  handleOnModalClose() {
    this.setState({
      showModal: false,
    })
  }

  handleOnSubmit() {
    this.setState({
      showModal: false,
      value: '',
    })
  }

  render() {
    const { showOuterModal } = this.props
    const { showModal, value } = this.state

    const triggerMarkup = (
      <Button
        className="innerTrigger"
        onClick={this.handleOnButtonClick}
        theme={value ? 'editing' : null}
      >
        {value ? 'Keep Editing' : 'Reply'}
      </Button>
    )

    return (
      <div>
        <Modal
          cardClassName="outerModal"
          isOpen={showOuterModal}
          trigger={<button className="outerTrigger">Open</button>}
          timeout={0}
        >
          <Modal.Body>
            <Modal.Content>
              <Modal
                cardClassName="innerModal"
                closeIcon={false}
                isOpen={showModal}
                trigger={triggerMarkup}
                onOpen={this.handleOnModalOpen}
                onClose={this.handleOnModalClose}
                timeout={0}
              >
                <Modal.Body>
                  <Modal.Content>
                    <Input
                      autoFocus
                      multiline={3}
                      onChange={this.handleOnInputChange}
                      value={value}
                    />
                    <Button
                      className="submit"
                      onClick={this.handleOnSubmit}
                      primary
                    >
                      Submit
                    </Button>
                  </Modal.Content>
                </Modal.Body>
              </Modal>
            </Modal.Content>
          </Modal.Body>
        </Modal>
        <Portal.Container />
      </div>
    )
  }
}

describe('Outer Modal', () => {
  it('Can open Modal on click', done => {
    mount(<NestedModalComponent />)
    const $button = $('.outerTrigger')

    $button[0].click()

    waitForSelectors('.outerModal').then(nodes => {
      expect(nodes.length).toBeTruthy()
      done()
    })
  })

  it('Can open Modal on propChange', done => {
    const wrapper = mount(<NestedModalComponent />)

    wrapper.setProps({
      showOuterModal: true,
    })

    waitForSelectors('.outerModal').then(nodes => {
      expect(nodes.length).toBeTruthy()
      done()
    })
  })

  it('Can close Modal on propChange', done => {
    const wrapper = mount(<NestedModalComponent showOuterModal />)

    wrapper.setProps({
      showOuterModal: false,
    })

    wait(300).then(() => {
      const o = document.querySelector('.outerModal')
      expect(o).not.toBeTruthy()
      done()
    })
  })
})

describe('Inner Modal', () => {
  it('Cannot open Modal on isOpen state change without Outer modal open', done => {
    const wrapper = mount(<NestedModalComponent />)
    wrapper.setState({
      showModal: true,
    })

    wait(300).then(() => {
      const outer = document.querySelector('.innerModal')
      const inner = document.querySelector('.innerModal')

      expect(outer).not.toBeTruthy()
      expect(inner).not.toBeTruthy()
      done()
    })
  })

  it('Opens Modal on isOpen state change', done => {
    const wrapper = mount(<NestedModalComponent showOuterModal />)
    wrapper.setState({
      showModal: true,
    })

    waitForSelectors('.innerModal').then(nodes => {
      expect(nodes.length).toBeTruthy()
      done()
    })
  })

  it('Closes Modal on isOpen state change', done => {
    const wrapper = mount(<NestedModalComponent showOuterModal />)
    wrapper.setState({
      showModal: true,
    })
    wrapper.setState({
      showModal: false,
    })

    wait(300).then(() => {
      const o = document.querySelector('.innerModal')
      expect(o).not.toBeTruthy()
      done()
    })
  })

  it('Does not close Modal on non isOpen state change', done => {
    const wrapper = mount(<NestedModalComponent showOuterModal />)
    wrapper.setState({
      showModal: true,
    })

    waitForSelectors('.innerModal')
      .then(() => {
        wrapper.setState({ value: 'Words' })
      })
      .then(() => wait(300))
      .then(() => {
        const o = document.querySelector('.innerModal')
        expect(o).toBeTruthy()
        done()
      })
  })

  it('Closes Modal, not Outer modal on ESC press', done => {
    const wrapper = mount(<NestedModalComponent showOuterModal />)
    wrapper.setState({
      showModal: true,
    })

    waitForSelectors('.innerModal')
      .then(() => {
        simulateKeyPress(Keys.ESCAPE)
      })
      .then(() => wait(300))
      .then(() => {
        const outer = document.querySelector('.outerModal')
        const inner = document.querySelector('.innerModal')
        expect(inner).not.toBeTruthy()
        expect(outer).toBeTruthy()
        done()
      })
  })
})
