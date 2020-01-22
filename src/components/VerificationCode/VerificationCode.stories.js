import React from 'react'
import { storiesOf } from '@storybook/react'
import VerificationCode from './'

const stories = storiesOf('VerificationCode', module)

stories.add('Default', () => {
  return <VerificationCode />
})

stories.add('Invalid', () => {
  return (
    <VerificationCode
      isValid={false}
      onChange={val => {
        console.log(val)
      }}
    />
  )
})
