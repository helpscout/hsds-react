// @flow
import React from 'react'
import classNames from '../../utilities/classNames'
import { stateTypes } from '../../constants/propTypes'
import type { UIStates } from '../../constants/types'

type Props = {
  checkbox?: boolean,
  className?: string,
  disabled: boolean,
  readOnly: boolean,
  state: UIStates,
}

const Backdrop = (props: Props) => {
  const { className, checkbox, disabled, readOnly, state, ...rest } = props

  const componentClassName = classNames(
    'c-InputBackdrop',
    checkbox && 'is-checkbox',
    disabled && 'is-disabled',
    readOnly && 'is-readonly',
    state && `is-${state}`,
    className
  )

  return <div className={componentClassName} role="presentation" {...rest} />
}

Backdrop.defaultProps = {
  disabled: false,
  readOnly: false,
  state: 'default',
}

export default Backdrop
