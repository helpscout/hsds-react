// @flow
import type { HeadingSize } from './types'
import React from 'react'
import styled from '../styled'
import classNames from '../../utilities/classNames'
import css from './styles/Heading.css.js'

type Props = {
  center: boolean,
  className?: string,
  children?: any,
  disableSelect: boolean,
  light?: boolean,
  lineHeightReset?: boolean,
  linkStyle?: boolean,
  selector?: string,
  size: HeadingSize,
}

const Heading = (props: Props) => {
  const {
    center,
    children,
    className,
    disableSelect,
    light,
    lineHeightReset,
    linkStyle,
    selector,
    size,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Heading',
    center && 'is-center',
    disableSelect && 'is-disableSelect',
    light && 'is-light',
    lineHeightReset && 'is-line-height-reset',
    linkStyle && 'is-linkStyle',
    size && `is-${size}`,
    className
  )

  const selectorTag = selector || 'div'

  const element = React.createElement(
    selectorTag,
    {
      ...rest,
      className: componentClassName,
    },
    children
  )

  return element
}

Heading.defaultProps = {
  center: false,
  disableSelect: false,
  linkStyle: false,
}

export default styled(Heading)(css)
