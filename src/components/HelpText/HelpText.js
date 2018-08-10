// @flow
import type { Sizes } from '../Text/types'
import type { TextShade, UIState } from '../../constants/types'
import React from 'react'
import classNames from '../../utilities/classNames'
import Text from '../Text'
import { isString } from '../../utilities/is'
import { HelpTextUI } from './styles/HelpText.css.js'

type Props = {
  children?: any,
  className?: string,
  isCompact: boolean,
  shade?: TextShade,
  size?: Sizes,
  state?: ?UIState,
}

const HelpText = (props: Props) => {
  const { children, className, isCompact, shade, size, state, ...rest } = props

  const componentClassName = classNames(
    'c-HelpText',
    isCompact && `is-compact`,
    shade && `is-${shade}`,
    state && `is-${state}`,
    className
  )

  const contentMarkup = isString(children) ? (
    <Text className="c-HelpText__text" shade={shade} size={size}>
      {children}
    </Text>
  ) : (
    children
  )

  return (
    <HelpTextUI className={componentClassName} {...rest}>
      {contentMarkup}
    </HelpTextUI>
  )
}

HelpText.defaultProps = {
  isCompact: false,
  shade: 'faint',
  size: '13',
  state: 'default',
}

export default HelpText
