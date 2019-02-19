import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { shadows } from '../src/styles/configs/shadows'

const stories = storiesOf('Shadow', module)

stories.add('Default', () => {
  return (
    <div>
      <h3>Shadows</h3>
      {Object.keys(shadows).map(key => {
        const value = shadows[key]

        return (
          <div
            style={{
              boxShadow: value,
              borderRadius: 3,
              width: 50,
              height: 50,
              margin: 20,
              float: 'left',
            }}
            key={key}
          >
            {key}
          </div>
        )
      })}
    </div>
  )
})
