// @flow
import type { UIState } from '../../constants/types'
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import RouteWrapper from '../RouteWrapper'
import { makeButtonUI } from './styles/Button.css.js'
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

  static displayName = 'Button'

  render() {
    const {
      accessibilityLabel,
      block,
      buttonRef,
      className,
      danger,
      isActive,
      isFirst,
      isNotOnly,
      isLast,
      outline,
      plain,
      primary,
      selector,
      size,
      state,
      submit,
      theme,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-ButtonV2',
      isActive && 'is-selected',
      block && 'is-block',
      isFirst && 'is-first',
      isNotOnly && 'is-notOnly',
      isLast && 'is-last',
      danger && 'is-danger',
      outline && 'is-outline',
      plain && 'is-plain',
      primary && 'is-primary',
      size && `is-${size}`,
      state && `is-${state}`,
      theme && `is-${theme}`,
      className
    )

    const type = submit ? 'submit' : 'button'

    const ButtonUI = makeButtonUI(selector)

    return (
      <ButtonUI
        {...getValidProps(rest)}
        aria-label={accessibilityLabel}
        className={componentClassName}
        innerRef={buttonRef}
        type={type}
      />
    )
  }
}

namespaceComponent(COMPONENT_KEY)(Button)

export default RouteWrapper(Button)
