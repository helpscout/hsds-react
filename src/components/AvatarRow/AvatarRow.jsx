import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash.throttle'
import classNames from 'classnames'
import { noop } from '../../utilities/other'
import { AvatarRowUI, CounterAvatarUI } from './AvatarRow.css'
import Avatar from '../Avatar'
import Tooltip from '../Tooltip'
import { config } from '../Avatar/Avatar.css'
import { setupObserver, splitAvatarsArray } from './AvatarRow.utils'

const { size: avatarConfigSizes } = config

function AvatarRow({
  adaptable = true,
  avatars = [],
  className,
  'data-cy': dataCy = 'AvatarRow',
  extraTooltipProps = {},
  gap = 2,
  ieCompatible = false,
  throttleOnResize = true,
  throttleWait = 200,
  ...avatarProps
}) {
  const { size: avatarSize, fontSize: avatarFontSize } = avatarConfigSizes[
    avatarProps.size || 'md'
  ]
  const avatarRowRef = useRef(null)
  const [numberOfItemsOnDisplay, setNumberOfItemsOnDisplay] = useState(
    avatars.length
  )

  const throttledOnResize = !ieCompatible
    ? throttle(onResize, throttleWait)
    : noop
  const throttledHandleWindowResize = ieCompatible
    ? throttle(handleWindowResize, throttleWait)
    : noop

  useEffect(() => {
    if (!adaptable || ieCompatible || avatarRowRef.current == null) return

    const avatarRowEl = avatarRowRef.current
    const resizeObserver = setupObserver(
      throttleOnResize ? throttledOnResize : onResize
    )

    resizeObserver.observe(avatarRowEl)

    return () => {
      if (!adaptable || ieCompatible || avatarRowEl == null) return

      resizeObserver.unobserve(avatarRowEl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (ieCompatible && adaptable) {
      window.addEventListener(
        'resize',
        throttleOnResize ? throttledHandleWindowResize : handleWindowResize
      )

      const measures = avatarRowRef.current.getBoundingClientRect()
      onResize(measures)
    }

    return () => {
      ieCompatible &&
        adaptable &&
        window.addEventListener(
          'resize',
          throttleOnResize ? throttledHandleWindowResize : handleWindowResize
        )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleWindowResize() {
    if (avatarRowRef.current != null) {
      const measures = avatarRowRef.current.getBoundingClientRect()

      onResize(measures)
    }
  }

  function onResize({ width: containerWidth }) {
    /** Only act if we have more than 1 avatar */
    if (!containerWidth || avatars.length <= 1) {
      return
    }

    /** The total space for the avatars is comprised of:
     * Avatar space: Number of avatars * the size of the avatar
     * +
     * Margin space: gap between avatars * the number of gaps. For example, for 3 avatars, there are 2 gaps => [AV]gap[AV]gap[AV]
     */
    const spaceForAllAvatars =
      avatarSize * avatars.length + (avatars.length - 1) * gap

    if (containerWidth >= spaceForAllAvatars) {
      setNumberOfItemsOnDisplay(avatars.length)
    } else {
      const numberOfGaps = numberOfItemsOnDisplay - 1
      const itemsThatFit = Math.floor(
        (containerWidth - numberOfGaps * gap) / avatarSize
      )

      setNumberOfItemsOnDisplay(itemsThatFit > 0 ? itemsThatFit : 1)
    }
  }

  const { shownAvatars, hiddenAvatars } = splitAvatarsArray(
    avatars,
    numberOfItemsOnDisplay
  )

  return (
    <AvatarRowUI
      className={classNames('AvatarRow', className)}
      data-cy={dataCy}
      ref={avatarRowRef}
      $gap={gap}
      $minWidth={avatarSize}
    >
      {shownAvatars.map(props => (
        <Avatar key={props.id || props.name} {...props} {...avatarProps} />
      ))}
      {hiddenAvatars.length > 0 && (
        <Tooltip
          title={hiddenAvatars.map(props => props.name).join('\n')}
          withTriggerWrapper={false}
          placement="bottom"
          {...extraTooltipProps}
        >
          <CounterAvatarUI
            className="AvatarOverflowed"
            $fontSize={avatarFontSize}
            $size={avatarSize}
          >
            {hiddenAvatars.length}
          </CounterAvatarUI>
        </Tooltip>
      )}
    </AvatarRowUI>
  )
}

AvatarRow.propTypes = {
  /** Whether it should adapt the number of avatars shown to the container width */
  adaptable: PropTypes.bool,
  /** List of Objects that include Avatars individual props to be rendered as `<Avatar />` */
  avatars: PropTypes.arrayOf(PropTypes.object),
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** If you want to throttle the onResize function */
  throttleOnResize: PropTypes.bool,
  /** Customize the throttle wait in ms */
  throttleWait: PropTypes.number,
  /** Use a window resize event instead of Resize Observer */
  ieCompatible: PropTypes.bool,
  /** Gap in pixels between Avatars */
  gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Customize the Tooltip on the "overflow" avatar by passing valid options */
  extraTooltipProps: PropTypes.object,
}

export default AvatarRow
