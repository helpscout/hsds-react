import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { TagListContext } from '../TagList/TagList'
import {
  TagUI,
  RemoveIconUI,
  RemoveTagUI,
  TruncateUI,
  CountUI,
  TagGroupUI,
} from './Tag.css'

export const tagClassName = 'c-Tag'

const useExtendPropsWithContext = (nextProps, context) => {
  const contextValue = useContext(context) || {}
  return { ...nextProps, ...contextValue }
}

export const Tag = nextProps => {
  const {
    allCaps,
    children,
    className,
    color,
    count,
    display,
    filled,
    id,
    isRemovable,
    onRemove,
    isRemoving: isRemovingProp,
    showTooltipOnTruncate,
    size,
    value,
    onClick,
    href,
    ...rest
  } = useExtendPropsWithContext(nextProps, TagListContext)

  const tagRef = useRef()

  const [isRemoving, setRemoving] = useState(isRemovingProp)
  const [shouldRender, setRender] = useState(true)

  const hideTag = useCallback(() => {
    setRender(false)
  }, [])

  const handleTransitionEnd = useCallback(
    e => {
      if (e.target === tagRef.current && isRemoving) {
        hideTag()
      }
    },
    [hideTag, isRemoving]
  )

  const handleClick = useCallback(
    e => {
      onClick && onClick(e, { id, value })
    },
    [onClick, id, value]
  )

  const handleRemove = useCallback(
    e => {
      e.preventDefault()
      e.stopPropagation()

      !isRemoving && onRemove({ id, value })
      setRemoving(true)
    },
    [isRemoving, onRemove, id, value]
  )

  const isClickable = Boolean(onClick) || Boolean(href)
  const shouldShowCount = Number.isInteger(count) && size === 'lg'

  useEffect(() => {
    if (isRemovingProp && tagRef.current) {
      hideTag()
    }
  }, [isRemovingProp, hideTag])

  const componentClassNames = classNames(
    tagClassName,

    color && `is-${color}`,
    isClickable && 'is-clickable',
    filled && 'is-filled',
    isRemovable && 'is-removable',
    allCaps && 'is-all-caps',
    size && `is-${size}`,
    shouldShowCount && 'has-count',
    className
  )
  const groupClassNames = classNames(
    display && `is-display-${display}`,
    size && `is-${size}`,
    !isRemoving && 'element-in'
  )

  let as = 'div'
  if (isClickable) {
    as = Boolean(href) ? 'a' : 'button'
  }

  const tagProps = {
    className: componentClassNames,
    as,
    onClick: handleClick,
  }
  if (href) tagProps.href = href

  return shouldRender ? (
    <TagGroupUI
      className={groupClassNames}
      onTransitionEnd={handleTransitionEnd}
      ref={tagRef}
      data-testid="TagGroup"
    >
      <TagUI {...getValidProps(rest)} {...tagProps} data-testid="Tag">
        <TruncateUI
          className="c-Tag__textWrapper"
          showTooltipOnTruncate={showTooltipOnTruncate}
        >
          {value || children || null}
        </TruncateUI>
        {shouldShowCount && <CountUI data-testid="Tag.Count">{count}</CountUI>}
      </TagUI>
      {isRemovable && (
        <RemoveTagUI
          aria-label="Remove tag"
          data-testid="RemoveTag"
          onClick={handleRemove}
        >
          <RemoveIconUI name="cross-small" size={18} title="Remove" />
        </RemoveTagUI>
      )}
    </TagGroupUI>
  ) : null
}

Tag.defaultProps = {
  color: 'grey',
  'data-cy': 'Tag',
  display: 'inline',
  isRemovable: false,
  isRemoving: false,
  onRemove: () => undefined,
  showTooltipOnTruncate: true,
  value: '',
  size: 'sm',
}

Tag.propTypes = {
  /** Renders text in Uppercase */
  allCaps: PropTypes.bool,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Determines the color of the component. */
  color: PropTypes.oneOf([
    'blue',
    'green',
    'grey',
    'orange',
    'pink',
    'purple',
    'red',
    'teal',
    'yellow',
  ]),
  /** Renders a badge within a medium sized tag */
  count: PropTypes.number,
  /** Determines the CSS `display` of the component. Default `inline`. */
  display: PropTypes.oneOf(['block', 'inline']),
  /** Applies a filled in color style to the component. */
  filled: PropTypes.bool,
  /** ID of the component. */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Renders an `x` `Icon`, which can remove this component from the DOM. */
  isRemovable: PropTypes.bool,
  /** Renders the `Spinner` and replaces the `x` `Icon` */
  isRemoving: PropTypes.bool,
  /** Apply a different size to the component */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Callback function when component is removed and unmounted. */
  onRemove: PropTypes.func,
  /** Renders a `Tooltip` if content is truncated. */
  showTooltipOnTruncate: PropTypes.bool,
  /** Value of the tag. Renders in place of `children`, if specified. */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Tag
