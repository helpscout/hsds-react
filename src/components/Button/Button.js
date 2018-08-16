// @flow
import type { UIState } from '../../constants/types'
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { namespaceComponent } from '../../utilities/component'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import RouteWrapper from '../RouteWrapper'
import { COMPONENT_KEY } from './utils'

type ButtonSelector = 'a' | 'button' | 'input'

type ButtonSize = 'lg' | 'md' | 'sm' | 'xs'

type Props = {
  accessibilityLabel?: string,
  block: boolean,
  buttonRef: (ref: any) => {},
  children?: any,
  className?: string,
  danger: boolean,
  disabled: boolean,
  isActive: boolean,
  isFirst: boolean,
  isNotOnly: boolean,
  isLast: boolean,
  outline: boolean,
  plain: boolean,
  primary: boolean,
  selector: ButtonSelector,
  size: ButtonSize,
  state?: UIState,
  submit: boolean,
  theme?: string,
}

class Button extends Component<Props> {
  static defaultProps = {
    block: false,
    buttonRef: noop,
    danger: false,
    disable: false,
    isActive: false,
    isFirst: false,
    isNotOnly: false,
    isLast: false,
    outline: false,
    plain: false,
    primary: false,
    selector: 'button',
    size: 'md',
    submit: false,
  }

  static BlueComponentVersion = 1

  render() {
    const {
      accessibilityLabel,
      block,
      buttonRef,
      children,
      className,
      disabled,
      isActive,
      isFirst,
      isNotOnly,
      isLast,
      outline,
      plain,
      primary,
      size,
      state,
      submit,
      theme,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-Button',
      isActive && 'is-selected',
      block && 'c-Button--block',
      isFirst && 'is-first',
      isNotOnly && 'is-notOnly',
      isLast && 'is-last',
      outline && 'c-Button--outline',
      plain && 'c-Button--link',
      primary && 'c-Button--primary',
      size && `c-Button--${size}`,
      state && `is-${state}`,
      theme && `c-Button--${theme}`,
      className
    )

    const type = submit ? 'submit' : 'button'

    return (
      <button
        {...getValidProps(rest)}
        aria-label={accessibilityLabel}
        ref={buttonRef}
        className={componentClassName}
        disabled={disabled}
        type={type}
      >
        {children}
      </button>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(Button)

export default RouteWrapper(Button)
