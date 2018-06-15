// @flow
import React from 'react'
import Text from '../Text'
import { stateTypes } from '../../constants/propTypes'
import classNames from '../../utilities/classNames'
import { isString } from '../../utilities/strings'
import type { UIStates } from '../../constants/types'

type Props = {
  className?: string,
  children?: any,
  for: string,
  state: UIStates,
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

export default Label
