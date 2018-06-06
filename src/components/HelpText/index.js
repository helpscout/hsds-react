// @flow
import React from 'react'
import classNames from '../../utilities/classNames'
import Text from '../Text'
import { isString } from '../../utilities/strings'
import type { Sizes } from '../Text/types'
import type { UIStates } from '../../constants/types'

type Props = {
  children: any,
  className?: string,
  muted?: boolean,
  size?: Sizes,
  state?: UIStates,
}

const HelpText = (props: Props) => {
  const { children, className, muted, size, state, ...rest } = props

  const componentClassName = classNames(
    'c-HelpText',
    muted && `is-muted`,
    state && `is-${state}`,
    className
  )

  const contentMarkup = isString(children) ? (
    <Text className="c-HelpText__text" size={size}>
      {children}
    </Text>
  ) : (
    children
  )

  return (
    <div className={componentClassName} {...rest}>
      {contentMarkup}
    </div>
  )
}

HelpText.defaultProps = {
  size: '13',
  state: 'default',
}

export default HelpText
