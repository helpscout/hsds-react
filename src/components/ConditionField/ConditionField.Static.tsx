import * as React from 'react'
import Input from '../Input'
import Text from '../Text'

export const FieldStatic = props => {
  const { children, ...rest } = props

  return (
    <Input.Static isCenterAlign {...rest}>
      <Text block shade="faint">
        {children}
      </Text>
    </Input.Static>
  )
}

export default FieldStatic
