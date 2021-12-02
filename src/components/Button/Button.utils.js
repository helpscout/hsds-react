import React, { useMemo } from 'react'
import { useTheme } from 'styled-components'

import getValidProps from '@helpscout/react-utils/dist/getValidProps'
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

export const useButtonClassnames = (defaultClassname, props, isDisabled) => {
  const {
    seamless,
    className,
    isFirst,
    isLast,
    isNotOnly,
    loading,
    rounded,
  } = props

  const theme = useButtonTheme(props)
  const size = useButtonSize(props)
  const style = useButtonStyle(props)

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
    className
  )
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
    ...rest
  } = props

  const children = useButtonChildren(props)
  const isDisabled = disabled || loading
  const componentClassName = useButtonClassnames('c-Button', props, isDisabled)

  const type = submit ? 'submit' : 'button'
  const hrefValue = href || to
  const selector = as || Boolean(hrefValue) ? 'a' : 'button'

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
    as: to ? ReactRouterLink : selector,
    className: componentClassName,
    children,
    loading,
  }
}
