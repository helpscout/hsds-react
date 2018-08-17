import React from 'react'
import { storiesOf } from '@storybook/react'
import { ChoiceGroup, RadioCard } from '../../src/index.js'

const stories = storiesOf('RadioCard', module)

const onChange = value => console.log(value)

stories.add('default', () => (
  <ChoiceGroup onChange={onChange}>
    <RadioCard name="choice" value="derek" />
    <RadioCard name="choice" value="hansel" />
    <RadioCard name="choice" value="mugatu" />
  </ChoiceGroup>
))
