import React from 'react'
import { storiesOf } from '@storybook/react'
import { Flexy } from '../src/index.js'

storiesOf('Flexy', module)
  .add('default', () => (
    <Flexy gap='sm'>
      <Flexy.Block>
        Block
      </Flexy.Block>
      <Flexy.Item>
        Item
      </Flexy.Item>
      <Flexy.Item>
        Item
      </Flexy.Item>
    </Flexy>
  ))
