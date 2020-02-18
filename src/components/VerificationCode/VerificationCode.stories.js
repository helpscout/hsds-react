import React from 'react'
import VerificationCode from './'

export default {
  component: VerificationCode,
  title: 'Components/Forms/VerificationCode',
}

export const Default = () => {
  return <VerificationCode />
}

Default.story = {
  name: 'default',
}

export const Invalid = () => {
  return (
    <VerificationCode
      isValid={false}
      onChange={val => {
        console.log(val)
      }}
    />
  )
}

Invalid.story = {
  name: 'invalid',
}
