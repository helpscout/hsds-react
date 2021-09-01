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
import { noop } from '../../utilities/other'
import { TagListContext } from '../TagList/TagList'
import {
  TagUI,
  RemoveIconUI,
  IconWrapperUI,
  TruncateUI,
  CountUI,
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
    onRemove({ id, value })
    setRender(false)
  }, [onRemove, id, value])

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
      if (isRemovable) setRemoving(true)
    },
    [onClick, isRemovable, id, value]
  )

  const isClickable = Boolean(onClick) || Boolean(href) || isRemovable
  const shouldShowCount = Number.isInteger(count) && size === 'md'

  useEffect(() => {
    if (isRemovingProp && tagRef.current) {
      hideTag()
    }
  }, [isRemovingProp, hideTag])

  const componentClassNames = classNames(
    tagClassName,
    display && `is-display-${display}`,
    color && `is-${color}`,
    isClickable && 'is-clickable',
    filled && 'is-filled',
    isRemovable && 'is-removable',
    !isRemoving && 'element-in',
    allCaps && 'is-all-caps',
    size && `is-${size}`,
    shouldShowCount && 'has-count',
    className
  )

  return shouldRender ? (
    <TagUI
      {...getValidProps(rest)}
      className={componentClassNames}
      as={isClickable ? 'button' : 'div'}
      ref={tagRef}
      onTransitionEnd={handleTransitionEnd}
      onClick={handleClick}
    >
      <TruncateUI
        className="c-Tag__textWrapper"
        showTooltipOnTruncate={showTooltipOnTruncate}
      >
        {value || children || null}
      </TruncateUI>
      {shouldShowCount && <CountUI>{count}</CountUI>}
      {isRemovable && (
        <IconWrapperUI>
          <RemoveIconUI name="cross-small" size={18} title="Remove" />
        </IconWrapperUI>
      )}
    </TagUI>
  ) : null
}

Tag.defaultProps = {
  color: 'grey',
  'data-cy': 'Tag',
  display: 'inline',
  isRemovable: false,
  isRemoving: false,
  onRemove: noop,
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
  /** Renders a badge within a medium tag */
  count: PropTypes.number,
  /** Determines the CSS `display` of the component. Default `inlineBlock`. */
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
  size: PropTypes.oneOf(['sm', 'md']),
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
