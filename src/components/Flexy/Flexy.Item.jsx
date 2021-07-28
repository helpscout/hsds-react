import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
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

FlexyItem.defaultProps = {
  inline: false,
  'data-cy': 'FlexyItem',
}

FlexyItem.propTypes = {
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Typically not necessary, but can remedy nested flexbox layout issues. */
  inline: PropTypes.bool,
}

export default FlexyItem
