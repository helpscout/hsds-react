import React from 'react'
import { storiesOf } from '@storybook/react'
import { Animate } from '../src/index.js'

storiesOf('Animate', module)
  .add('default', () => (
    <div>
      Wait for it…
      <Animate sequence='fadeIn down'>
        <div className='dont-override-this'>Then, Fade In and Down</div>
      </Animate>
    </div>
  ))
  .add('custom wait/duration', () => (
    <div>
      Wait 1 second…
      <Animate sequence='fadeIn down' wait={1000} duration={400}>
        <div className='dont-override-this'>Then, Fade In and Down</div>
      </Animate>
    </div>
  ))
