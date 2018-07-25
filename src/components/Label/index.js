// @flow
import type { UIState } from '../../constants/types'
import React from 'react'
import Text from '../Text'
import styled from '../styled'
import classNames from '../../utilities/classNames'
import { isString } from '../../utilities/is'
import css from './styles/Label.css.js'

type Props = {
  className?: string,
  children?: any,
  for: string,
  state?: UIState,
}

const Label = (props: Props) => {
  const { className, children, for: htmlFor, state, ...rest } = props

  const componentClassName = classNames(
    'c-Label',
    state && `is-${state}`,
    className
  )

  const contentMarkup = isString(children) ? (
    <Text className="c-Label__text" faint>
      {children}
    </Text>
  ) : (
    children
  )

  return (
    <label className={componentClassName} htmlFor={htmlFor} {...rest}>
      {contentMarkup}
    </label>
  )
}

export default styled(Label)(css)
