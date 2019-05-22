import * as React from 'react'
import Input from '../Input'
import Text from '../Text'

export const Static = props => {
  const { children, ...rest } = props

  return (
    <Input.Static isCenterAlign data-cy="ConditionFieldStatic" {...rest}>
      <Text block shade="faint">
        {children}
      </Text>
    </Input.Static>
  )
}

export default Static
