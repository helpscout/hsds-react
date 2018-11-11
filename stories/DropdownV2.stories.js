import React from 'react'
import { storiesOf } from '@storybook/react'
import Artboard from '@helpscout/artboard'
import Dropdown from '../src/components/Dropdown/DropdownV2'

const stories = storiesOf('DropdownV2', module)

stories.add('Default', () => (
  <Artboard name="dropdown-v2">
    <Dropdown />
  </Artboard>
))
