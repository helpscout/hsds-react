import React, { useMemo, forwardRef } from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'

import { ButtonUI, LoadingWrapperUI, SpinnerUI } from './Button.css'
import Icon from '../Icon'

const SIZE_XXL = 'xxl'
const SIZE_XL = 'xl'
const SIZE_LG = 'lg'
const SIZE_MD = 'md'
const SIZE_SM = 'sm'
const SIZE_XS = 'xs'
const SIZE_XXS = 'xxs'

const THEME_BLUE = 'blue'
const THEME_RED = 'red'
const THEME_GREEN = 'green'
const THEME_GREY = 'grey'

const STYLE_FILLED = 'filled'
const STYLE_LINK = 'link'
export const STYLE_OUTLINED = 'outlined'

export const SIZES = [
  SIZE_XXL,
  SIZE_XL,
  SIZE_LG,
  SIZE_MD,
  SIZE_SM,
  SIZE_XS,
  SIZE_XXS,
]
export const THEMES = [THEME_BLUE, THEME_RED, THEME_GREEN, THEME_GREY]

const useButtonTheme = ({ theme }) => {
  if (THEMES.includes(theme)) return theme
  if (theme === 'gray') return THEME_GREY
  return THEME_BLUE
}
const useButtonSize = ({ size }) => {
  if (SIZES.includes(size)) return size
  if (size === 'lgxl') return SIZE_XL // old overwrite
  return SIZE_LG
}
const useButtonStyle = ({ outlined, isLink }) => {
  if (isLink) return STYLE_LINK
  if (outlined) return STYLE_OUTLINED
  return STYLE_FILLED
}

const useButtonChildren = ({ children }) => {
  return useMemo(() => {
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
  }, [children])
}

const useButton = props => {
  const {
    as,
    className,
    disabled,
    href,
    isFirst,
    isLast,
    isNotOnly,
    loading,
    rel,
    rounded,
    submit,
    target,
    to,
    ...rest
  } = props

  const theme = useButtonTheme(props)
  const size = useButtonSize(props)
  const style = useButtonStyle(props)
  const children = useButtonChildren(props)

  const type = submit ? 'submit' : 'button'
  const hrefValue = href || to
  const selector = as || Boolean(hrefValue) ? 'a' : 'button'
  const isDisabled = disabled || loading

  const componentClassName = classNames(
    'c-Button',
    isDisabled && 'is-disabled',
    isFirst && 'is-first',
    isLast && 'is-last',
    isNotOnly && 'is-notOnly',
    loading && 'is-loading',
    rounded && 'is-rounded',
    size && `is-size-${size}`,
    style && `is-style-${style}`,
    theme && `is-theme-${theme}`,
    className
  )

  let additionalProps
  if (selector === 'button') {
    additionalProps = {
      type,
      disabled: isDisabled,
    }
  } else {
    additionalProps = {
      role: 'button',
      tabIndex: isDisabled ? undefined : 0,
      href: selector === 'a' && isDisabled ? undefined : hrefValue,
      target: selector === 'a' ? target : undefined,
      'aria-disabled': !isDisabled ? undefined : isDisabled,
      rel: selector === 'a' ? rel : undefined,
    }
  }

  return {
    'data-testid': 'Button',
    ...getValidProps(rest),
    ...additionalProps,
    as: selector,
    className: componentClassName,
    children,
    loading,
  }
}

export const WrappedButton = forwardRef(function Button(props, ref) {
  const { loading, children, ...buttonProps } = useButton(props)

  return (
    <ButtonUI {...buttonProps} ref={ref}>
      {loading && <SpinnerUI className="c-Button--spinner" />}
      {loading ? <LoadingWrapperUI>{children}</LoadingWrapperUI> : children}
    </ButtonUI>
  )
})

WrappedButton.defaultProps = {
  'data-cy': 'Button',
  disabled: false,
  isFirst: false,
  isLast: false,
  isLink: false,
  isNotOnly: false,
  rounded: false,
  loading: false,
  linked: false,
  size: SIZE_LG,
  submit: false,
  theme: THEME_BLUE,
}

WrappedButton.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Disable the button so it can't be clicked. */
  disabled: PropTypes.bool,
  /** Hyperlink for the button. This transforms the button to a `<a>` selector. */
  href: PropTypes.string,
  /** rel html attribute */
  rel: PropTypes.string,
  /** target html attribute */
  target: PropTypes.string,
  /** Renders a button with the link styles */
  linked: PropTypes.bool,
  /** Renders a loading `Spinner`. */
  loading: PropTypes.bool,
  /** Sets the size of the button. */
  size: PropTypes.oneOf(SIZES),
  /** Sets the `type` of the button to `"submit"`. */
  submit: PropTypes.bool,
  /** Applies a theme based style to the button. */
  theme: PropTypes.oneOf(THEMES),
  /** React Router path to navigate on click. */
  to: PropTypes.string,

  isFirst: PropTypes.bool,
  isNotOnly: PropTypes.bool,
  isLast: PropTypes.bool,

  /** Sets the button radius to 100%. */
  rounded: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default WrappedButton
