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

HelpText.defaultProps = {
  'data-cy': 'HelpText',
  isCompact: false,
  shade: 'faint',
  size: '13',
}

HelpText.propTypes = {
  isCompact: PropTypes.bool,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Shading styles */
  shade: PropTypes.oneOf([
    'default',
    'subtle',
    'slightlyMuted',
    'muted',
    'faint',
    'extraMuted',
  ]),
  /**  Adjust text size. */
  size: PropTypes.oneOf([
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '20',
    '48',
    10,
    11,
    12,
    13,
    14,
    15,
    20,
    48,
  ]),
  /** Changes the text color based on state. `error`: red, `success`: green, `warning`: yellow  */
  state: PropTypes.oneOf(['error', 'success', 'warning']),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default HelpText
