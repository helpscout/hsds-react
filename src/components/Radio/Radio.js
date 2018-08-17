// @flow
import type { RadioKind } from './types'
import React from 'react'
import Choice from '../Choice'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'

type Props = {
  className?: string,
  kind: RadioKind,
}

const Radio = (props: Props) => {
  const { className, kind, ...rest } = props

  const componentClassName = classNames('c-Radio', className)

  return (
    <Choice
      {...rest}
      className={componentClassName}
      componentID="Radio"
      kind={kind}
      type="radio"
    />
  )
}

Radio.defaultProps = {
  kind: 'default',
}

namespaceComponent(COMPONENT_KEY)(Radio)

export default Radio
