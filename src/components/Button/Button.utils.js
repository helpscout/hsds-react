import React, { useMemo } from 'react'
import { useTheme } from 'styled-components'

import { getValidProps } from '@hsds/utils-react'
import classNames from 'classnames'
import Icon from '../Icon'
import { Link as ReactRouterLink } from 'react-router-dom'

export const SIZE_XXL = 'xxl'
export const SIZE_XL = 'xl'
export const SIZE_LG = 'lg'
export const SIZE_MD = 'md'
export const SIZE_SM = 'sm'
export const SIZE_XS = 'xs'
export const SIZE_XXS = 'xxs'

export const THEME_BLUE = 'blue'
export const THEME_RED = 'red'
export const THEME_GREEN = 'green'
export const THEME_GREY = 'grey'
export const THEME_BRAND = 'brand'

export const STYLE_FILLED = 'filled'
export const STYLE_LINK = 'link'
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
  const styledTheme = useTheme()

  if (styledTheme && styledTheme.brandColor) {
    return THEME_BRAND
  }
  if (THEMES.includes(theme)) return theme
  if (theme === 'gray') return THEME_GREY
  return THEME_BLUE
}
const useButtonSize = ({ size }) => {
  if (SIZES.includes(size)) return size
  if (size === 'lgxl') return SIZE_XL // old overwrite
  return SIZE_LG
}
const useButtonStyle = ({ filled, outlined, linked }) => {
  if (filled) return STYLE_FILLED
  if (outlined) return STYLE_OUTLINED
  if (linked) return STYLE_LINK
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

export const useButtonClassnames = (defaultClassname, props) => {
  const {
    className,
    disabled,
    inlined,
    isFirst,
    isLast,
    isNotOnly,
    loading,
    prefixIcon,
    rounded,
    seamless,
    suffixIcon,
  } = props

  const theme = useButtonTheme(props)
  const size = useButtonSize(props)
  const style = useButtonStyle(props)

  const isDisabled = disabled || loading

  return classNames(
    defaultClassname,
    seamless && `is-seamless`,
    isDisabled && 'is-disabled',
    isFirst && 'is-first',
    isLast && 'is-last',
    isNotOnly && 'is-notOnly',
    loading && 'is-loading',
    rounded && 'is-rounded',
    size && `is-size-${size}`,
    style && `is-style-${style}`,
    theme && `is-theme-${theme}`,
    inlined && 'is-inlined',
    prefixIcon && 'has-prefix-icon',
    suffixIcon && 'has-suffix-icon',
    className
  )
}

export const useButtonAs = ({
  as,
  disabled,
  href,
  loading,
  rel,
  tabIndex,
  submit,
  target,
  to,
}) => {
  const isDisabled = disabled || loading
  const type = submit ? 'submit' : 'button'
  const hrefValue = href || to
  const selector = as || Boolean(hrefValue) ? 'a' : 'button'

  if (selector === 'button') {
    return {
      as: to ? ReactRouterLink : selector,
      to: to ? to : undefined,
      type,
      disabled: isDisabled,
    }
  }

  return {
    as: to ? ReactRouterLink : selector,
    role: 'button',
    tabIndex: isDisabled ? undefined : tabIndex || 0,
    href: selector === 'a' && isDisabled ? undefined : hrefValue,
    to: to ? to : undefined,
    target: selector === 'a' ? target : undefined,
    'aria-disabled': !isDisabled ? undefined : isDisabled,
    rel: selector === 'a' ? rel : undefined,
  }
}

export const useButton = props => {
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
    ...otherProps
  } = props

  const children = useButtonChildren(props)
  const componentClassName = useButtonClassnames('c-Button', props)

  const additionalProps = useButtonAs({
    as,
    disabled,
    href,
    loading,
    rel,
    submit,
    target,
    to,
  })

  const { prefixIcon, suffixIcon, ...rest } = otherProps

  return {
    'data-testid': 'Button',
    ...getValidProps(rest),
    ...additionalProps,
    className: componentClassName,
    children,
    loading,
    prefixIcon,
    suffixIcon,
  }
}
