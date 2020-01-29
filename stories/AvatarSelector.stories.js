import React, { PureComponent as Component } from 'react'
import { storiesOf } from '@storybook/react'
import { AvatarSelector } from '../src/index'
import AvatarSpec from '../src/utilities/specs/avatarGrid.specs'
import Dropdown from '../src/components/Dropdown/DropdownV2'

const stories = storiesOf('AvatarSelector', module)
const fixtures = AvatarSpec.generate(20)

const avatarsItems = fixtures.map(({ name, id, image }) => {
  return {
    label: name,
    id,
    image,
    value: id,
  }
})

class AvatarSelectorWithDropdown extends React.Component {
  state = {
    image: '',
    isOpen: false,
  }

  onSelect = (value, event) => {
    this.setState({
      image: event.item.image,
      name: event.item.label,
    })
  }

  onClose = () => {
    this.setState({
      isOpen: false,
    })
  }

  onOpen = () => {
    this.setState({
      isOpen: true,
    })
  }

  render() {
    return (
      <Dropdown
        items={avatarsItems}
        onClose={this.onClose}
        onOpen={this.onOpen}
        onSelect={this.onSelect}
        renderTrigger={
          <AvatarSelector
            image={this.state.image}
            name={this.state.name}
            isOpen={this.state.isOpen}
          />
        }
      />
    )
  }
}

stories.add('default', () => <AvatarSelector />)
stories.add('with dropdown', () => <AvatarSelectorWithDropdown />)
stories.add('with image', () => (
  <AvatarSelector image={fixtures[0].image} name="Buzz Arooooooo" />
))
stories.add('with intials', () => <AvatarSelector name="Buzz Arooooooo" />)
