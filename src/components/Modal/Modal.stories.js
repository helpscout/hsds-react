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

export const HeaderFooter = () => (
  <Modal trigger={<Link onClick={e => e.preventDefault()}>Clicky</Link>}>
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
