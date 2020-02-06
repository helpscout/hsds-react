import * as React from 'react'
import { RadioKind } from './Radio.types'
import Choice from '../Choice'
import { classNames } from '../../utilities/classNames'

type Props = {
  className?: string
  kind: RadioKind
}

export const RadioContext = React.createContext({})

export const Radio = ({ kind: kindProp, className, ...rest }) => {
  const componentClassName = classNames('c-Radio', className)
  const { kind = kindProp, stacked }: any = React.useContext(RadioContext)

  return (
    <Choice
      {...rest}
      className={componentClassName}
      componentID="Radio"
      kind={kind}
      type="radio"
      stacked={stacked}
    />
  )
}

Radio.defaultProps = {
  kind: 'default',
}

export default Radio
