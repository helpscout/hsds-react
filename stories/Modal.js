import React from 'react'
import PropTypes from 'prop-types'
import Perf from 'react-addons-perf'
import { storiesOf } from '@storybook/react'
import { Button, EmojiPicker, Heading, Modal, Link, Input, Toolbar } from '../src/index.js'
import { MemoryRouter } from 'react-router'
import { Route } from 'react-router-dom'
import { createSpec, faker } from '@helpscout/helix'

window.Perf = Perf

const stories = storiesOf('Modal', module)

const ContentSpec = createSpec({
  content: faker.lorem.paragraph(),
  id: faker.random.uuid()
})

class StatefulComponent extends React.Component {
  constructor () {
    super()
    this.state = {
      showModal: false,
      value: ''
    }
    this.handleOnButtonClick = this.handleOnButtonClick.bind(this)
    this.handleOnInputChange = this.handleOnInputChange.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.handleOnModalOpen = this.handleOnModalOpen.bind(this)
    this.handleOnModalClose = this.handleOnModalClose.bind(this)
  }

  handleOnButtonClick () {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  handleOnInputChange (value) {
    this.setState({
      value
    })
  }

  handleOnModalOpen () {
    const inputNode = document.querySelector('input')
    if (inputNode) {
      inputNode.focus()
    }
  }

  handleOnModalClose () {
    this.setState({
      showModal: false
    })
  }

  handleOnSubmit () {
    this.setState({
      showModal: false,
      value: ''
    })
  }

  render () {
    const { showModal, value } = this.state

    const triggerMarkup = (
      <Button
        onClick={this.handleOnButtonClick}
        theme={value ? 'editing' : null}
      >
        {value ? 'Keep Editing' : 'Reply'}
      </Button>
    )

    return (
      <Modal
        closeIcon={false}
        isOpen={showModal}
        trigger={triggerMarkup}
        onOpen={this.handleOnModalOpen}
        onClose={this.handleOnModalClose}
      >
        <Modal.Body>
          <Modal.Content>
            <Input
              autoFocus
              multiline={3}
              onChange={this.handleOnInputChange}
              value={value}
            />
            <Button onClick={this.handleOnSubmit} primary>
              Submit
            </Button>
          </Modal.Content>
        </Modal.Body>
      </Modal>
    )
  }
}

stories.addDecorator(story => (
  <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
))

stories.add('default', () => (
  <Modal trigger={<Link>Open dis modal</Link>}>
    <Modal.Body>
      <Heading>Title</Heading>
      {ContentSpec.generate(8).map(({id, content}) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
  </Modal>
))

stories.add('open', () => (
  <Modal isOpen trigger={<Link>Clicky</Link>}>
    <Modal.Content>
      <Modal.Body>
        <Heading>Title</Heading>
        {ContentSpec.generate(12).map(({id, content}) => (
          <p key={id}>{content}</p>
        ))}
      </Modal.Body>
    </Modal.Content>
  </Modal>
))

stories.add('header/footer', () => (
  <Modal isOpen trigger={<Link>Clicky</Link>}>
    <Modal.Header>
      Header
    </Modal.Header>
    <Modal.Body>
      <Heading>Title</Heading>
      {ContentSpec.generate(8).map(({id, content}) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
    <Modal.Footer>
      Footer
    </Modal.Footer>
  </Modal>
))

stories.add('header/footer styles', () => (
  <Modal isOpen trigger={<Link>Clicky</Link>}>
    <Modal.Header seamless>
      Header
    </Modal.Header>
    <Modal.Body>
      <Heading>Title</Heading>
      {ContentSpec.generate(8).map(({id, content}) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
    <Modal.Footer shadow>
      Footer
    </Modal.Footer>
  </Modal>
))

stories.add('header/footer with items', () => (
  <Modal isOpen trigger={<Link>Clicky</Link>} closeIcon={false}>
    <Modal.Content>
      <Modal.Header>
        <Toolbar.Item>
          <Heading size='h4'>Heading</Heading>
        </Toolbar.Item>
        <Toolbar.Block />
        <Toolbar.Item>
          <Button>Action</Button>
        </Toolbar.Item>
      </Modal.Header>
      <Modal.Body>
        <Heading size='h4'>Inner Heading</Heading>
        {ContentSpec.generate(8).map(({id, content}) => (
          <p key={id}>{content}</p>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Toolbar.Item>
          <Button>Another Action</Button>
        </Toolbar.Item>
        <Toolbar.Block />
        <Toolbar.Item>
          <Button plain>Action</Button>
        </Toolbar.Item>
        <Toolbar.Item>
          <Button primary>Primary</Button>
        </Toolbar.Item>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
))

stories.add('custom close trigger', () => {
  class Contents extends React.Component {
    render () {
      return (
        <p>
          <button onClick={this.context.closePortal}>Close me</button>
        </p>
      )
    }
  }

  Contents.contextTypes = {
    closePortal: PropTypes.func
  }

  return (
    <Modal trigger={<Link>Open me</Link>}>
      <Contents />
    </Modal>
  )
})

stories.add('seamless', () => (
  <Modal trigger={<Link>Clicky</Link>} seamless isOpen>
    <Modal.Content>
      <EmojiPicker />
    </Modal.Content>
  </Modal>
))

stories.add('nested', () => (
  <Modal trigger={<Link>Clicky</Link>}>
    <Modal.Body>
      <Heading>Title</Heading>
      {ContentSpec.generate(2).map(({id, content}) => (
        <p key={id}>{content}</p>
      ))}

      <Modal trigger={<Link>Level 2</Link>}>
        <Modal.Body>
          <Heading>Level 2</Heading>
          {ContentSpec.generate(2).map(({id, content}) => (
            <p key={id}>{content}</p>
          ))}

          <Modal trigger={<Link>Level 3</Link>}>
            <Modal.Body>
              <Heading>Level 3</Heading>
              {ContentSpec.generate(2).map(({id, content}) => (
                <p key={id}>{content}</p>
              ))}
            </Modal.Body>
          </Modal>
        </Modal.Body>
      </Modal>

    </Modal.Body>
  </Modal>
))

stories.add('custom mounting selector', () => {
  return (
    <div>
      <p>Render modal here:</p>
      <div className='render-modal-here' />

      <Modal trigger={<Link>Clicky</Link>} renderTo='.render-modal-here'>
        <Modal.Body>
          <Heading>Title</Heading>
          {ContentSpec.generate(2).map(({id, content}) => (
            <p key={id}>{content}</p>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  )
})

stories.add('lifecycle events', () => {
  const onBeforeOpen = (modalOpen) => {
    console.log('Before open!')
    setTimeout(() => {
      modalOpen()
    }, 500)
  }
  const onBeforeClose = (modalClose) => {
    console.log('Before close!')
    setTimeout(() => {
      modalClose()
    }, 500)
  }
  return (
    <div>
      <p>onBeforeOpen: 500 delay</p>
      <p>onBeforeClose: 500 delay</p>
      <Modal
        className='weee'
        onBeforeOpen={onBeforeOpen}
        onBeforeClose={onBeforeClose}
        trigger={<Link>Clicky</Link>}
      >
        <Modal.Body>
          <Heading>Title</Heading>
          {ContentSpec.generate(2).map(({id, content}) => (
            <p key={id}>{content}</p>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  )
})

stories.add('routes', () => {
  return (
    <div>
      <h1>Routes</h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/team'>Team</Link>
        </li>
        <li>
          <Link to='/team/brick'>Brick</Link>
        </li>
      </ul>

      <Modal path='/team'>
        <Modal.Body>
          <h1>Team Modal: A</h1>
          <p>Modal content</p>
        </Modal.Body>
      </Modal>

      <Modal path='/team/brick'>
        <Modal.Body>
          <h1>Team Modal: B</h1>
          <p>Modal inner content</p>
        </Modal.Body>
      </Modal>

      <Modal path='/team/brick'>
        <Modal.Body>
          <h1>Team Modal: C</h1>
          <p>Modal inner content</p>
        </Modal.Body>
      </Modal>

      <Modal path='/team/brick'>
        <Modal.Body>
          <h1>Team Modal: D</h1>
          <p>Modal inner content</p>
        </Modal.Body>
      </Modal>

      <Modal path='/team/brick'>
        <Modal.Body>
          <h1>Team Modal: E</h1>
          <p>Modal inner content</p>
        </Modal.Body>
      </Modal>

      <Route exact path='/' render={props => (
        <div>
          <h1>HOME PAGE</h1>
        </div>
      )} />
      <Route path='/team' render={props => (
        <div>
          <h1>TEAM PAGE</h1>
        </div>
      )} />
    </div>
  )
})

stories.add('stateful example', () => (
  <div>
    <button>Does Nothing</button>
    <hr />
    <StatefulComponent />
  </div>
))
