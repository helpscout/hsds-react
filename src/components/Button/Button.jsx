import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { includes } from '../../utilities/arrays'
import { noop } from '../../utilities/other'
import RouteWrapper from '../RouteWrapper'
import { ButtonUI, LoadingWrapperUI, FocusUI, SpinnerUI } from './Button.css'
import Icon from '../Icon'

export class Button extends React.PureComponent {
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
      if (!child) return
      if (!child.hasOwnProperty('type')) return child
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
        {isLoading && <SpinnerUI className="c-Button--spinner" />}
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

Button.defaultProps = {
  allowContentEventPropogation: true,
  buttonRef: noop,
  canRenderFocus: true,
  'data-cy': 'Button',
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

Button.propTypes = {
  /** Enables child events to pass through to Button.*/
  allowContentEventPropagation: PropTypes.bool,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Disable the button so it can't be clicked. */
  disabled: PropTypes.bool,
  /** Disables the button when `isLoading` is true.*/
  disableOnLoading: PropTypes.bool,
  /** function which returns a promise, will be invoked before routing the `to` route */
  fetch: PropTypes.func,
  /** Hyperlink for the button. This transforms the button to a `<a>` selector. */
  href: PropTypes.string,
  /** Retrieves the `button` DOM node. */
  buttonRef: PropTypes.func,
  /** Renders the focused style. */
  isFocused: PropTypes.bool,
  /** Renders a loading `Spinner`. */
  isLoading: PropTypes.bool,
  /** Renders suffix styles. */
  isSuffix: PropTypes.bool,
  /** Applies the specified style to the button.
   * 'primary': Blue button. Used for primary actions.
   * 'secondary': White button with a border. Used for secondary actions.
   * 'tertiary': White button with a green border. Used for secondary actions.
   * 'default': Borderless button. Used for subtle/tertiary actions.
   * 'link': Button that looks like a `Link`. Used for subtle/tertiary actions.
   */
  kind: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'default',
    'link',
  ]),
  /** Sets the size of the button. */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** A special property that... spins the button if `isLoading`. */
  spinButtonOnLoading: PropTypes.bool,
  /** Applies state styles to the button.
   * 'danger': red.
   * 'success': green.
   * 'gray': gray.
   * 'warning': orange.
   */
  state: PropTypes.string,
  /** Sets the `type` of the button to `"submit"`. */
  submit: PropTypes.bool,
  /** Applies a theme based style to the button. */
  theme: PropTypes.string,
  /** React Router path to navigate on click. */
  to: PropTypes.string,
  canRenderFocus: PropTypes.bool,
  innerRef: PropTypes.any,
  isActive: PropTypes.bool,
  isBlock: PropTypes.bool,
  isFirst: PropTypes.bool,
  isHovered: PropTypes.bool,
  isNotOnly: PropTypes.bool,
  isLast: PropTypes.bool,
  shape: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default RouteWrapper(Button)
