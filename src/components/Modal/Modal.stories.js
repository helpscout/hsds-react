import React from 'react'
import { createSpec, faker } from '@helpscout/helix'
import {
  SearchableDropdown,
  Button,
  Heading,
  Modal,
  Link,
  Popover,
} from '../index'

import SpeechBubble from '@helpscout/hsds-illos/speech-bubble'

export default {
  component: Modal,
  title: 'Components/Overlay/Modal',
}

const ContentSpec = createSpec({
  content: faker.lorem.paragraph(),
  id: faker.random.uuid(),
})

export const Default = () => (
  <Modal
    trigger={
      <Button kind="link" onClick={e => e.preventDefault()}>
        Open dis modal
      </Button>
    }
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

export const HeaderFooter = () => (
  <Modal
    trigger={
      <Button kind="link" onClick={e => e.preventDefault()}>
        Clicky
      </Button>
    }
  >
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
  name: 'with header and footer',
}

export const Nested = () => (
  <Modal
    trigger={
      <Button kind="link" onClick={e => e.preventDefault()}>
        Clicky
      </Button>
    }
  >
    <Modal.Body>
      <Heading>Title</Heading>
      {ContentSpec.generate(2).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}

      <Modal
        trigger={
          <Button kind="link" onClick={e => e.preventDefault()}>
            Level 2
          </Button>
        }
      >
        <Modal.Body>
          <Heading>Level 2</Heading>

          <Popover content="Popover! Let's go to level 3." zIndex={99999}>
            <Button>Popover</Button>
          </Popover>
          {ContentSpec.generate(2).map(({ id, content }) => (
            <p key={id}>{content}</p>
          ))}

          <Modal
            trigger={
              <Button kind="link" onClick={e => e.preventDefault()}>
                Level 3
              </Button>
            }
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

export const V2Default = () => (
  <Modal
    version={2}
    isOpen={false}
    trigger={<button>open modal</button>}
    title="Modal Title"
  >
    <Modal.Body version={2}>
      {ContentSpec.generate(2).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
    <Modal.ActionFooter primaryButtonText="Primary" />
  </Modal>
)

V2Default.story = {
  name: 'V2/default',
}

export const V2WithSecondaryButton = () => (
  <Modal
    version={2}
    isOpen={true}
    trigger={<Button kind="link">Clicky</Button>}
    title="Modal Title"
  >
    <Modal.Body version={2}>
      {ContentSpec.generate(2).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
    <Modal.ActionFooter
      primaryButtonText="Primary"
      secondaryButtonText="Secondary"
    />
  </Modal>
)

V2WithSecondaryButton.story = {
  name: 'V2/with secondary button',
}

export const V2WithDisabledPrimary = () => (
  <Modal
    version={2}
    isOpen={true}
    trigger={<Button kind="link">Clicky</Button>}
    title="Modal Title"
  >
    <Modal.Body version={2}>
      {ContentSpec.generate(2).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
    <Modal.ActionFooter
      primaryButtonText="Primary"
      secondaryButtonDisabled={true}
      primaryButtonDisabled={true}
      secondaryButtonText="Secondary"
    />
  </Modal>
)

V2WithDisabledPrimary.story = {
  name: 'V2/with disabled buttons',
}

export const V2WithDangerButton = () => (
  <Modal
    version={2}
    state="danger"
    isOpen={true}
    trigger={<Button kind="link">Clicky</Button>}
    icon="alert"
    iconSize="24"
    title="Change Subdomain?"
  >
    <Modal.Body version={2}>
      {ContentSpec.generate(2).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
    <Modal.ActionFooter state="danger" primaryButtonText="Change Subdomain" />
  </Modal>
)

V2WithDangerButton.story = {
  name: 'V2/with danger state',
}

export const V2WithVeryLongContent = () => (
  <Modal
    version={2}
    isOpen={true}
    trigger={<Button kind="link">Clicky</Button>}
    title="Modal Title"
  >
    <Modal.Body version={2}>
      {ContentSpec.generate(12).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
      <p>
        <a href="#">focusable anchor</a> and <a>not focusable anchor</a>
      </p>
    </Modal.Body>
    <Modal.ActionFooter
      primaryButtonText="Primary"
      secondaryButtonText="Secondary"
    />
  </Modal>
)

V2WithVeryLongContent.story = {
  name: 'V2/very long content',
}

export const V2BrandNoDescriptionSingleButton = () => (
  <Modal
    version={2}
    isOpen={true}
    kind="branded"
    illo={<SpeechBubble />}
    trigger={<Button kind="link">Clicky</Button>}
    title="Modal Title"
  >
    <Modal.Body version={2}>
      {ContentSpec.generate(1).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
    <Modal.ActionFooter primaryButtonText="Primary" />
  </Modal>
)

V2BrandNoDescriptionSingleButton.story = {
  name: 'V2/branded no description, single button',
}

export const V2BrandedDescriptionDangerButton = () => (
  <Modal
    version={2}
    isOpen={true}
    description="Before making it official we'd really appreciate your thoughts on what we can do to improve."
    kind="branded"
    illo={<SpeechBubble />}
    trigger={<Button kind="link">Clicky</Button>}
    title="Cancel your account?"
  >
    <Modal.Body version={2}>
      {ContentSpec.generate(1).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
    <Modal.ActionFooter
      primaryButtonText="Cancel my account"
      state={'danger'}
    />
  </Modal>
)

V2BrandedDescriptionDangerButton.story = {
  name: 'V2/branded description, danger state',
}

export const V2BrandedDescriptionSecondaryButton = () => (
  <Modal
    version={2}
    isOpen={true}
    description="A really interesting description about lots of really interesting things goes here which should be no more than two lines."
    kind="branded"
    illo={<SpeechBubble />}
    trigger={<Button kind="link">Clicky</Button>}
    title="Modal Title"
  >
    <Modal.Body version={2}>
      {ContentSpec.generate(1).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
    <Modal.ActionFooter
      primaryButtonText="Primary"
      secondaryButtonText="Secondary"
    />
  </Modal>
)

V2BrandedDescriptionSecondaryButton.story = {
  name: 'V2/branded description, secondary button',
}

export const V2ReallyLongContent = () => (
  <Modal
    version={2}
    isOpen={true}
    description="A really interesting description about lots of really interesting things goes here which should be no more than two lines."
    kind="branded"
    illo={<SpeechBubble />}
    trigger={<Button kind="link">Clicky</Button>}
    title="Modal Title"
  >
    <Modal.Body version={2}>
      {ContentSpec.generate(10).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
    <Modal.ActionFooter
      primaryButtonText="Primary"
      secondaryButtonText="Secondary"
    />
  </Modal>
)

V2ReallyLongContent.story = {
  name: 'V2/branded with very long content',
}

export const V2AlertNoDescription = () => (
  <Modal
    version={2}
    isOpen={true}
    kind="alert"
    trigger={<Button kind="link">Clicky</Button>}
    title="Discard this draft?"
  >
    <Modal.ActionFooter
      showDefaultCancel={false}
      kind={'alert'}
      primaryButtonText="Discard"
      secondaryButtonText="Cancel"
    />
  </Modal>
)

V2AlertNoDescription.story = {
  name: 'V2/Alert with no description',
}

export const V2AlertWithDescription = () => (
  <Modal
    version={2}
    isOpen={true}
    description="Short title providing a little more detail."
    kind="alert"
    trigger={<Button kind="link">Clicky</Button>}
    title="Alert Title"
  >
    <Modal.ActionFooter
      showDefaultCancel={false}
      kind={'alert'}
      primaryButtonText="Yes, do it"
      secondaryButtonText="Cancel"
    />
  </Modal>
)

V2AlertWithDescription.story = {
  name: 'V2/Alert with description',
}

export const V2AlertWithDangerState = () => (
  <Modal
    version={2}
    isOpen={true}
    kind="alert"
    description="You're about to do a thing that could impact a lot of other things. Continue?"
    state="danger"
    trigger={<Button kind="link">Clicky</Button>}
    title="Delete the thing?"
  >
    <Modal.ActionFooter
      showDefaultCancel={false}
      kind={'alert'}
      state="danger"
      primaryButtonText="Yes, do it"
      secondaryButtonText="Cancel"
    />
  </Modal>
)

V2AlertWithDangerState.story = {
  name: 'V2/Alert with danger state',
}

export const V2Sequence = () => (
  <Modal
    version={2}
    isOpen={true}
    kind="sequence"
    description="We'll send a six digit code to confirm ownership."
    numSteps={5}
    step={2}
    trigger={<Button kind="link">Clicky</Button>}
    title="What email address would you like to connect?"
  >
    <Modal.Body version={2}>
      {ContentSpec.generate(1).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
    <Modal.ActionFooter kind="default" primaryButtonText="Send code" />
  </Modal>
)

V2Sequence.story = {
  name: 'V2/Sequence',
}
