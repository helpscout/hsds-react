import React from 'react'
import { storiesOf } from '@storybook/react'
import { getColor } from '../../styles/utilities/color'
import { Badge } from '../index'

const stories = storiesOf('Components/Badge', module)

stories.add('default', () => <Badge>Badger</Badge>)

stories.add('status', () => (
  <div>
    <Badge status="error">Badger</Badge>
    <Badge status="info">Badger</Badge>
    <Badge status="success">Badger</Badge>
    <Badge status="warning">Badger</Badge>
  </div>
))

stories.add('styles', () => (
  <div>
    <Badge>Regular</Badge>
    <Badge white>White</Badge>
  </div>
))

stories.add('size', () => (
  <div>
    <Badge size="md">Regular</Badge>
    <Badge size="sm">Small</Badge>
  </div>
))

stories.add('square', () => (
  <div>
    <Badge isSquare>Regular</Badge>
  </div>
))

stories.add('inverted', () => (
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
))

stories.add('custom color', () => (
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
))

stories.add('custom textColor', () => (
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
))
