import React from 'react'
import { storiesOf } from '@storybook/react'
import Draggable from 'react-draggable'
import { action } from '@storybook/addon-actions'
import AutoDropdown from '../src/components/AutoDropdown'
import Button from '../src/components/Button'
import Input from '../src/components/Input'
import Modal from '../src/components/Modal'
import styled from '../src/components/styled'
import { boolean, number, select, text } from '@storybook/addon-knobs'
import { createSpec, faker } from '@helpscout/helix'

const stories = storiesOf('AutoDropdown/QA', module)

const makeProps = () => {
  const wordLength = select(
    'itemWordLength',
    {
      normal: 'normal',
      long: 'long',
    },
    'normal'
  )
  const numberOfItems = number('numberOfItems', 30)
  const limit = number('limit', 15)
  const triggerLabel = text('triggerLabel', 'Dropdown')

  const ItemSpec = createSpec({
    id: faker.random.uuid(),
    value: faker.name.firstName(),
    label: () => {
      return wordLength === 'normal'
        ? faker.name.firstName()()
        : faker.lorem.paragraph()()
    },
    onClick: () => (value, props) => console.log('Clicked!', value),
  })

  const maxHeight = number('maxHeight', 320)
  const minWidth = number('minWidth', 180)

  const position = select(
    'position',
    {
      absolute: 'absolute',
      fixed: 'fixed',
    },
    'absolute'
  )

  const dropUp = boolean('dropUp', false)

  const direction = select(
    'direction',
    {
      left: 'left',
      right: 'right',
    },
    'right'
  )

  return {
    items: ItemSpec.generate(numberOfItems),
    limit,
    maxHeight,
    minWidth,
    trigger: triggerLabel,
    position,
    direction,
    dropUp,
    shouldDropDirectionUpdate: props => {
      action('shouldDropDirectionUpdate')(props)
      return true
    },
    onOpen: action('onOpen'),
    onClose: action('onClose'),
  }
}

stories.add('Alignment/Position', () => {
  const props = makeProps()
  const isOpen = boolean('isOpen', false)
  const forceDropDown = boolean('forceDropDown', false)

  const Positioner = ({ children }) => {
    const style = {
      cursor: 'grab',
      display: 'inline-block',
      padding: 20,
      border: '1px dotted #ddd',
    }

    return (
      <Draggable>
        <div style={style}>
          <span style={{ opacity: 0.2, fontSize: 10 }}>DRAG ME</span>
          {children}
        </div>
      </Draggable>
    )
  }

  const otherProps = {
    forceDropDown,
    isOpen,
  }

  return (
    <Positioner>
      <AutoDropdown {...props} {...otherProps} />
    </Positioner>
  )
})

stories.add('Within Modal', () => {
  const WordSpec = createSpec({
    key: faker.random.uuid(),
    children: faker.lorem.sentence(),
  })

  const props = {
    ...makeProps(),
    dropUp: boolean('dropUp', false),
    forceDropDown: boolean('forceDropDown', true),
  }

  class Example extends React.Component {
    state = { count: 0 }

    increment = () => this.setState({ count: this.state.count + 1 })

    render() {
      return (
        <Modal trigger={<Button>Open Modal</Button>}>
          <Modal.Body>
            <Button version={2} onClick={this.increment} kind="primaryAlt">
              Update State
            </Button>
            <br />
            {[...Array(this.state.count)].map(i => {
              const content = WordSpec.generate()
              return <p {...content} />
            })}
            <br />
            <AutoDropdown {...props}>Dropdown</AutoDropdown>
          </Modal.Body>
        </Modal>
      )
    }
  }

  return <Example />
})
