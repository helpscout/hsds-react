import * as React from 'react'
import { TextSize } from '../Text/Text.types'
import { TextShade, UIState } from '../../constants/types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import Text from '../Text'
import { isString } from '../../utilities/is'
import { HelpTextUI } from './styles/HelpText.css'

type Props = {
  children?: any
  className?: string
  isCompact: boolean
  shade?: TextShade
  size?: TextSize
  state?: UIState
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
    <Text className="c-HelpText__text" shade={shade} size={size} state={state}>
      {children}
    </Text>
  ) : (
    children
  )

  return (
    <HelpTextUI {...getValidProps(rest)} className={componentClassName}>
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
