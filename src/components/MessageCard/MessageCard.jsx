import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import MessageCardButton from './MessageCard.Button'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import {
  ActionUI,
  BodyUI,
  ImageContainerUI,
  ImageUI,
  MAX_IMAGE_SIZE,
  MessageCardUI,
  MessageCardWrapperUI,
  SubtitleUI,
  TitleUI,
} from './MessageCard.css'
import Truncate from '../Truncate'

const sizeWithRatio = (recalculatedSide, otherSide, defaultValue) =>
  // Check if other side is smaller than max size to not recalculate unnecessarily this side as it doesn't need any scaling
  // other condition checks that the image fits the boundaries
  otherSide < MAX_IMAGE_SIZE
    ? defaultValue
    : (recalculatedSide / otherSide) * MAX_IMAGE_SIZE

const getTruncatedText = (text, limit) => {
  return (
    <Truncate limit={limit} type="end">
      {text}
    </Truncate>
  )
}

// Calculate size of image to keep the original aspect ratio, but fit within 278x278 square for image
const calculateSize = image => {
  if (!image.width || !image.height) {
    return {}
  }
  const width = parseInt(image.width)
  const height = parseInt(image.height)

  // Not necessary to recalculate if it fits within boundaries
  if (width < MAX_IMAGE_SIZE && height < MAX_IMAGE_SIZE) {
    return { width, height }
  }

  if (width > height) {
    return {
      height: sizeWithRatio(height, width, height),
      width: Math.min(width, MAX_IMAGE_SIZE),
    }
  } else {
    return {
      width: sizeWithRatio(width, height, MAX_IMAGE_SIZE),
      height: Math.min(height, MAX_IMAGE_SIZE),
    }
  }
}

export const MessageCard = React.memo(
  ({
    onShow,
    in: inProp,
    image,
    action,
    animationDuration,
    animationEasing,
    animationSequence,
    children,
    innerRef,
    title,
    subtitle,
    onBodyClick,
    body,
    withAnimation,
    className,
    align,
    isMobile,
    isWithBoxShadow,
    ...rest
  }) => {
    const [imageError, setImageError] = useState(false)
    const [visible, setVisible] = useState(false)
    const isShown = useRef(false)

    const hasImage = useCallback(() => image && image.url, [image])

    useEffect(() => {
      if (inProp && !hasImage() && !isShown.current) {
        makeMessageVisible()
      }
    }, [inProp, hasImage])

    useEffect(() => {
      if (visible && !isShown.current) {
        onShow()
        isShown.current = true
      }
    }, [visible, onShow])

    const makeMessageVisible = () => {
      setTimeout(() => {
        setVisible(true)
      }, 0)
    }

    const getClassName = () => {
      return classNames(
        MessageCard.className,
        align && `is-align-${align}`,
        className,
        isMobile && 'is-mobile',
        isWithBoxShadow && `is-with-box-shadow`
      )
    }

    const renderTitle = () => {
      return title ? (
        <TitleUI size="h4" data-cy="beacon-message-title">
          {getTruncatedText(title, 110)}
        </TitleUI>
      ) : null
    }

    const renderSubtitle = () => {
      return subtitle ? (
        <SubtitleUI
          size="h5"
          weight={500}
          light
          data-cy="beacon-message-subtitle"
        >
          {getTruncatedText(subtitle, 110)}
        </SubtitleUI>
      ) : null
    }

    const getBodyToRender = () => {
      // if there is no html in the string, transform new line to paragraph
      if (body && !/<\/?[a-z][\s\S]*>/i.test(body)) {
        return body.split('\n').join('<br>')
      }
      return body
    }

    const renderBody = () => {
      const withMargin = title || subtitle

      const bodyToRender = getBodyToRender()

      return bodyToRender ? (
        <BodyUI
          onClick={onBodyClick}
          withMargin={withMargin}
          data-cy="beacon-message-body-content"
        >
          <div dangerouslySetInnerHTML={{ __html: bodyToRender }} />
        </BodyUI>
      ) : null
    }

    const onImageError = () => {
      setImageError(true)
      makeMessageVisible()
    }

    const renderImage = () => {
      if (!image || imageError) {
        return null
      }

      const { height, width } = calculateSize(image)

      return (
        <ImageContainerUI>
          <ImageUI
            src={image.url}
            alt={image.altText || 'Message image'}
            width={width ? `${width}px` : '100%'}
            height={height ? `${height}px` : 'auto'}
            onLoad={makeMessageVisible}
            onError={onImageError}
          />
        </ImageContainerUI>
      )
    }

    const renderAction = () => {
      return action ? (
        <ActionUI data-cy="beacon-message-cta-wrapper">{action()}</ActionUI>
      ) : null
    }

    return inProp ? (
      <MessageCardWrapperUI
        className="c-MessageCardWrapper"
        visible={visible}
        withAnimation={withAnimation}
      >
        <MessageCardUI
          {...getValidProps(rest)}
          className={getClassName()}
          ref={innerRef}
        >
          {renderTitle()}
          {renderSubtitle()}
          {renderBody()}
          {renderImage()}
          {children}
          {renderAction()}
        </MessageCardUI>
      </MessageCardWrapperUI>
    ) : null
  }
)

MessageCard.defaultProps = {
  align: 'right',
  animationSequence: '',
  'data-cy': 'MessageCard',
  innerRef: noop,
  in: true,
  isMobile: false,
  isWithBoxShadow: true,
  onBodyClick: noop,
  onShow: noop,
  withAnimation: false,
}

MessageCard.propTypes = {
  /** Render-prop that is placed in the CTA section of the Message. */
  action: PropTypes.func,
  /** Apply styles for left or right-aligned Message. */
  align: PropTypes.oneOf(['left', 'right']),
  /** The duration (in `ms`) for the animation sequence. */
  animationDuration: PropTypes.number,
  /** Determines the CSS easing transition function. */
  animationEasing: PropTypes.string,
  /** Names of animation styles to apply. */
  animationSequence: PropTypes.string,
  /** Main text of the Message. */
  body: PropTypes.string,
  /** The className of the component. */
  className: PropTypes.string,
  innerRef: PropTypes.func,
  /** Programatically triggering the animation. */
  in: PropTypes.bool,
  /** Adds mobile styles */
  isMobile: PropTypes.bool,
  /** Adds a box shadow. */
  isWithBoxShadow: PropTypes.bool,
  /** Callback invoked when the body of the Message is clicked. */
  onBodyClick: PropTypes.func,
  /** Subtitle of the Message. */
  subtitle: PropTypes.string,
  /** Title of the Message. */
  title: PropTypes.string,
  /** Definition of the Message image */
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    altText: PropTypes.string,
  }),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Callback invoked when the MessageCard is show to the user. */
  onShow: PropTypes.func,
  /** Enable animations when showing the Message. */
  withAnimation: PropTypes.bool,
}

MessageCard.className = 'c-MessageCard'
MessageCard.Button = MessageCardButton

export default MessageCard
