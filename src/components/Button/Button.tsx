import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { includes } from '../../utilities/arrays'
import { noop } from '../../utilities/other'
import RouteWrapper from '../RouteWrapper'
import { ButtonUI, ButtonContentUI, FocusUI, SpinnerUI } from './Button.css'
import Icon from '../Icon'
import { ButtonKind, ButtonShape, ButtonSize } from './Button.types'
import { UIState } from '../../constants/types'

export interface Props {
  allowContentEventPropogation: boolean
  buttonRef: (ref: any) => void
  canRenderFocus: boolean
  children?: any
  className?: string
  disabled: boolean
  disableOnLoading: boolean
  kind: ButtonKind
  href?: string
  innerRef: (ref: any) => void
  isActive: boolean
  isBlock: boolean
  isFirst: boolean
  isFocused: boolean
  isHovered: boolean
  isNotOnly: boolean
  isLast: boolean
  isLoading: boolean
  isSuffix: boolean
  shape: ButtonShape
  size: ButtonSize
  spinButtonOnLoading: boolean
  state?: UIState
  submit: boolean
  theme?: string
  to?: string
}

class Button extends React.PureComponent<Props> {
  static defaultProps = {
    allowContentEventPropogation: true,
    buttonRef: noop,
    canRenderFocus: true,
    disable: false,
    disableOnLoading: true,
    kind: 'default',
    innerRef: noop,
    isActive: false,
    isBlock: false,
    isFocused: false,
    isFirst: false,
    isHovered: false,
    isNotOnly: false,
    isLast: false,
    isSuffix: false,
    shape: 'default',
    size: 'md',
    spinButtonOnLoading: false,
    submit: false,
  }

  isLink() {
    // TODO: Resolve data-bypass
    // const { href, 'data-bypass': dataBypass } = this.props
    // return href || dataBypass

    // TODO: fix typescript complains
    // @ts-ignore
    return this.props.href
  }

  shouldShowFocus = (): boolean => {
    const paddedButtonKinds = [
      'primary',
      'primaryAlt',
      'secondary',
      'secondaryAlt',
      'tertiary',
    ]

    return (
      !this.props.disabled &&
      this.props.canRenderFocus &&
      includes(paddedButtonKinds, this.props.kind)
    )
  }

  getFocusMarkup = () => {
    const { isFirst, isNotOnly, isLast, shape } = this.props

    const focusClassName = classNames(
      'c-ButtonFocus',
      isFirst && 'is-first',
      isNotOnly && 'is-notOnly',
      isLast && 'is-last',
      shape && `is-shape-${shape}`
    )

    if (!this.shouldShowFocus()) return null

    return <FocusUI className={focusClassName} role="presentation" />
  }

  setRef = ref => {
    this.props.innerRef(ref)
    this.props.buttonRef(ref)
  }

  getChildrenMarkup = () => {
    const { children } = this.props

    return React.Children.map(children, (child, index) => {
      if (!child) return child
      if (child && !child.hasOwnProperty('type')) return child
      if (child.type !== Icon) return child
      const len = React.Children.count(children)
      const isFirst = index === 0
      const isLast = index === len - 1
      const isOnly = isFirst && isLast

      return React.cloneElement(child, {
        offsetLeft: isFirst && !isOnly,
        offsetRight: isLast && !isOnly,
      })
    })
  }

  render() {
    const {
      allowContentEventPropogation,
      children,
      className,
      disabled,
      disableOnLoading,
      kind,
      innerRef,
      isActive,
      isBlock,
      isFirst,
      isFocused,
      isHovered,
      isNotOnly,
      isLast,
      isLoading,
      isSuffix,
      shape,
      size,
      spinButtonOnLoading,
      state,
      submit,
      theme,
      // Deprecating
      buttonRef,
      ...rest
    } = this.props

    const isDisabled = disabled || (isLoading && disableOnLoading)

    const componentClassName = classNames(
      'c-Button',
      isActive && 'is-active',
      isBlock && 'is-block',
      isDisabled && 'is-disabled',
      isFirst && 'is-first',
      isFocused && 'is-focused',
      isHovered && 'is-hovered',
      isNotOnly && 'is-notOnly',
      isLast && 'is-last',
      isLoading && 'is-loading',
      isSuffix && 'is-suffix',
      kind && `is-${kind}`,
      shape && `is-shape-${shape}`,
      size && `is-${size}`,
      spinButtonOnLoading && 'is-spinButtonOnLoading',
      state && `is-${state}`,
      theme && `is-${theme}`,
      className
    )

    const type = submit ? 'submit' : 'button'

    const selector = this.isLink() ? 'a' : 'button'

    return (
      <ButtonUI
        {...getValidProps(rest)}
        className={componentClassName}
        disabled={isDisabled}
        ref={this.setRef}
        type={type}
        as={selector}
      >
        {isLoading ? <SpinnerUI /> : null}
        <ButtonContentUI
          allowContentEventPropogation={allowContentEventPropogation}
          className="c-Button__content c-Button__content"
          isLoading={isLoading}
        >
          {this.getChildrenMarkup()}
        </ButtonContentUI>
        {this.getFocusMarkup()}
      </ButtonUI>
    )
  }
}

export default RouteWrapper(Button)
