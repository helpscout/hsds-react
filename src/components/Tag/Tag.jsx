import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  forwardRef,
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
  TagElementUI,
} from './Tag.css'

export const tagClassName = 'c-Tag'

const useExtendPropsWithContext = (nextProps, context) => {
  const contextValue = useContext(context) || {}
  return { ...nextProps, ...contextValue }
}

const ForwardedTag = forwardRef(function Tag(props, ref) {
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
    onHide,
    isRemoving: isRemovingProp,
    removeProps,
    showTooltipOnTruncate,
    size,
    value,
    onClick,
    href,
    elementClassName,
    ...rest
  } = useExtendPropsWithContext(props, TagListContext)

  const [isRemoving, setRemoving] = useState(isRemovingProp)
  const [shouldRender, setRender] = useState(true)

  const hideTag = useCallback(() => {
    setRender(false)
    onHide && onHide()
  }, [onHide])

  const handleTransitionEnd = useCallback(() => {
    if (isRemoving) hideTag()
  }, [hideTag, isRemoving])

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
    if (isRemovingProp) {
      hideTag()
    }
  }, [isRemovingProp, hideTag])

  const tagClassnames = classNames(
    tagClassName,
    display && `is-display-${display}`,
    !isRemoving && 'element-in',
    color && `is-${color}`,
    filled && 'is-filled',
    className
  )

  const tagElementClassNames = classNames(
    tagClassName,
    isClickable && 'is-clickable',
    isRemovable && 'is-removable',
    allCaps && 'is-all-caps',
    size && `is-${size}`,
    elementClassName
  )

  let as = 'div'
  if (isClickable) {
    as = Boolean(href) ? 'a' : 'button'
  }

  const tagProps = {
    className: tagElementClassNames,
    as,
    onClick: handleClick,
  }
  if (href) tagProps.href = href

  return shouldRender ? (
    <TagUI
      className={tagClassnames}
      onTransitionEnd={handleTransitionEnd}
      ref={ref}
      data-testid="Tag"
    >
      <TagElementUI
        {...getValidProps(rest)}
        {...tagProps}
        data-testid="TagElement"
      >
        <TruncateUI
          className="c-Tag__textWrapper"
          showTooltipOnTruncate={showTooltipOnTruncate}
        >
          {value || children || null}
        </TruncateUI>
        {shouldShowCount && <CountUI data-testid="Tag.Count">{count}</CountUI>}
      </TagElementUI>
      {isRemovable && (
        <RemoveTagUI
          aria-label="Remove tag"
          data-testid="RemoveTag"
          onClick={handleRemove}
          {...removeProps}
        >
          <RemoveIconUI name="cross-small" size={18} title="Remove" />
        </RemoveTagUI>
      )}
    </TagUI>
  ) : null
})

function noop() {}

ForwardedTag.defaultProps = {
  color: 'grey',
  'data-cy': 'Tag',
  display: 'inline',
  isRemovable: false,
  isRemoving: false,
  onRemove: noop,
  onHide: noop,
  showTooltipOnTruncate: true,
  value: '',
  size: 'sm',
}

ForwardedTag.propTypes = {
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
  /** Custom class names to be added to the element component. */
  elementClassName: PropTypes.string,
  /** Applies a filled in color style to the component. */
  filled: PropTypes.bool,
  /** ID of the component. */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Renders an `x` `Icon`, which can remove this component from the DOM. */
  isRemovable: PropTypes.bool,
  /** Renders the `Spinner` and replaces the `x` `Icon` */
  isRemoving: PropTypes.bool,
  /** Custom props to pass to the remove button */
  removeProps: PropTypes.object,
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

export default ForwardedTag
