// @flow
import type { UIState } from '../../constants/types'
import React from 'react'
import classNames from '../../utilities/classNames'

type Props = {
  checkbox?: boolean,
  className?: string,
  disabled: boolean,
  readOnly: boolean,
  seamless: boolean,
  state?: ?UIState,
}

const Backdrop = (props: Props) => {
  const {
    className,
    checkbox,
    disabled,
    readOnly,
    seamless,
    state,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-InputBackdrop',
    checkbox && 'is-checkbox',
    disabled && 'is-disabled',
    readOnly && 'is-readonly',
    seamless && 'is-seamless',
    state && `is-${state}`,
    className
  )

  return <div className={componentClassName} role="presentation" {...rest} />
}

Backdrop.defaultProps = {
  disabled: false,
  readOnly: false,
  seamless: false,
  state: 'default',
}

export default Backdrop
