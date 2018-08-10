// @flow
import type { UIState } from '../../constants/types'
import React from 'react'
import Text from '../Text'
import classNames from '../../utilities/classNames'
import { isString } from '../../utilities/is'
import { LabelUI } from './styles/Label.css.js'

type Props = {
  className?: string,
  children?: any,
  for: string,
  isMarginless: boolean,
  state?: UIState,
}

const Label = (props: Props) => {
  const {
    className,
    children,
    for: htmlFor,
    isMarginless,
    state,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Label',
    isMarginless && 'is-marginless',
    state && `is-${state}`,
    className
  )

  const contentMarkup = isString(children) ? (
    <Text className="c-Label__text" shade="subtle">
      {children}
    </Text>
  ) : (
    children
  )

  return (
    <LabelUI className={componentClassName} htmlFor={htmlFor} {...rest}>
      {contentMarkup}
    </LabelUI>
  )
}

Label.defaultProps = {
  isMarginless: false,
  state: 'default',
}

export default Label
