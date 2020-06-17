import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { FlexyItemUI } from './Flexy.css'

export const FlexyItem = ({ children, className, inline, ...rest }) => (
  <FlexyItemUI
    {...getValidProps(rest)}
    className={classNames(
      'c-Flexy__item',
      inline ? 'is-inlineItem' : 'is-defaultItem',
      className
    )}
  >
    {children}
  </FlexyItemUI>
)

FlexyItem.propTypes = {
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  inline: PropTypes.bool,
}

FlexyItem.defaultProps = {
  inline: false,
  'data-cy': 'FlexyItem',
}

export default FlexyItem
