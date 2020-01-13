import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { ItemUI } from './styles/Flexy.Item.css'

export const Item = ({ children, className, inline, ...rest }) => (
  <ItemUI
    {...getValidProps(rest)}
    className={classNames(
      'c-Flexy__item',
      inline ? 'is-inlineItem' : 'is-defaultItem',
      className
    )}
  >
    {children}
  </ItemUI>
)

Item.propTypes = {
  inline: PropTypes.bool,
}

Item.defaultProps = {
  inline: false,
}

Item.displayName = 'FlexyItem'

export default Item
