import React, { useContext, useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import Truncate from '../Truncate'
import { classNames } from '../../utilities/classNames'
import { noop, promiseNoop } from '../../utilities/other'
import { TagListContext } from '../TagList/TagList'
import {
  AnimateUI,
  TagWrapperUI,
  TagUI,
  BodyUI,
  SpinnerUI,
  IconUI,
  IconWrapperUI,
  TextUI,
} from './Tag.css'

export const tagClassName = 'c-Tag'

const getFontSize = ({ allCaps, defaultFontsize = 12 }) =>
  `${allCaps ? defaultFontsize - 1 : defaultFontsize}`

export const Tag = props => {
  const contextValue = useContext(TagListContext)
  const newProps = { ...props, ...contextValue }
  const {
    allCaps,
    animationDuration,
    children,
    className,
    color,
    display,
    filled,
    id,
    isRemovable,
    onRemove,
    onBeforeRemove,
    pulsing,
    showTooltipOnTruncate,
    size,
    value,
    ...rest
  } = newProps

  const [isRemoving, setRemoving] = useState(newProps.isRemoving)
  const [transitionIn, setTransitionIn] = useState(true)

  const handleOnRemove = useCallback(() => {
    setRemoving(true)

    onBeforeRemove({ id, value }).then(() => {
      setTransitionIn(false)
      setTimeout(() => {
        onRemove({ id, value })
      }, animationDuration)
    })
  }, [animationDuration, value, id])

  useEffect(() => {
    setRemoving(newProps.isRemoving)
  }, [newProps.isRemoving])

  const wrapperClassNames = classNames(
    'c-TagWrapper',
    display && `is-display-${display}`
  )
  const spinnerAndIconClassNames = classNames(
    filled && 'is-filled',
    `is-${size}`
  )
  const componentClassNames = classNames(
    tagClassName,
    color && `is-${color}`,
    filled && 'is-filled',
    pulsing && 'is-pulsing',
    isRemovable && 'is-removable',
    size && `is-${size}`,
    className
  )

  const removeIconComponent = isRemovable ? (
    <Flexy.Item className="c-Tag__iconWrapper">
      <IconWrapperUI className={spinnerAndIconClassNames}>
        {isRemoving && (
          <SpinnerUI className={spinnerAndIconClassNames} size="xs" />
        )}
        {!isRemoving && (
          <IconUI
            name="cross-small"
            size={size === 'sm' ? '18' : '24'}
            clickable
            onClick={handleOnRemove}
            title="Remove"
            className={spinnerAndIconClassNames}
          />
        )}
      </IconWrapperUI>
    </Flexy.Item>
  ) : null

  return (
    <TagWrapperUI className={wrapperClassNames}>
      <AnimateUI
        className="c-TagWrapper__animate"
        duration={animationDuration}
        in={transitionIn}
        unmountOnExit
      >
        <TagUI {...getValidProps(rest)} className={componentClassNames}>
          <BodyUI className="c-Tag__body" gap="none">
            <Flexy.Block className="c-Tag__contentWrapper">
              <TextUI allCaps={allCaps} block size={getFontSize(newProps)}>
                <Truncate
                  className="c-Tag__textWrapper"
                  showTooltipOnTruncate={showTooltipOnTruncate}
                >
                  {value || children || null}
                </Truncate>
              </TextUI>
            </Flexy.Block>
            {removeIconComponent}
          </BodyUI>
        </TagUI>
      </AnimateUI>
    </TagWrapperUI>
  )
}

Tag.defaultProps = {
  animationDuration: 100,
  color: 'grey',
  'data-cy': 'Tag',
  display: 'inlineBlock',
  isRemovable: false,
  isRemoving: false,
  onBeforeRemove: promiseNoop,
  onRemove: noop,
  showTooltipOnTruncate: true,
  value: '',
  size: 'sm',
}

Tag.propTypes = {
  animationDuration: PropTypes.number,
  /** Renders text in Uppercase */
  allCaps: PropTypes.bool,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Determines the color of the component. */
  color: PropTypes.oneOf([
    'blue',
    'lightBlue',
    'green',
    'grey',
    'gray',
    'orange',
    'purple',
    'red',
    'yellow',
  ]),
  /** Determines the CSS `display` of the component. Default `inlineBlock`. */
  display: PropTypes.oneOf(['block', 'inlineBlock']),
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
  /** Applies a pulsing animation. */
  pulsing: PropTypes.bool,
  /** Function that returns a promise to resolve before removing. */
  onBeforeRemove: PropTypes.func,
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
