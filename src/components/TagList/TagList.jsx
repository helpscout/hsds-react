import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Overflow from '../Overflow'
import classNames from 'classnames'
import { noop } from '../../utilities/other'
import { TagListUI, ClearAllUI, ListUI, ItemUI } from './TagList.css'

export const tagListClassName = 'c-TagList'
export const TagListContext = React.createContext()
export const TagList = props => {
  const {
    overflowFade,
    onRemove,
    onRemoveAll,
    children,
    isRemovable,
    clearAll,
    size,
    showAll,
    className,
    ...rest
  } = props

  const componentClassNames = classNames(
    tagListClassName,
    showAll ? 'is-showingAll' : '',
    size && `is-${size}`,
    className
  )

  const handleOnRemove = value => onRemove(value)
  const handleOnRemoveAll = () => onRemoveAll()

  const childrenLength = React.Children.count(children)
  const childrenMarkup = React.Children.map(children, (child, index) => {
    const isLastChildWithClearAll =
      childrenLength - 1 === index && clearAll && childrenLength > 1

    return (
      <ItemUI>
        {React.cloneElement(child)}
        {isLastChildWithClearAll && (
          <ClearAllUI key="clearAllButton" onClick={handleOnRemoveAll}>
            Clear all
          </ClearAllUI>
        )}
      </ItemUI>
    )
  })

  const componentMarkup = <ListUI>{childrenMarkup}</ListUI>
  const contextValue = { isRemovable, size, onRemove: handleOnRemove }

  return (
    <TagListContext.Provider value={contextValue}>
      <TagListUI {...getValidProps(rest)} className={componentClassNames}>
        {overflowFade ? (
          <Overflow>{componentMarkup}</Overflow>
        ) : (
          componentMarkup
        )}
      </TagListUI>
    </TagListContext.Provider>
  )
}

TagList.defaultProps = {
  'data-cy': 'TagList',
  onRemove: noop,
  onRemoveAll: noop,
  overflowFade: false,
  isRemovable: false,
  clearAll: false,
  showAll: false,
  size: 'sm',
}

TagList.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Enables the ability to remove child `Tag` components. */
  isRemovable: PropTypes.bool,
  /** Callback function when a child `Tag` is removed and unmounted. */
  onRemove: PropTypes.func,
  /** Callback function when a the clear all button was clicked */
  onRemoveAll: PropTypes.func,
  /** Wraps component in an `Overflow` component. */
  overflowFade: PropTypes.bool,
  /** Display a Clear all button at the end of the list */
  clearAll: PropTypes.bool,
  /** Display all tag lines */
  showAll: PropTypes.bool,
  /** Size of all tag */
  size: PropTypes.oneOf(['md', 'sm']),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default TagList
