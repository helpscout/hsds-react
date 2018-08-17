// @flow
import type { UIState } from '../../constants/types'
import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from '../../utilities/classNames'
import { BackdropUI, FocusUI } from './styles/BackdropV2.css.js'

type Props = {
  className?: string,
  choiceKind?: string,
  disabled: boolean,
  isFilled: boolean,
  isFocused: boolean,
  isFirst: boolean,
  isNotOnly: boolean,
  isLast: boolean,
  isSeamless: boolean,
  kind?: string,
  readOnly: boolean,
  showFocus: boolean,
  state?: ?UIState,
}

const Backdrop = (props: Props) => {
  const {
    choiceKind,
    className,
    disabled,
    isFilled,
    isFirst,
    isFocused,
    isNotOnly,
    isLast,
    isSeamless,
    kind,
    readOnly,
    showFocus,
    state,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-InputBackdropV2',
    choiceKind && `is-${choiceKind}`,
    disabled && 'is-disabled',
    isFilled && 'is-filled',
    isFocused && 'is-focused',
    isFirst && 'is-first',
    isNotOnly && 'is-notOnly',
    isLast && 'is-last',
    isSeamless && 'is-seamless',
    kind && `is-${kind}`,
    readOnly && 'is-readonly',
    state && `is-${state}`,
    className
  )

  const isRadio = choiceKind === 'radio'
  const canShowFocus = !isSeamless && isFocused && showFocus

  const focusMarkup = canShowFocus && (
    <FocusUI className={classNames(isRadio && 'is-radio')} />
  )

  return (
    <BackdropUI
      {...getValidProps(rest)}
      className={componentClassName}
      role="presentation"
    >
      {focusMarkup}
    </BackdropUI>
  )
}

Backdrop.defaultProps = {
  disabled: false,
  isFilled: false,
  isFocused: false,
  readOnly: false,
  seamless: false,
  showFocus: true,
  state: 'default',
}

export default Backdrop
