import React, { useContext } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { ItemUI } from './List.css'
import { ListContext } from './List'

export const ListItem = props => {
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

ListItem.defaultProps = {
  'data-cy': 'ListItem',
  isListItem: false,
  role: 'listitem',
}

export default ListItem
