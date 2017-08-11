import React from 'react'
import { storiesOf } from '@storybook/react'
import { Link } from '../src/index.js'

storiesOf('Link', module)
  .add('default', () => <Link href='https://github.com/helpscout/blue'>Linky</Link>)
