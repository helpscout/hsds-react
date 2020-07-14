import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import ListItem from './List.Item'
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

List.Item = ListItem

List.defaultProps = {
  'data-cy': 'List',
  display: 'block',
  inlineSize: 'md',
  role: 'list',
}

List.propTypes = {
  /** Border style for the items. */
  border: PropTypes.oneOf(['dot', 'line']),
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Changes the component's CSS `display`.*/
  display: PropTypes.oneOf(['block', 'flex']),
  /** Size style for spacing between the items. `xs`, `sm`, `md`. */
  inlineSize: PropTypes.oneOf(['xs', 'sm', 'md']),
  /** Aria-role for the component.*/
  role: PropTypes.string,
  /** Size style for the items.*/
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  /** List style style for the items. */
  type: PropTypes.oneOf(['bullet', 'inline', 'number']),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default List
