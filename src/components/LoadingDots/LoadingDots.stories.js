import React from 'react'
import { storiesOf } from '@storybook/react'
import { LoadingDots, Text } from '../index'

storiesOf('LoadingDots', module)
  .add('default', () => <LoadingDots />)
  .add('align', () => (
    <div>
      <Text>Left:</Text>
      <LoadingDots align="left" />
      <br />
      <Text>Center:</Text>
      <LoadingDots align="center" />
      <br />
      <Text>Left:</Text>
      <LoadingDots align="right" />
    </div>
  ))
