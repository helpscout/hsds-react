import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { FlexyItemUI } from './Flexy.css'

export const Item = ({ children, className, inline, ...rest }) => (
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

Item.propTypes = {
  inline: PropTypes.bool,
}

Item.defaultProps = {
  inline: false,
}

Item.displayName = 'FlexyItem'

export default Item
