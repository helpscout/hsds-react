import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import Text from '../Text'
import { isString } from '../../utilities/is'
import { HelpTextUI } from './HelpText.css'

const HelpText = props => {
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

HelpText.propTypes = {
  className: PropTypes.string,
  isCompact: PropTypes.bool,
  shade: PropTypes.string,
  size: PropTypes.string,
  state: PropTypes.string,
}

HelpText.defaultProps = {
  isCompact: false,
  shade: 'faint',
  size: '13',
  state: 'default',
}

export default HelpText
