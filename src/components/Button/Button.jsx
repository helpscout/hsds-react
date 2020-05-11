import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { includes } from '../../utilities/arrays'
import { noop } from '../../utilities/other'
import RouteWrapper from '../RouteWrapper'
import { ButtonUI, LoadingWrapperUI, FocusUI, SpinnerUI } from './Button.css'
import Icon from '../Icon'

class Button extends React.PureComponent {
  static propTypes = {
    allowContentEventPropogation: PropTypes.bool,
    buttonRef: PropTypes.func,
    canRenderFocus: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    disableOnLoading: PropTypes.bool,
    kind: PropTypes.string,
    href: PropTypes.string,
    innerRef: PropTypes.any,
    isActive: PropTypes.bool,
    isBlock: PropTypes.bool,
    isFirst: PropTypes.bool,
    isFocused: PropTypes.bool,
    isHovered: PropTypes.bool,
    isNotOnly: PropTypes.bool,
    isLast: PropTypes.bool,
    isLoading: PropTypes.bool,
    isSuffix: PropTypes.bool,
    shape: PropTypes.string,
    size: PropTypes.string,
    spinButtonOnLoading: PropTypes.bool,
    state: PropTypes.string,
    submit: PropTypes.bool,
    theme: PropTypes.string,
    to: PropTypes.string,
  }

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

    return this.props.href
  }

  shouldShowFocus = () => {
    const paddedButtonKinds = ['primary', 'secondary', 'tertiary']

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
      size && `is-${size === 'lgxl' ? 'xl' : size}`, // remapping lgxl to xl
      spinButtonOnLoading && 'is-spinButtonOnLoading',
      state && `is-${state}`,
      theme && `is-${theme}`,
      className
    )

    const type = submit ? 'submit' : 'button'

    const selector = this.isLink() ? 'a' : 'button'

    const childrenMarkup = this.getChildrenMarkup()

    return (
      <ButtonUI
        {...getValidProps(rest)}
        className={componentClassName}
        disabled={isDisabled}
        ref={this.setRef}
        type={type}
        as={selector}
        allowContentEventPropogation={allowContentEventPropogation}
      >
        {isLoading && <SpinnerUI />}
        {isLoading ? (
          <LoadingWrapperUI>{childrenMarkup}</LoadingWrapperUI>
        ) : (
          childrenMarkup
        )}
        {this.getFocusMarkup()}
      </ButtonUI>
    )
  }
}

export default RouteWrapper(Button)
