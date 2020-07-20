import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Inline from '../Inline'
import Overflow from '../Overflow'
import { classNames } from '../../utilities/classNames'
import { noop, promiseNoop } from '../../utilities/other'
import { TagListUI, ClearAllUI } from './TagList.css'

export const tagListClassName = 'c-TagList'
export const TagListContext = React.createContext()
export const TagList = props => {
  const {
    overflowFade,
    onRemove,
    onRemoveAll,
    onBeforeRemove,
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
    className
  )

  const handleOnRemove = value => onRemove(value)
  const handleOnRemoveAll = () => onRemoveAll()

  const childrenLength = React.Children.count(children)
  const childrenMarkup = React.Children.map(children, (child, index) => {
    const isLastChildWithClearAll =
      childrenLength - 1 === index && clearAll && childrenLength > 1

    return (
      <Inline.Item>
        {React.cloneElement(child)}
        {isLastChildWithClearAll && (
          <ClearAllUI key="clearAllButton" onClick={handleOnRemoveAll}>
            Clear all
          </ClearAllUI>
        )}
      </Inline.Item>
    )
  })

  const componentMarkup = <Inline size={size}>{childrenMarkup}</Inline>
  const contextValue = { onBeforeRemove, isRemovable, onRemove: handleOnRemove }

  return (
    <TagListUI {...getValidProps(rest)} className={componentClassNames}>
      <TagListContext.Provider value={contextValue}>
        {overflowFade ? (
          <Overflow>{componentMarkup}</Overflow>
        ) : (
          componentMarkup
        )}
      </TagListContext.Provider>
    </TagListUI>
  )
}

TagList.defaultProps = {
  'data-cy': 'TagList',
  onBeforeRemove: promiseNoop,
  onRemove: noop,
  onRemoveAll: noop,
  overflowFade: false,
  isRemovable: false,
  clearAll: false,
  showAll: false,
  size: 'xs',
}

TagList.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Enables the ability to remove child `Tag` components. */
  isRemovable: PropTypes.bool,
  /** Function that returns a promise to resolve before removing. */
  onBeforeRemove: PropTypes.func,
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
  /** Size of the spacing between each tag */
  size: PropTypes.oneOf(['lg', 'md', 'sm', 'xs']),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default TagList
