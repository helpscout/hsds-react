import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'

import { ButtonUI, LoadingWrapperUI, SpinnerUI } from './Button.css'
import Icon from '../Icon'

export const WrappedButton = forwardRef(function Button(props, ref) {
  const {
    as,
    children,
    className,
    disabled,
    isActive,
    isFirst,
    isFocused,
    isHovered,
    isLast,
    isLoading,
    isNotOnly,
    isSuffix,
    kind,
    shape,
    size,
    state,
    submit,
    theme,
    ...rest
  } = props

  const getChildrenMarkup = () => {
    const { children } = props

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

  const isDisabled = disabled || isLoading

  const componentClassName = classNames(
    'c-Button',
    isActive && 'is-active',
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
    state && `is-${state}`,
    theme && `is-${theme}`,
    className
  )

  const type = submit ? 'submit' : 'button'
  const isLink = Boolean(props.href) || Boolean(props.to)
  const selector = isLink ? 'a' : 'button'

  const childrenMarkup = getChildrenMarkup()

  return (
    <ButtonUI
      data-testid="Button"
      {...getValidProps(rest)}
      className={componentClassName}
      disabled={isDisabled}
      ref={ref}
      type={type}
      as={as || selector}
    >
      {isLoading && <SpinnerUI className="c-Button--spinner" />}
      {isLoading ? (
        <LoadingWrapperUI>{childrenMarkup}</LoadingWrapperUI>
      ) : (
        childrenMarkup
      )}
    </ButtonUI>
  )
})

WrappedButton.defaultProps = {
  'data-cy': 'Button',
  disable: false,
  kind: 'default',
  isActive: false,
  isFocused: false,
  isFirst: false,
  isHovered: false,
  isNotOnly: false,
  isLast: false,
  isSuffix: false,
  shape: 'default',
  size: 'md',
  submit: false,
}

WrappedButton.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Disable the button so it can't be clicked. */
  disabled: PropTypes.bool,
  /** Hyperlink for the button. This transforms the button to a `<a>` selector. */
  href: PropTypes.string,
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
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'lgxl', 'xs', 'xxs']),
  /** A special property that... spins the button if `isLoading`. */
  /** Applies state styles to the button.
   * 'danger': red.
   * 'success': green.
   * 'grey': grey.
   * 'warning': orange.
   */
  state: PropTypes.oneOf(['danger', 'success', 'grey', 'warning']),
  /** Sets the `type` of the button to `"submit"`. */
  submit: PropTypes.bool,
  /** Applies a theme based style to the button. */
  theme: PropTypes.string,
  /** React Router path to navigate on click. */
  to: PropTypes.string,
  isActive: PropTypes.bool,
  isFirst: PropTypes.bool,
  isHovered: PropTypes.bool,
  isNotOnly: PropTypes.bool,
  isLast: PropTypes.bool,
  /** Applies shape styles to the button.
   * 'default': rounded corner.
   * 'rounded': bigger border-radius, almost a circle (100px radius).
   */
  shape: PropTypes.oneOf(['default', 'rounded']),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default WrappedButton
