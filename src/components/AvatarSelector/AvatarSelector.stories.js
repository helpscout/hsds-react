import React from 'react'
import AvatarSpec from '../../utilities/specs/avatarGrid.specs'
import Dropdown from '../Dropdown'
import { AvatarSelector } from '../index'
import styled from '../styled'
import { getColor } from '../../styles/utilities/color'

const withDarkerBackground = storyFn => <DarkerUI>{storyFn()}</DarkerUI>

export default {
  component: AvatarSelector,
  title: 'Components/Badges/AvatarSelector',
  decorators: [withDarkerBackground],
}

const DarkerUI = styled.div`
  background-color: ${getColor('grey.500')};
  padding: 50px;
`
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

export const Default = () => <AvatarSelector />

Default.story = {
  name: 'default',
}

export const WithDropdown = () => <AvatarSelectorWithDropdown />

WithDropdown.story = {
  name: 'with dropdown',
}

export const WithImage = () => (
  <AvatarSelector image={fixtures[0].image} name="Buzz Arooooooo" />
)

WithImage.story = {
  name: 'with image',
}

export const WithInitials = () => <AvatarSelector name="Buzz Arooooooo" />

WithInitials.story = {
  name: 'with initials',
}
