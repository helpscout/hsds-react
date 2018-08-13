// @flow
import type { UIState } from '../../constants/types'
import React from 'react'
import classNames from '../../utilities/classNames'

type Props = {
  checkbox?: boolean,
  className?: string,
  disabled: boolean,
  isFirst: boolean,
  isNotOnly: boolean,
  isLast: boolean,
  readOnly: boolean,
  state?: ?UIState,
}

const Backdrop = (props: Props) => {
  const {
    className,
    checkbox,
    disabled,
    isFirst,
    isNotOnly,
    isLast,
    readOnly,
    state,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-InputBackdrop',
    checkbox && 'is-checkbox',
    disabled && 'is-disabled',
    isFirst && 'is-first',
    isNotOnly && 'is-notOnly',
    isLast && 'is-last',
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
