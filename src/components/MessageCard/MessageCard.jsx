import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import MessageCardButton from './MessageCard.Button'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { MessageCardUI, MessageCardWrapperUI } from './MessageCard.css'
import { MessageCardTitle } from './components/MessageCard.Title'
import { MessageCardSubtitle } from './components/MessageCard.Subtitle'
import { MessageCardImage } from './components/MessageCard.Image'
import { MessageCardAction } from './components/MessageCard.Action'
import { MessageCardBody } from './components/MessageCard.Body'
import { MessageCardContent } from './components/MessageCard.Content'

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
          <MessageCardTitle title={title} />
          <MessageCardSubtitle subtitle={subtitle} />
          <MessageCardContent
            withMargin={title || subtitle}
            render={body || image || children}
          >
            <MessageCardBody body={body} onClick={onBodyClick} />
            <MessageCardImage image={image} onLoad={makeMessageVisible} />
            {children}
          </MessageCardContent>
          <MessageCardAction action={action} />
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
