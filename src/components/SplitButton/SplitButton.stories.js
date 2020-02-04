import React from 'react'
import { storiesOf } from '@storybook/react'
import { createSpec, faker } from '@helpscout/helix'
import { withArtboard } from '@helpscout/artboard'
import Flexy from '../Flexy'
import Button from '../Button'
import SplitButton from '.'
import Modal from '../Modal'

const stories = storiesOf('Components/SplitButton', module)

stories.addDecorator(
  withArtboard({
    width: 500,
    height: 300,
    withCenterGuides: false,
  })
)

const ItemSpec = createSpec({
  label: faker.lorem.words(),
  value: faker.lorem.words(),
  onClick: () => event => console.log('Item Clicked!', event),
})

const dropdownProps = {
  items: ItemSpec.generate(20),
  onSelect: value => console.log(value),
}

const buildGrid = ({ disabled = false } = {}) => {
  const style = { marginBottom: '3px' }

  return (
    <Flexy>
      <Flexy.Item>
        {['tertiary', 'primary', 'primaryAlt'].map(kind => (
          <SplitButton
            disabled={disabled}
            dropdownProps={dropdownProps}
            kind={kind}
            style={style}
          >
            Click Me
          </SplitButton>
        ))}
      </Flexy.Item>
      <Flexy.Item>
        {['success', 'danger'].map(state => (
          <SplitButton
            disabled={disabled}
            dropdownProps={dropdownProps}
            kind="primary"
            state={state}
            style={style}
          >
            Click Me
          </SplitButton>
        ))}
      </Flexy.Item>
    </Flexy>
  )
}

stories.add('Default', () => {
  return (
    <SplitButton
      dropdownProps={dropdownProps}
      kind="primary"
      onClick={() => alert('Button Clicked!')}
      size="lg"
    >
      Submit
    </SplitButton>
  )
})

stories.add('Sizes and Colours', () => {
  return (
    <div>
      <SplitButton dropdownProps={dropdownProps} kind="tertiary" size="sm">
        Small
      </SplitButton>
      <SplitButton dropdownProps={dropdownProps} kind="primaryAlt" size="md">
        Medium
      </SplitButton>
      <SplitButton dropdownProps={dropdownProps} kind="primary" size="lg">
        Primary
      </SplitButton>
    </div>
  )
})

stories.add('Colors', () => buildGrid())

stories.add('Disabled', () => buildGrid({ disabled: true }))

stories.add('Within Modal', () => {
  const WordSpec = createSpec({
    key: faker.random.uuid(),
    children: faker.lorem.sentence(),
  })

  class Example extends React.Component {
    state = { count: 0 }

    increment = () => this.setState({ count: this.state.count + 1 })

    render() {
      return (
        <Modal trigger={<Button>Open dis modal</Button>}>
          <Modal.Body>
            <Button onClick={this.increment} kind="primaryAlt">
              Update State
            </Button>
            <br />
            {[...Array(this.state.count)].map(i => {
              const content = WordSpec.generate()
              return <p {...content} />
            })}
            <br />
            <SplitButton
              dropdownProps={{
                ...dropdownProps,
              }}
              kind="primary"
              size="lg"
            >
              Primary
            </SplitButton>
          </Modal.Body>
        </Modal>
      )
    }
  }

  return <Example />
})
