import React, { createContext } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import Item from './List.Item'
import { ListUI } from './List.css'

export const ListContext = createContext()

export const List = props => {
  const {
    border,
    children,
    className,
    display,
    inlineSize,
    size,
    type,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-List',
    border === 'dot' && 'is-dotted',
    border === 'line' && 'is-bordered',
    display && `is-display-${display}`,
    inlineSize && `is-inline-${inlineSize}`,
    size && `is-${size}`,
    type && `is-${type}`,
    className
  )

  const as = type === 'number' ? 'ol' : 'ul'

  const contextValue = {
    borderStyle: border,
    isListItem: type === 'bullet' || type === 'number',
    inlineSize,
    size,
    type,
  }

  return (
    <ListContext.Provider value={contextValue}>
      <ListUI as={as} {...getValidProps(rest)} className={componentClassName}>
        {children}
      </ListUI>
    </ListContext.Provider>
  )
}

List.Item = Item

List.defaultProps = {
  border: '',
  display: 'block',
  inlineSize: 'md',
  role: 'list',
}

export default List
