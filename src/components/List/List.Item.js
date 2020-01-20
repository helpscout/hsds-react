import React, { useContext } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { ItemUI } from './styles/List.css'
import { ListContext } from './List'

export const Item = props => {
  const contextValue = useContext(ListContext)

  const mergedProps = { ...props, ...contextValue }

  const {
    borderStyle,
    children,
    className,
    isListItem,
    size,
    type,
    ...rest
  } = mergedProps

  const componentClassName = classNames(
    'c-List__item',
    borderStyle && 'is-bordered',
    borderStyle && `is-border-${borderStyle}`,
    isListItem && 'is-listItem',
    size && `is-${size}`,
    type && `is-${type}`,
    className
  )

  return (
    <ItemUI {...getValidProps(rest)} className={componentClassName}>
      {children}
    </ItemUI>
  )
}

Item.displayName = 'ListItem'
Item.defaultProps = {
  isListItem: false,
  role: 'listitem',
}

export default Item
