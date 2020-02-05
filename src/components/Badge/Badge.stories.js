import React from 'react'
import { getColor } from '../../styles/utilities/color'
import { Badge } from '../index'

export default {
  component: Badge,
  title: 'Components/Badges/Badge',
}

export const Default = () => <Badge>Badger</Badge>

Default.story = {
  name: 'default',
}

export const Status = () => (
  <div>
    <Badge status="error">Badger</Badge>
    <Badge status="info">Badger</Badge>
    <Badge status="success">Badger</Badge>
    <Badge status="warning">Badger</Badge>
  </div>
)

Status.story = {
  name: 'status',
}

export const Styles = () => (
  <div>
    <Badge>Regular</Badge>
    <Badge white>White</Badge>
  </div>
)

Styles.story = {
  name: 'styles',
}

export const Size = () => (
  <div>
    <Badge size="md">Regular</Badge>
    <Badge size="sm">Small</Badge>
  </div>
)

Size.story = {
  name: 'size',
}

export const Square = () => (
  <div>
    <Badge isSquare>Regular</Badge>
  </div>
)

Square.story = {
  name: 'square',
}

export const Inverted = () => (
  <div>
    <Badge status="error" inverted={true}>
      Badger
    </Badge>
    <Badge status="info" inverted={true}>
      Badger
    </Badge>
    <Badge status="success" inverted={true}>
      Badger
    </Badge>
    <Badge status="warning" inverted={true}>
      Badger
    </Badge>
  </div>
)

Inverted.story = {
  name: 'inverted',
}

export const CustomColor = () => (
  <div>
    <Badge color={getColor('yellow.500')} inverted={true}>
      Badger
    </Badge>
    <Badge color={getColor('charcoal.200')} inverted={true}>
      Badger
    </Badge>
    <Badge color={getColor('red.500')} inverted={true}>
      Badger
    </Badge>
    <Badge color={getColor('green.500')} inverted={true}>
      Badger
    </Badge>
    <Badge color={getColor('blue.500')} inverted={true}>
      Badger
    </Badge>
    <Badge color={getColor('yellow.500')}>Badger</Badge>
    <Badge color={getColor('charcoal.200')}>Badger</Badge>
    <Badge color={getColor('red.500')}>Badger</Badge>
    <Badge color={getColor('green.500')}>Badger</Badge>
    <Badge color={getColor('blue.500')}>Badger</Badge>
  </div>
)

CustomColor.story = {
  name: 'custom color',
}

export const CustomTextColor = () => (
  <div>
    <Badge
      color={getColor('yellow.500')}
      textColor={getColor('blue.500')}
      inverted={true}
    >
      Badger
    </Badge>
    <Badge
      color={getColor('charcoal.200')}
      textColor={getColor('green.500')}
      inverted={true}
    >
      Badger
    </Badge>
  </div>
)

CustomTextColor.story = {
  name: 'custom textColor',
}
