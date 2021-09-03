import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { getComponentKey } from '../../utilities/component'

import Overflow from '../Overflow'
import Tooltip from '../Tooltip'
import { noop } from '../../utilities/other'

import {
  TagListUI,
  ClearAllUI,
  ListUI,
  ItemUI,
  ShowAllButtonUI,
} from './TagList.css'

export const tagListClassName = 'c-TagList'
export const TagListContext = React.createContext()

export const TagList = props => {
  const {
    children,
    className,
    clearAll,
    limit,
    isRemovable,
    onRemove,
    onRemoveAll,
    overflowFade,
    showAll,
    size,
    ...rest
  } = props

  const [isNoLimit, setNoLimit] = useState(false)

  const componentClassNames = classNames(
    tagListClassName,
    showAll ? 'is-showingAll' : '',
    size && `is-${size}`,
    className
  )

  const handleOnRemove = value => onRemove(value)

  const tags = React.Children.toArray(children)
  const total = tags.length

  const shouldFilterTags =
    limit > 0 && !overflowFade && tags.length > limit && !isNoLimit

  const tagList = shouldFilterTags ? tags.slice(0, limit) : tags

  const tagsComponents = tagList.map((tag, index) => {
    const isLastWithClearAll =
      !limit && total - 1 === index && clearAll && tags.length > 1

    const shoudShowAllButton = shouldFilterTags && tagList.length - 1 === index

    const clearAllComponent = isLastWithClearAll ? (
      <ClearAllUI
        key="clearAllButton"
        onClick={onRemoveAll}
        data-testid="TagList.ClearAll"
        data-cy="TagList.ClearAll"
      >
        Clear all
      </ClearAllUI>
    ) : null

    const badgeComponent = shoudShowAllButton ? (
      <Tooltip closeOnContentClick={true} title="Show hidden tags">
        <ShowAllButtonUI
          aria-label="Show hidden tags"
          onClick={() => setNoLimit(true)}
        >
          +{total - limit}
        </ShowAllButtonUI>
      </Tooltip>
    ) : null

    return (
      <ItemUI key={getComponentKey(tag, index)}>
        {tag}
        {clearAllComponent}
        {badgeComponent}
      </ItemUI>
    )
  })
  const componentMarkup = <ListUI>{tagsComponents}</ListUI>
  const contextValue = { isRemovable, size, onRemove: handleOnRemove }

  return (
    <TagListContext.Provider value={contextValue}>
      <TagListUI
        {...getValidProps(rest)}
        className={componentClassNames}
        data-testid="TagList"
      >
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
