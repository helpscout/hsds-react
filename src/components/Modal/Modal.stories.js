import React from 'react'
import { MemoryRouter } from 'react-router'
import { Route } from 'react-router-dom'
import { createSpec, faker } from '@helpscout/helix'
import {
  SearchableDropdown,
  Button,
  FormLabel,
  Heading,
  Modal,
  Link,
  Popover,
  Input,
  Switch,
  Toolbar,
  styled,
} from '../index'
import Frame from '../Frame'

export default {
  component: Modal,
  title: 'Components/Overlay/Modal',
  decorators: [
    story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>,
  ],
}

const ContentSpec = createSpec({
  content: faker.lorem.paragraph(),
  id: faker.random.uuid(),
})

class StatefulComponent extends React.Component {
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
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this)
  }

  componentWillMount() {
    window.addEventListener('keyup', this.handleOnKeyUp)
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleOnKeyUp)
  }

  handleOnKeyUp(event) {
    console.log(event)
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
      <Modal trigger={<button>Open</button>}>
        <Modal.Body>
          <Modal.Content>
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
                    maxHeight={140}
                    onChange={this.handleOnInputChange}
                    value={value}
                    scrollLock={false}
                  />
                  <Button onClick={this.handleOnSubmit} primary>
                    Submit
                  </Button>
                </Modal.Content>
              </Modal.Body>
            </Modal>
          </Modal.Content>
        </Modal.Body>
      </Modal>
    )
  }
}

export const Default = () => (
  <Modal
    trigger={<Link onClick={e => e.preventDefault()}>Open dis modal</Link>}
  >
    <Modal.Body>
      <Heading>Title</Heading>
      {ContentSpec.generate(8).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
  </Modal>
)

Default.story = {
  name: 'default',
}

export const NoCloseOnEscape = () => (
  <Modal
    closeOnEscape={false}
    trigger={<Link onClick={e => e.preventDefault()}>Open dis modal</Link>}
  >
    <Modal.Body>
      <Heading>Title</Heading>
      {ContentSpec.generate(8).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
  </Modal>
)

NoCloseOnEscape.story = {
  name: 'no close on escape',
}

export const Open = () => (
  <Modal isOpen trigger={<Link onClick={e => e.preventDefault()}>Clicky</Link>}>
    <Modal.Content>
      <Modal.Body>
        <Heading>Title</Heading>
        {ContentSpec.generate(1).map(({ id, content }) => (
          <p key={id}>{content}</p>
        ))}
      </Modal.Body>
    </Modal.Content>
  </Modal>
)

Open.story = {
  name: 'open',
}

export const HeaderFooter = () => (
  <Modal isOpen trigger={<Link onClick={e => e.preventDefault()}>Clicky</Link>}>
    <Modal.Header>Header</Modal.Header>
    <Modal.Body>
      <Heading>Title</Heading>
      {ContentSpec.generate(8).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
    <Modal.Footer>Footer</Modal.Footer>
  </Modal>
)

HeaderFooter.story = {
  name: 'header/footer',
}

export const HeaderFooterStyles = () => (
  <Modal isOpen trigger={<Link onClick={e => e.preventDefault()}>Clicky</Link>}>
    <Modal.Header seamless>Header</Modal.Header>
    <Modal.Body>
      <Heading>Title</Heading>
      {ContentSpec.generate(8).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
    <Modal.Footer shadow>Footer</Modal.Footer>
  </Modal>
)

HeaderFooterStyles.story = {
  name: 'header/footer styles',
}

export const HeaderFooterWithItems = () => (
  <Modal
    isOpen
    trigger={<Link onClick={e => e.preventDefault()}>Clicky</Link>}
    closeIcon={false}
  >
    <Modal.Content>
      <Modal.Header>
        <Toolbar.Item>
          <Heading size="h4">Heading</Heading>
        </Toolbar.Item>
        <Toolbar.Block />
        <Toolbar.Item>
          <Button>Action</Button>
        </Toolbar.Item>
      </Modal.Header>
      <Modal.Body>
        <Heading size="h4">Inner Heading</Heading>
        {ContentSpec.generate(8).map(({ id, content }) => (
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
)

HeaderFooterWithItems.story = {
  name: 'header/footer with items',
}

export const WithTooltip = () => (
  <Modal trigger={<Link>Clicky</Link>} isSeamless isOpen>
    <Modal.Content>
      <Modal.Header>
        <Heading size="h4">Heading</Heading>
      </Modal.Header>
      <Modal.Body>
        <Input state={'error'} errorMessage={'Shoot! Something is wrong.'} />
      </Modal.Body>
    </Modal.Content>
  </Modal>
)

WithTooltip.story = {
  name: 'with tooltip',
}

export const CustomCloseTrigger = () => {
  class Contents extends React.Component {
    render() {
      return (
        <p>
          <button onClick={this.context.closePortal}>Close me</button>
        </p>
      )
    }
  }

  Contents.contextTypes = {
    closePortal: () => {},
  }

  return (
    <Modal trigger={<Link onClick={e => e.preventDefault()}>Open me</Link>}>
      <Contents />
    </Modal>
  )
}

CustomCloseTrigger.story = {
  name: 'custom close trigger',
}

export const Seamless = () => (
  <Modal
    trigger={<Link onClick={e => e.preventDefault()}>Clicky</Link>}
    seamless
    isOpen
  >
    <Modal.Content>
      {ContentSpec.generate(8).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Content>
  </Modal>
)

Seamless.story = {
  name: 'seamless',
}

export const Nested = () => (
  <Modal trigger={<Link onClick={e => e.preventDefault()}>Clicky</Link>}>
    <Modal.Body>
      <Heading>Title</Heading>
      {ContentSpec.generate(2).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}

      <Modal trigger={<Link onClick={e => e.preventDefault()}>Level 2</Link>}>
        <Modal.Body>
          <Heading>Level 2</Heading>

          <Popover content="Popover! Let's go to level 3." zIndex={99999}>
            <Button>Popover</Button>
          </Popover>
          {ContentSpec.generate(2).map(({ id, content }) => (
            <p key={id}>{content}</p>
          ))}

          <Modal
            trigger={<Link onClick={e => e.preventDefault()}>Level 3</Link>}
          >
            <Modal.Body>
              <Heading>Level 3</Heading>
              {ContentSpec.generate(2).map(({ id, content }) => (
                <p key={id}>{content}</p>
              ))}
              <SearchableDropdown autoInput={true} />
            </Modal.Body>
          </Modal>

          <SearchableDropdown autoInput={true} />
        </Modal.Body>
      </Modal>
    </Modal.Body>
  </Modal>
)

Nested.story = {
  name: 'nested',
}

export const CustomMountingSelector = () => {
  return (
    <div>
      <p>Render modal here:</p>
      <div className="render-modal-here" />

      <Modal
        trigger={<Link onClick={e => e.preventDefault()}>Clicky</Link>}
        renderTo=".render-modal-here"
      >
        <Modal.Body>
          <Heading>Title</Heading>
          {ContentSpec.generate(2).map(({ id, content }) => (
            <p key={id}>{content}</p>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  )
}

CustomMountingSelector.story = {
  name: 'custom mounting selector',
}

export const LifecycleEvents = () => {
  const onBeforeOpen = modalOpen => {
    console.log('Before open!')
    setTimeout(() => {
      modalOpen()
    }, 500)
  }
  const onBeforeClose = modalClose => {
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
        className="weee"
        onBeforeOpen={onBeforeOpen}
        onBeforeClose={onBeforeClose}
        trigger={<Link onClick={e => e.preventDefault()}>Clicky</Link>}
      >
        <Modal.Body>
          <Heading>Title</Heading>
          {ContentSpec.generate(2).map(({ id, content }) => (
            <p key={id}>{content}</p>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  )
}

LifecycleEvents.story = {
  name: 'lifecycle events',
}

export const Routes = () => {
  return (
    <div>
      <h1>Routes</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/team">Team</Link>
        </li>
        <li>
          <Link to="/team/brick">Brick</Link>
        </li>
      </ul>

      <Modal path="/team">
        <Modal.Body>
          <h1>Team Modal: A</h1>
          <p>Modal content</p>
        </Modal.Body>
      </Modal>

      <Modal path="/team/brick">
        <Modal.Body>
          <h1>Team Modal: B</h1>
          <p>Modal inner content</p>
        </Modal.Body>
      </Modal>

      <Modal path="/team/brick">
        <Modal.Body>
          <h1>Team Modal: C</h1>
          <p>Modal inner content</p>
        </Modal.Body>
      </Modal>

      <Modal path="/team/brick">
        <Modal.Body>
          <h1>Team Modal: D</h1>
          <p>Modal inner content</p>
        </Modal.Body>
      </Modal>

      <Modal path="/team/brick">
        <Modal.Body>
          <h1>Team Modal: E</h1>
          <p>Modal inner content</p>
        </Modal.Body>
      </Modal>

      <Route
        exact
        path="/"
        render={props => (
          <div>
            <h1>HOME PAGE</h1>
          </div>
        )}
      />
      <Route
        path="/team"
        render={props => (
          <div>
            <h1>TEAM PAGE</h1>
          </div>
        )}
      />
    </div>
  )
}

Routes.story = {
  name: 'routes',
}

export const StatefulExample = () => (
  <div>
    <button>Does Nothing</button>
    <hr />
    <StatefulComponent />
  </div>
)

StatefulExample.story = {
  name: 'stateful example',
}

export const Tabbing = () => (
  <Modal isOpen trigger={<Link onClick={e => e.preventDefault()}>Clicky</Link>}>
    <Modal.Content>
      <Modal.Body>
        <Heading>Title</Heading>
        <button>One</button>
        {ContentSpec.generate(6).map(({ id, content }) => (
          <p key={id}>{content}</p>
        ))}
        <button>Two</button>
        <button>Three</button>
        {ContentSpec.generate(6).map(({ id, content }) => (
          <p key={id}>{content}</p>
        ))}
        <button>Four</button>
      </Modal.Body>
    </Modal.Content>
  </Modal>
)

Tabbing.story = {
  name: 'tabbing',
}

class HSAppExample extends React.Component {
  state = {
    hsApp: true,
    isOpen: true,
  }

  toggle = () => {
    this.setState({
      hsApp: !this.state.hsApp,
    })
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  closeModal = () => {
    this.setState({
      isOpen: false,
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleModal}>Toggle Modal</button>
        {this.state.isOpen && (
          <Frame
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          >
            <Modal isOpen onClose={this.closeModal} isHsApp={this.state.hsApp}>
              <Modal.Content>
                <Modal.Body>
                  <Heading>Title</Heading>
                  <FormLabel label="See HS App styles">
                    <Switch checked={this.state.hsApp} onChange={this.toggle} />
                  </FormLabel>
                  <Button kind="primary">Primary Button</Button>
                  <Button>Button</Button>
                  {ContentSpec.generate(12).map(({ id, content }) => (
                    <p key={id}>{content}</p>
                  ))}
                </Modal.Body>
              </Modal.Content>
            </Modal>
          </Frame>
        )}
      </div>
    )
  }
}

export const HsApp = () => <HSAppExample />

HsApp.story = {
  name: 'HSApp',
}

export const Styled = () => {
  const StyledModal = styled(Modal)`
    .c-ModalOverlay {
      background: purple;
    }
  `

  return (
    <StyledModal isOpen>
      <Modal.Content>
        <Modal.Body>
          {ContentSpec.generate(12).map(({ id, content }) => (
            <p key={id}>{content}</p>
          ))}
        </Modal.Body>
      </Modal.Content>
    </StyledModal>
  )
}

Styled.story = {
  name: 'styled',
}
