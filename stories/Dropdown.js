import React from 'react'
import { storiesOf } from '@storybook/react'
import { Dropdown } from '../src/index.js'
import { action } from '@storybook/addon-actions'

const logAction = () => {
  action('Action!')
  console.log('Action')
}

storiesOf('Dropdown', module)
  .add('default', () => (
    <Dropdown.Menu>
      <Dropdown.Item onFocus={logAction}>
        Hello 1
      </Dropdown.Item>
      <Dropdown.Item onFocus={logAction}>
        Hello 2
      </Dropdown.Item>
      <Dropdown.Item onFocus={logAction}>
        Hello 3
      </Dropdown.Item>
      <Dropdown.Item onFocus={logAction}>
        Hello 4
      </Dropdown.Item>
      <Dropdown.Item onFocus={logAction}>
        Hello 5
      </Dropdown.Item>
      <Dropdown.Item onFocus={logAction}>
        Hello 6
      </Dropdown.Item>
    </Dropdown.Menu>
  ))
