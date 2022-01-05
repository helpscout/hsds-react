import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash.throttle'
import classNames from 'classnames'
import { setupObserver } from '../../hooks/useMeasureNode'
import { splitAvatarsArray, getNumberOfItemsToDisplay } from './AvatarRow.utils'
import { config } from '../Avatar/Avatar.css'
import { AvatarRowUI, CounterAvatarUI } from './AvatarRow.css'
import Avatar from '../Avatar'
import Tooltip from '../Tooltip'

const { size: avatarConfigSizes } = config

function AvatarRow({
  adaptable = true,
  avatars = [],
  className,
  'data-cy': dataCy = 'AvatarRow',
  extraTooltipProps = {},
  gap = 2,
  minSpaceForNAvatars,
  throttleOnResize = true,
  throttleWait = 200,
  ...avatarProps
}) {
  const { size: avatarSize, fontSize: avatarFontSize } = avatarConfigSizes[
    avatarProps.size || 'md'
  ]
  const avatarRowRef = useRef(null)
  const observerRef = useRef(null)
  const numberOfAvatars = avatars.length
  const [numberOfItemsOnDisplay, setNumberOfItemsOnDisplay] = useState(
    numberOfAvatars
  )

  useEffect(() => {
    if (!adaptable || avatarRowRef.current == null) return

    // Avoid adding multiple observers
    if (
      observerRef.current != null &&
      observerRef.current instanceof ResizeObserver
    ) {
      observerRef.current.disconnect()
    }

    const avatarRowEl = avatarRowRef.current
    const resizeObserver = setupObserver({
      observerEntryType: 'contentBoxSize',
      cb: throttleOnResize ? throttle(onResize, throttleWait) : onResize,
      dimensions: { width: true },
    })

    observerRef.current = resizeObserver

    resizeObserver.observe(avatarRowEl)

    return () => {
      if (!adaptable || avatarRowEl == null) return

      resizeObserver.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfAvatars])

  function onResize({ width: containerWidth }) {
    setNumberOfItemsOnDisplay(
      getNumberOfItemsToDisplay({
        avatarSize,
        containerWidth,
        gap,
        numberOfAvatars,
        numberOfItemsOnDisplay,
      })
    )
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
      $minWidth={
        minSpaceForNAvatars * avatarSize + gap * (numberOfAvatars - 1) ||
        avatarSize
      }
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
  /** Gap in pixels between Avatars */
  gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Customize the Tooltip on the "overflow" avatar by passing valid options */
  extraTooltipProps: PropTypes.object,
}

export default AvatarRow
